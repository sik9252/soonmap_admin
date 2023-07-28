import { ButtonGroup, Button, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  onClick: () => void;
}

export const DefaultButton = ({ children, isLoading, loadingText, onClick }: ButtonProps) => {
  return (
    <Button
      isLoading={isLoading}
      loadingText={loadingText}
      bg="#24549C"
      color="white"
      _hover={{
        bg: '#1a478a',
      }}
      variant="outline"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const FileUploadButton = () => {
  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <Button>파일 업로드</Button>
      <IconButton aria-label="Add File" icon={<AddIcon />} />
    </ButtonGroup>
  );
};
