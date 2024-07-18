import { useEffect, useState } from 'react';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useGetMyArticleRequest } from '../../../api-hooks/MyPage';
import { IMyArticleData } from '../../../@types/MyPage';

const useInfo = () => {
  // Info
  const { selectedArticle, setSelectedArticle } = useSelectedArticleAtom();

  const [currentPage, setCurrentPage] = useState(1);

  const { myArticleList, totalPosts, myArticleRefetch } = useGetMyArticleRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  useEffect(() => {
    void myArticleRefetch();
  }, []);

  const handleInfoPreview = (article: IMyArticleData) => {
    setSelectedArticle(article);
  };

  return {
    selectedArticle,
    currentPage,
    setCurrentPage,
    myArticleList,
    totalPosts,
    handleInfoPreview,
  };
};

export default useInfo;
