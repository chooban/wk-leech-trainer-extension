export interface Subject {
  readonly auxiliary_meanings: AuxiliaryMeaning[];
  readonly characters: string;
  readonly created_at: Date;
  readonly document_url: string;
  readonly hidden_at: Date;
  readonly lesson_position: number;
  readonly level: number;
  readonly meaning_mnemonic: string;
  readonly meanings: Meaning[];
  readonly slug: string;
}

interface Meaning {
  readonly meaning: string;
  readonly primary: boolean;
  readonly accepted_answer: boolean;
}
interface AuxiliaryMeaning {
  readonly meaning: string;
  readonly type: string;
}
