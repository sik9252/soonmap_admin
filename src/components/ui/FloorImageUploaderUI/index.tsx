import React from 'react';
import { ButtonGroup, Button, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FileUploaderContainer, StyledFileInput, StyledImgInput } from './style';

interface FloorImageUploaderProps {
  floorCount: number;
  index: number;
  imgPreview: string[];
  onImageChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FloorImageUploaderUI = ({ index, imgPreview, onImageChange }: FloorImageUploaderProps) => {
  return (
    <FileUploaderContainer>
      <input type="file" id={`file_${index}`} onChange={(e) => onImageChange(index, e)} value={''} />
      {imgPreview[index] ? (
        <StyledImgInput src={imgPreview[index]} alt="" />
      ) : (
        <StyledFileInput placeholder="선택한 도면 이미지 미리보기" />
      )}
      <ButtonGroup size="sm" isAttached variant="outline" ml="20px">
        <Button as="label" htmlFor={`file_${index}`} cursor={'pointer'}>
          도면 선택
        </Button>
        <IconButton as="label" htmlFor={`file_${index}`} aria-label="Add File" icon={<AddIcon />} cursor={'pointer'} />
      </ButtonGroup>
    </FileUploaderContainer>
  );
};
