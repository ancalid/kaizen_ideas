export interface Area {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface WordCategory {
  id: string;
  name: string;
  words: string[];
}

export interface SelectedWords {
  medio: string;
  tema: string;
  impacto: string;
}

export interface LockedWords {
  medio: boolean;
  tema: boolean;
  impacto: boolean;
}