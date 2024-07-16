import { useRef, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react';
import { useDeleteCategoryRequest, useGetCategoryRequest } from '../../../api-requests/InfoCategory';
import { useDeleteInfoRequest, useGetInfoRequest } from '../../../api-requests/Info';
import { useDeleteNoticeRequest, useGetNoticeRequest } from '../../../api-requests/Notice';
import { useDeleteBuildingRequest, useGetBuildingRequest } from '../../../api-requests/Building';
import { useGetMyInfoRequest, useGetMyNoticeRequest } from '../../../api-requests/MyPage';
import toast from 'react-hot-toast';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useSelectedBuildingAtom } from '../../../store/buildingAtom';
import { useCurrentLocationAtom } from '../../../store/currentLocationAtom';

interface AlertProps {
  location?: string;
  selectedItemIndex?: number;
  isAlertOpen: boolean;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function AlertDialogModal({
  location,
  selectedItemIndex,
  isAlertOpen,
  setIsAlertOpen,
  currentPage,
  setCurrentPage,
}: AlertProps) {
  const cancelRef = useRef(null);
  const { selectedArticle, resetAtom } = useSelectedArticleAtom();
  const { selectedBuilding, resetBuildingAtom } = useSelectedBuildingAtom();
  const { currentLocation } = useCurrentLocationAtom();

  const { refetch: getCategoryRefetch } = useGetCategoryRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const { refetch: getInfoRefetch } = useGetInfoRequest(
    {
      page: currentPage - 1,
      startDate: '',
      endDate: '',
      title: '',
      typeName: '',
    },
    false,
  );

  const { refetch: getNoticeRefetch } = useGetNoticeRequest(
    {
      page: currentPage - 1,
      startDate: '',
      endDate: '',
      title: '',
    },
    false,
  );

  const { refetch: getBuildingRefetch } = useGetBuildingRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const { refetch: myArticleRefetch } = useGetMyInfoRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const { refetch: myNoticeRefetch } = useGetMyNoticeRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const {
    mutate: categoryDeleteRequest,
    data: categoryDeleteData,
    error: categoryDeleteError,
    isLoading: categoryDeleteLoading,
  } = useDeleteCategoryRequest();

  const {
    mutate: infoDeleteRequest,
    data: infoDeleteData,
    error: infoDeleteError,
    isLoading: infoDeleteLoading,
  } = useDeleteInfoRequest();

  const {
    mutate: noticeDeleteRequest,
    data: noticeDeleteData,
    error: noticeDeleteError,
    isLoading: noticeDeleteLoading,
  } = useDeleteNoticeRequest();

  const {
    mutate: deleteBuildingRequest,
    data: deleteBuildingData,
    error: deleteBuildingError,
    isLoading: deleteBuildingLoading,
  } = useDeleteBuildingRequest();

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

  useEffect(() => {
    if (categoryDeleteData) {
      toast.success('삭제되었습니다.');
      void getCategoryRefetch();
      setCurrentPage(1);
    } else if (categoryDeleteError) {
      toast.error((categoryDeleteError as Error).message);
    }
    setIsAlertOpen(false);
  }, [categoryDeleteData, categoryDeleteError]);

  useEffect(() => {
    if (infoDeleteData) {
      toast.success('삭제되었습니다.');
      void getInfoRefetch();
      void myArticleRefetch();
      setCurrentPage(1);
      resetAtom();
    } else if (infoDeleteError) {
      toast.error((infoDeleteError as Error).message);
    }
    setIsAlertOpen(false);
  }, [infoDeleteData, infoDeleteError]);

  useEffect(() => {
    if (noticeDeleteData) {
      toast.success('삭제되었습니다.');
      void getNoticeRefetch();
      void myNoticeRefetch();
      setCurrentPage(1);
      resetAtom();
    } else if (noticeDeleteError) {
      toast.error((noticeDeleteError as Error).message);
    }
    setIsAlertOpen(false);
  }, [noticeDeleteData, noticeDeleteError]);

  useEffect(() => {
    if (deleteBuildingData) {
      toast.success('삭제되었습니다.');
      void getBuildingRefetch();
      setCurrentPage(1);
      resetBuildingAtom();
    } else if (deleteBuildingError) {
      toast.error((deleteBuildingError as Error).message);
    }
    setIsAlertOpen(false);
  }, [deleteBuildingData, deleteBuildingError]);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => handleAlertDialog()}
      isOpen={isAlertOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>정말 삭제하시겠습니까?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>삭제하면 복구할 수 없습니다.</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={() => handleAlertDialog()}>
            취소
          </Button>
          <Button colorScheme="red" ml={3} onClick={() => handleDelete()}>
            삭제
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogModal;

export const BanAlertDialogModal = ({ isAlertOpen, setIsAlertOpen }: AlertProps) => {
  const cancelRef = useRef(null);

  const handleBanAlertDialog = () => {
    setIsAlertOpen(false);
  };

  const handleAccountBan = () => {
    // 계정 정지하기
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => handleBanAlertDialog()}
      isOpen={isAlertOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>해당 계정을 정지하시겠습니까?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={() => handleBanAlertDialog()}>
            취소
          </Button>
          <Button colorScheme="red" ml={3} onClick={() => handleAccountBan()}>
            정지
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
