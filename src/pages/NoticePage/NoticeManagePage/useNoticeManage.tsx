import React, { useEffect, useState } from 'react';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useGetNoticeRequest } from '../../../api-hooks/Notice';
import { changeDateFormat } from '../../../utils/changeDateFormat';
import { INoticeData } from '../../../@types/Notice';

const useNoticeManage = () => {
  const { selectedArticle, setSelectedArticle } = useSelectedArticleAtom();

  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [keyword, setKeyword] = useState('');

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const { noticeList, totalPosts, noticeRefetch } = useGetNoticeRequest(
    {
      page: currentPage - 1,
      startDate: startDate ? changeDateFormat(startDate, 'YYYY-MM-DDT00:00:00') : '',
      endDate: endDate ? changeDateFormat(endDate, 'YYYY-MM-DDT23:59:59') : '',
      title: keyword ? encodeURIComponent(keyword) : '',
    },
    false,
  );

  useEffect(() => {
    void noticeRefetch();
  }, [currentPage]);

  const handleDateSearchButton = () => {
    void noticeRefetch();
  };

  const handleOnEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void noticeRefetch();
    }
  };

  const handleNoticePreview = (notice: INoticeData) => {
    setSelectedArticle(notice);
  };

  const handleSearchRefreshButton = () => {
    setDateRange([null, null]);
    setKeyword('');
  };

  return {
    selectedArticle,
    currentPage,
    setCurrentPage,
    setDateRange,
    startDate,
    endDate,
    keyword,
    handleSearchKeyword,
    noticeList,
    totalPosts,
    handleDateSearchButton,
    handleOnEnterKeyDown,
    handleNoticePreview,
    handleSearchRefreshButton,
  };
};

export default useNoticeManage;
