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

function AlertDialogUI({ isAlertOpen, setIsAlertOpen }: AlertProps) {
  const cancelRef = useRef(null);

  const handleAlertDialog = () => {
    setIsAlertOpen(false);
  };

  const handleNoticeDelete = () => {
    // 게시글 삭제 요청
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
        <AlertDialogHeader>정말 게시글을 삭제하시겠습니까?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>게시글은 삭제하면 복구할 수 없습니다.</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={() => handleAlertDialog()}>
            취소
          </Button>
          <Button colorScheme="red" ml={3} onClick={() => handleNoticeDelete()}>
            삭제
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogUI;
