export interface Area {
  id: string;
  name: string;
}

export interface WordCategory {
  id: 'medio' | 'tema' | impacto';
  title: string;
  words: string[];
  color: string;
}

export interface WordBlock {
  category: 'medio' | 'tema' | 'impacto';
  word: string;
  isLocked: boolean;
}

export interface GeneratedIdea {
  id: number;
  content: string;
}