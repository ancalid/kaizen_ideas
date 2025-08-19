import { WordCategory, SelectedWords, LockedWords } from '../types';

export const getRandomWord = (words: string[]): string => {
  return words[Math.floor(Math.random() * words.length)];
};

export const generateRandomWords = (
  wordCategories: WordCategory[],
  lockedWords: LockedWords,
  currentWords: SelectedWords
): SelectedWords => {
  const newWords: SelectedWords = { ...currentWords };

  wordCategories.forEach((category) => {
    const categoryKey = category.id as keyof SelectedWords;
    const isLocked = lockedWords[categoryKey as keyof LockedWords];
    
    if (!isLocked) {
      newWords[categoryKey] = getRandomWord(category.words);
    }
  });

  return newWords;
};