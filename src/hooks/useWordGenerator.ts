import { useState, useCallback } from 'react';
import { WordCategory, WordBlock } from '../types';
import { wordCategories } from '../data/words';

export const useWordGenerator = () => {
  const [wordBlocks, setWordBlocks] = useState<WordBlock[]>([
    { category: 'medio', word: '', isLocked: false },
    { category: 'tema', word: '', isLocked: false },
    { category: 'impacto', word: '', isLocked: false }
  ]);

  const getRandomWord = useCallback((category: 'medio' | 'tema' | 'impacto'): string => {
    const wordCategory = wordCategories.find(cat => cat.id === category);
    if (!wordCategory) return '';
    
    const randomIndex = Math.floor(Math.random() * wordCategory.words.length);
    return wordCategory.words[randomIndex];
  }, []);

  const generateNewWords = useCallback(() => {
    setWordBlocks(prev => 
      prev.map(block => ({
        ...block,
        word: block.isLocked ? block.word : getRandomWord(block.category)
      }))
    );
  }, [getRandomWord]);

  const toggleLock = useCallback((category: 'medio' | 'tema' | 'impacto') => {
    setWordBlocks(prev =>
      prev.map(block =>
        block.category === category
          ? { ...block, isLocked: !block.isLocked }
          : block
      )
    );
  }, []);

  const getWordByCategory = useCallback((category: 'medio' | 'tema' | 'impacto'): string => {
    return wordBlocks.find(block => block.category === category)?.word || '';
  }, [wordBlocks]);

  return {
    wordBlocks,
    generateNewWords,
    toggleLock,
    getWordByCategory
  };
};