import { ButtonGroup, Button, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface ButtonProps {
  width?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  mr?: string;
  onClick: () => void;
}

export const DefaultButton = ({ width, children, isLoading, loadingText, mr, onClick }: ButtonProps) => {
  return (
    <Button
      width={width ? width : ''}
      isLoading={isLoading}
      loadingText={loadingText}
      bg="#24549C"
      color="white"
      _hover={{
        bg: '#1a478a',
      }}
      variant="outline"
      onClick={onClick}
      mr={mr}
    >
      {children}
    </Button>
  );
};

export const CancelButton = ({ width, children, isLoading, loadingText, onClick }: ButtonProps) => {
  return (
    <Button
      width={width ? width : ''}
      isLoading={isLoading}
      loadingText={loadingText}
      bg="#E2E8F0"
      color="black"
      _hover={{
        bg: '#CBD5E0',
      }}
      variant="none"
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
