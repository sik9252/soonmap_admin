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
import { useDeleteCategoryRequest, useGetCategoryRequest } from '../../../api/InfoCategory';
import { useDeleteInfoRequest, useGetInfoRequest } from '../../../api/Info';
import { useDeleteNoticeRequest, useGetNoticeRequest } from '../../../api/Notice';
import { useDeleteBuildingRequest, useGetBuildingRequest } from '../../../api/Building';
import toast from 'react-hot-toast';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useSelectedBuildingAtom } from '../../../store/buildingAtom';

interface AlertProps {
  location?: string;
  selectedItemIndex?: number;
  isAlertOpen: boolean;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AlertDialogModal({ location, selectedItemIndex, isAlertOpen, setIsAlertOpen }: AlertProps) {
  const cancelRef = useRef(null);
  const { selectedArticle, resetAtom } = useSelectedArticleAtom();
  const { selectedBuilding, resetBuildingAtom } = useSelectedBuildingAtom();

  const { refetch: getCategoryRefetch } = useGetCategoryRequest(
    {
      page: 0,
    },
    false,
  );

  const { refetch: getInfoRefetch } = useGetInfoRequest(
    {
      page: 0,
      startDate: '',
      endDate: '',
      title: '',
      typeName: '',
    },
    false,
  );

  const { refetch: getNoticeRefetch } = useGetNoticeRequest(
    {
      page: 0,
      startDate: '',
      endDate: '',
      title: '',
    },
    false,
  );

  const { refetch: getBuildingRefetch } = useGetBuildingRequest(
    {
      page: 0,
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
    } else if (location === '정보') {
      infoDeleteRequest({ id: selectedArticle.id });
    } else if (location === '공지') {
      noticeDeleteRequest({ id: selectedArticle.id });
    } else if (location === '건물') {
      deleteBuildingRequest({ id: selectedBuilding.id });
    }
  };

  useEffect(() => {
    if (categoryDeleteData) {
      toast.success('삭제되었습니다.');
      void getCategoryRefetch();
    } else if (categoryDeleteError) {
      toast.error((categoryDeleteError as Error).message);
    }
    setIsAlertOpen(false);
  }, [categoryDeleteData, categoryDeleteError]);

  useEffect(() => {
    if (infoDeleteData) {
      toast.success('삭제되었습니다.');
      void getInfoRefetch();
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
