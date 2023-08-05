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

interface AlertProps {
  isAlertOpen: boolean;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AlertDialogModal({ isAlertOpen, setIsAlertOpen }: AlertProps) {
  const cancelRef = useRef(null);

  const handleAlertDialog = () => {
    setIsAlertOpen(false);
  };

  const handleDelete = () => {
    // 삭제 요청, url 파싱헤서 카테고리면 카테고리에 공지사항이면 공지사항에 요청?
  };

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
        {/* <AlertDialogBody>삭제하면 복구할 수 없습니다.</AlertDialogBody> */}
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
