import { badWords } from "../constants/BadWords";

export const containsProhibitedWords = async (query: string) => {
    const words = query.toLowerCase().split(' ');
    const foundBadWords = words.filter((word: string) => {
      return badWords.includes(word);
    });
    return foundBadWords.length > 0;
  };