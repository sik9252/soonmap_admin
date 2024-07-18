import { useRef } from 'react';
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
import useAlertDialogModal from './useAlertDialogModal';

export interface AlertProps {
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
  const { handleAlertDialog, handleDelete } = useAlertDialogModal({
    location,
    selectedItemIndex,
    isAlertOpen,
    setIsAlertOpen,
    currentPage,
    setCurrentPage,
  });

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

  const handleAccountBan = () => {
    // 계정 정지하기 요청
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => setIsAlertOpen(false)}
      isOpen={isAlertOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>해당 계정을 정지하시겠습니까?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
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
