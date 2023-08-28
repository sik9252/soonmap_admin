import React from 'react';
import { ButtonGroup, Button, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FileUploaderContainer, StyledFileInput, StyledImgInput } from './style';

interface FloorImageUploaderProps {
  defaultIndex: number;
  index: number;
  imgPreview: string[];
  onImageChange: (defaultIndex: number, index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FloorImageUploaderUI = ({ defaultIndex, index, imgPreview, onImageChange }: FloorImageUploaderProps) => {
  return (
    <FileUploaderContainer>
      <input
        type="file"
        id={`file_${defaultIndex}`}
        onChange={(e) => onImageChange(defaultIndex, index, e)}
        value={''}
      />
      {imgPreview[defaultIndex] ? (
        <StyledImgInput src={imgPreview[defaultIndex]} alt="" />
      ) : (
        <StyledFileInput placeholder="선택한 도면 이미지 미리보기" />
      )}
      <ButtonGroup size="sm" isAttached variant="outline" ml="20px">
        <Button as="label" htmlFor={`file_${defaultIndex}`} cursor={'pointer'}>
          도면 선택
        </Button>
        <IconButton
          as="label"
          htmlFor={`file_${defaultIndex}`}
          aria-label="Add File"
          icon={<AddIcon />}
          cursor={'pointer'}
        />
      </ButtonGroup>
    </FileUploaderContainer>
  );
};
