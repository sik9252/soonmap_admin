import React, { useEffect, useState } from 'react';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useGetMyNoticeRequest } from '../../../api-hooks/MyPage';
import { IMyNoticeData } from '../../../@types/MyPage';

const useNotice = () => {
  const { selectedArticle, setSelectedArticle } = useSelectedArticleAtom();

  const [currentPage, setCurrentPage] = useState(1);

  const { myNoticeList, totalPosts, myNoticeRefetch } = useGetMyNoticeRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  useEffect(() => {
    void myNoticeRefetch();
  }, []);

  const handleInfoPreview = (article: IMyNoticeData) => {
    setSelectedArticle(article);
  };

  return {
    selectedArticle,
    currentPage,
    setCurrentPage,
    myNoticeList,
    totalPosts,
    handleInfoPreview,
  };
};

export default useNotice;
