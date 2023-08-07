import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

export const selectedArticleAtom = atom<{
  id?: number;
  title?: string;
  content?: string;
  createAt?: string;
  writer?: string;
  articleTypeName?: string;
  view?: number;
}>({});

export function useSelectedArticleAtom() {
  const [selectedArticle, setSelectedArticle] = useAtom(selectedArticleAtom);

  const resetAtom = useCallback(() => {
    setSelectedArticle({});
  }, []);

  return {
    resetAtom,

    selectedArticle,
    setSelectedArticle,
  };
}
