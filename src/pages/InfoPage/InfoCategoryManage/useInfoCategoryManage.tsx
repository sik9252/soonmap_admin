import { useState } from 'react';
import { useGetCategoryRequest } from '../../../api-hooks/InfoCategory';

const useInfoCategoryManage = () => {
  const [isAddClick, setIsAddClick] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { categoryList, totalPosts } = useGetCategoryRequest({
    page: currentPage - 1,
  });

  const handleCategoryAddButton = () => {
    setIsAddClick(true);
  };

  const handleAlertDialog = (categoryId: number) => {
    setLocation('카테고리');
    setSelectedItemIndex(categoryId);
    setIsAlertOpen(true);
  };

  return {
    isAddClick,
    setIsAddClick,
    isAlertOpen,
    setIsAlertOpen,
    location,
    selectedItemIndex,
    currentPage,
    setCurrentPage,
    categoryList,
    totalPosts,
    handleCategoryAddButton,
    handleAlertDialog,
  };
};

export default useInfoCategoryManage;
