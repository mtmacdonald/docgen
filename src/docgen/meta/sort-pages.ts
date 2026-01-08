import { TSortedPages } from '../types.ts';

export const sortPages = ({ contents }): TSortedPages => {
  return contents.reduce(
    (acc, section) => {
      const { column } = section;
      return {
        ...acc,
        [column]: [...(acc[column] || []), section],
      };
    },
    { 1: [], 2: [], 3: [], 4: [], 5: [] },
  );
};
