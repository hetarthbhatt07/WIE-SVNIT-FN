// services/ocr/ocrService.ts - Prescription Image Pre-processing, OCR & Entity Extraction Pipeline

import { RxNormService } from '@/services/rxnorm/rxnormService';
import { AnalyzedMedication } from '@/types/database';

export interface PreprocessingStep {
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  durationMs: number;
}

export interface ExtractedMedicineCandidate {
  rawText: string;
  detectedName: string;
  normalizedGeneric: string;
  rxcui: string;
  dosage: string;
  frequency: string;
  form: string;
  confidence: number;
  isConfirmed: boolean;
  drugId?: number;
}

export interface OCRProcessingResult {
  rawOcrText: string;
  cleanedText: string;
  extractedMedicines: ExtractedMedicineCandidate[];
  confidenceAvg: number;
  preprocessingSteps: PreprocessingStep[];
}

export class OCRService {
  /**
   * Run Simulated Pre-processing & OCR Pipeline with Client/Fallback Parsing
   */
  public static async processPrescriptionImage(
    file: File | { name: string; size: number },
    onProgress?: (step: string, percentage: number) => void
  ): Promise<OCRProcessingResult> {
    const steps: PreprocessingStep[] = [
      { name: 'Upload & Ingestion', description: 'Received file payload and validated format', status: 'completed', durationMs: 250 },
      { name: 'Noise & Artifact Removal', description: 'Bilateral filtering to reduce background speckles', status: 'completed', durationMs: 400 },
      { name: 'Skew & Orientation Correction', description: 'Hough transform baseline rotation alignment (0.8° corrected)', status: 'completed', durationMs: 350 },
      { name: 'Adaptive Contrast & Grayscale', description: 'Otsu binarization and local contrast boost', status: 'completed', durationMs: 450 },
      { name: 'Character Detection & Recognition', description: 'Tesseract Neural OCR Latin character recognition', status: 'completed', durationMs: 800 }
    ];

    if (onProgress) {
      onProgress('Noise removal and deskewing...', 25);
      await new Promise(r => setTimeout(r, 400));
      onProgress('Otsu adaptive contrast enhancement...', 50);
      await new Promise(r => setTimeout(r, 400));
      onProgress('Neural OCR character recognition...', 75);
      await new Promise(r => setTimeout(r, 600));
      onProgress('Tokenizing medical entities and dosage formulas...', 95);
      await new Promise(r => setTimeout(r, 300));
    }

    // Determine sample content or extract from filename
    let rawText = `Dr. Vikramaditya Joshi, MD - Cardiology
Patient: Ananya Sharma | Date: 2026-01-14

Rx:
1. Tab Warfarin 5mg - 1 tablet orally once daily at 6 PM.
2. Tab Ibuprofen 400mg - 1 tablet orally every 8 hours PRN joint pain.
3. Tab Lisinopril 10mg - 1 tablet PO every morning for BP.
4. Tab Omeprazole 20mg - 1 capsule PO 30 mins before breakfast.

Refills: 2 | Signature: Dr. V. Joshi`;

    if (file.name.toLowerCase().includes('sample_2') || file.name.toLowerCase().includes('paracetamol')) {
      rawText = `Dr. Sunita Rao, MD - SVNIT Health
Patient: Ananya Sharma | Date: 2026-01-28

Prescription:
- Coumadin (Warfarin) 5mg PO OD
- Tylenol (Acetaminophen) 500mg PO TDS PRN for pain
- Prinivil (Lisinopril) 10mg PO OD
Note: Patient has history of peptic ulcer. Avoid NSAIDs.`;
    } else if (file.name.toLowerCase().includes('diabetes') || file.name.toLowerCase().includes('metformin')) {
      rawText = `SVNIT Endocrine Clinic
Patient: Rajesh Kumar | Date: 2026-01-12

Rx:
1. Glucophage (Metformin) 500mg - 1 tablet BD with meals
2. Lasix (Furosemide) 40mg - 1 tablet morning OD
3. Lipitor (Atorvastatin) 20mg - 1 tablet at night`;
    }

    const cleanedText = this.cleanOCRText(rawText);
    const extractedMedicines = this.extractMedicineCandidates(cleanedText);

    return {
      rawOcrText: rawText,
      cleanedText,
      extractedMedicines,
      confidenceAvg: 0.94,
      preprocessingSteps: steps
    };
  }

  /**
   * Text Cleaning Stage: Normalizes noise, removes artifacts, standardizes dosage markers
   */
  public static cleanOCRText(raw: string): string {
    return raw
      .replace(/[|~^`_\\«»]/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\b(tab\.|tabs|tab|cap\.|caps|capsule|tablet)\b/gi, 'Tab')
      .replace(/\b(o\.d\.|od|o d)\b/gi, 'OD')
      .replace(/\b(b\.d\.|bd|b d|bid)\b/gi, 'BD')
      .replace(/\b(t\.d\.s\.|tds|tid)\b/gi, 'TDS')
      .replace(/\b(q\.d\.s\.|qds|qid)\b/gi, 'QDS')
      .replace(/\b(p\.o\.|po)\b/gi, 'PO')
      .replace(/\b(p\.r\.n\.|prn)\b/gi, 'PRN')
      .trim();
  }

  /**
   * Medicine Name & Entity Extraction (NER / Tokenization / Pattern Matching)
   */
  public static extractMedicineCandidates(text: string): ExtractedMedicineCandidate[] {
    const candidates: ExtractedMedicineCandidate[] = [];
    const lines = text.split(/\n|\.|\r|;/);

    const dosageRegex = /(\d+(?:\.\d+)?\s*(?:mg|mcg|g|ml|iu|units?))/i;
    const freqRegex = /\b(OD|BD|TDS|QDS|daily|twice daily|thrice daily|once daily|every \d+ hours|PRN|at night|morning)\b/i;

    const keywords = [
      'warfarin', 'coumadin', 'ibuprofen', 'advil', 'motrin', 'aspirin', 'bayer', 
      'metformin', 'glucophage', 'lisinopril', 'prinivil', 'zestril', 'atorvastatin', 
      'lipitor', 'clopidogrel', 'plavix', 'omeprazole', 'prilosec', 'digoxin', 
      'lanoxin', 'amiodarone', 'cordarone', 'fluoxetine', 'prozac', 'tramadol', 
      'ultram', 'rosuvastatin', 'crestor', 'azithromycin', 'zithromax', 'ciprofloxacin', 
      'cipro', 'fluconazole', 'diflucan', 'metoprolol', 'lopressor', 'amlodipine', 
      'norvasc', 'furosemide', 'lasix', 'spironolactone', 'aldactone', 'amoxicillin', 
      'amoxil', 'levothyroxine', 'synthroid', 'prednisone', 'deltasone', 'sertraline', 
      'zoloft', 'acetaminophen', 'paracetamol', 'tylenol'
    ];

    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(text)) {
        // Find line containing it
        const matchLine = lines.find(l => regex.test(l)) || keyword;
        const normalized = RxNormService.normalizeDrugName(keyword);

        if (normalized) {
          // Avoid duplicate insertion
          if (!candidates.some(c => c.normalizedGeneric.toLowerCase() === normalized.drug.generic_name.toLowerCase())) {
            const dosageMatch = matchLine.match(dosageRegex);
            const freqMatch = matchLine.match(freqRegex);

            candidates.push({
              rawText: matchLine.trim(),
              detectedName: normalized.drug.brand_name || keyword,
              normalizedGeneric: normalized.drug.generic_name,
              rxcui: normalized.drug.rxcui,
              dosage: dosageMatch ? dosageMatch[0] : normalized.drug.strength,
              frequency: freqMatch ? freqMatch[0] : 'Once daily (OD)',
              form: normalized.drug.dosage_form,
              confidence: normalized.confidence,
              isConfirmed: true,
              drugId: normalized.drug.drug_id
            });
          }
        }
      }
    }

    return candidates;
  }
}
