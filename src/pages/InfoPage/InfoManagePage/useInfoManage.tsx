import React, { useEffect, useState } from 'react';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useGetAllCategoryRequest } from '../../../api-hooks/InfoCategory';
import { useGetInfoRequest } from '../../../api-hooks/Info';
import { changeDateFormat } from '../../../utils/changeDateFormat';
import { IInfoData } from '../../../@types/Info';

const useInfoManage = () => {
  const { selectedArticle, setSelectedArticle, resetAtom } = useSelectedArticleAtom();
  const [currentPage, setCurrentPage] = useState(1);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    resetAtom();
  }, []);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const { options } = useGetAllCategoryRequest();

  const { infoList, totalPosts, infoRefetch } = useGetInfoRequest(
    {
      page: currentPage - 1,
      startDate: startDate ? changeDateFormat(startDate, 'YYYY-MM-DDT00:00:00') : '',
      endDate: endDate ? changeDateFormat(endDate, 'YYYY-MM-DDT23:59:59') : '',
      title: keyword ? encodeURIComponent(keyword) : '',
      typeName: selectedCategory === '전체' ? '' : selectedCategory ? encodeURIComponent(selectedCategory) : '',
    },
    false,
  );

  useEffect(() => {
    void infoRefetch();
  }, [currentPage]);

  const handleDateSearchButton = () => {
    void infoRefetch();
  };

  const handleOnEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void infoRefetch();
    }
  };

  const handleInfoPreview = (info: IInfoData) => {
    setSelectedArticle(info);
  };

  const handleFilteredCategory = (typeName: string) => {
    setSelectedCategory(typeName);
  };

  useEffect(() => {
    if (selectedCategory) void infoRefetch();
  }, [selectedCategory]);

  const handleSearchRefreshButton = () => {
    setDateRange([null, null]);
    setKeyword('');
    setSelectedCategory('');
  };

  return {
    selectedArticle,
    currentPage,
    setCurrentPage,
    startDate,
    endDate,
    setDateRange,
    keyword,
    selectedCategory,
    handleSearchKeyword,
    options,
    infoList,
    totalPosts,
    handleDateSearchButton,
    handleOnEnterKeyDown,
    handleInfoPreview,
    handleFilteredCategory,
    handleSearchRefreshButton,
  };
};

export default useInfoManage;
