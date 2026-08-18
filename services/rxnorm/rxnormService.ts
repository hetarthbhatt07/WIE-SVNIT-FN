// services/rxnorm/rxnormService.ts - RxNorm Normalization & Drug Knowledge Retrieval Service

import { CLINICAL_DRUGS } from '@/lib/data/clinicalKnowledge';
import { Drug } from '@/types/database';

export interface NormalizedDrugResult {
  drug: Drug;
  matchType: 'exact_brand' | 'exact_generic' | 'fuzzy_ingredient' | 'synonym';
  confidence: number;
}

export class RxNormService {
  /**
   * Search drugs by query string across Brand, Generic, and Ingredient names
   */
  public static searchDrugs(query: string): Drug[] {
    if (!query || query.trim().length === 0) return CLINICAL_DRUGS.slice(0, 10);
    const q = query.toLowerCase().trim();
    
    return CLINICAL_DRUGS.filter(d => 
      d.brand_name.toLowerCase().includes(q) ||
      d.generic_name.toLowerCase().includes(q) ||
      d.ingredient_name.toLowerCase().includes(q) ||
      d.rxcui.includes(q)
    );
  }

  /**
   * Normalize an extracted drug name to canonical RxNorm concept
   */
  public static normalizeDrugName(rawName: string): NormalizedDrugResult | null {
    if (!rawName || rawName.trim().length < 2) return null;
    const clean = rawName.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

    // 1. Exact Brand match
    const brandMatch = CLINICAL_DRUGS.find(d => d.brand_name.toLowerCase() === clean);
    if (brandMatch) {
      return { drug: brandMatch, matchType: 'exact_brand', confidence: 0.99 };
    }

    // 2. Exact Generic match
    const genericMatch = CLINICAL_DRUGS.find(d => d.generic_name.toLowerCase() === clean);
    if (genericMatch) {
      return { drug: genericMatch, matchType: 'exact_generic', confidence: 0.99 };
    }

    // 3. Substring / Ingredient match
    const partialMatch = CLINICAL_DRUGS.find(d => 
      clean.includes(d.generic_name.toLowerCase()) || 
      clean.includes(d.brand_name.toLowerCase()) ||
      d.generic_name.toLowerCase().includes(clean) ||
      d.brand_name.toLowerCase().includes(clean)
    );

    if (partialMatch) {
      return { drug: partialMatch, matchType: 'fuzzy_ingredient', confidence: 0.88 };
    }

    // 4. Common phonetic / alias matches
    const aliases: Record<string, string> = {
      'paracetamol': 'Acetaminophen',
      'panadol': 'Acetaminophen',
      'calpol': 'Acetaminophen',
      'crocin': 'Acetaminophen',
      'doliprane': 'Acetaminophen',
      'tylenol': 'Acetaminophen',
      'disprin': 'Aspirin',
      'ecospirin': 'Aspirin',
      'brufen': 'Ibuprofen',
      'combiflam': 'Ibuprofen',
      'augmentin': 'Amoxicillin',
      'amox': 'Amoxicillin',
      'mox': 'Amoxicillin',
      'glycomet': 'Metformin',
      'azithral': 'Azithromycin',
      'zithro': 'Azithromycin',
      'ciplox': 'Ciprofloxacin',
      'losec': 'Omeprazole',
      'omez': 'Omeprazole',
      'eliquis': 'Warfarin', // Anticoagulant class mapping
      'xarelto': 'Warfarin',
      'amlo': 'Amlodipine',
      'amlosafe': 'Amlodipine',
      'aten': 'Metoprolol',
      'meto': 'Metoprolol',
      'thyronorm': 'Levothyroxine',
      'eltroxin': 'Levothyroxine'
    };

    for (const [alias, canonicalGeneric] of Object.entries(aliases)) {
      if (clean.includes(alias)) {
        const found = CLINICAL_DRUGS.find(d => d.generic_name.toLowerCase() === canonicalGeneric.toLowerCase());
        if (found) {
          return { drug: found, matchType: 'synonym', confidence: 0.92 };
        }
      }
    }

    return null;
  }

  /**
   * Look up RxNorm canonical drug by RxCUI
   */
  public static getDrugByRxCUI(rxcui: string): Drug | undefined {
    return CLINICAL_DRUGS.find(d => d.rxcui === rxcui);
  }

  /**
   * Look up Drug by internal ID
   */
  public static getDrugById(id: number): Drug | undefined {
    return CLINICAL_DRUGS.find(d => d.drug_id === id);
  }
}
