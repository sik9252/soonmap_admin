import React from 'react';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useSelectedBuildingAtom } from '../../../store/buildingAtom';
import { useCurrentLocationAtom } from '../../../store/currentLocationAtom';
import { useDeleteCategoryRequest } from '../../../api-hooks/InfoCategory';
import { useDeleteArticleRequest } from '../../../api-hooks/Info';
import { useDeleteNoticeRequest } from '../../../api-hooks/Notice';
import { useDeleteBuildingRequest } from '../../../api-hooks/Building';
import { AlertProps } from '.';

const useAlertDialogModal = ({
  location,
  selectedItemIndex,
  setIsAlertOpen,
  currentPage,
  setCurrentPage,
}: AlertProps) => {
  const { selectedArticle } = useSelectedArticleAtom();
  const { selectedBuilding } = useSelectedBuildingAtom();
  const { currentLocation } = useCurrentLocationAtom();

  const { categoryDeleteRequest } = useDeleteCategoryRequest(currentPage, setCurrentPage, setIsAlertOpen);
  const { infoDeleteRequest } = useDeleteArticleRequest(currentPage, setCurrentPage, setIsAlertOpen);
  const { noticeDeleteRequest } = useDeleteNoticeRequest(currentPage, setCurrentPage, setIsAlertOpen);
  const { deleteBuildingRequest } = useDeleteBuildingRequest(currentPage, setCurrentPage, setIsAlertOpen);

  const handleAlertDialog = () => {
    setIsAlertOpen(false);
  };

  const handleDelete = () => {
    if (location === '카테고리') {
      categoryDeleteRequest({ id: selectedItemIndex });
    } else if (location === '정보' || currentLocation === '작성한 정보') {
      infoDeleteRequest({ id: selectedArticle.id });
    } else if (location === '공지' || currentLocation === '작성한 공지사항') {
      noticeDeleteRequest({ id: selectedArticle.id });
    } else if (location === '건물') {
      deleteBuildingRequest({ id: selectedBuilding.id });
    }
  };

  return {
    handleAlertDialog,
    handleDelete,
  };
};

export default useAlertDialogModal;
