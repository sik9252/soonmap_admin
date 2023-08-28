import React from 'react';
import { ButtonGroup, Button, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FileUploaderContainer, StyledImgInput } from './style';

interface FloorImageUploaderProps {
  ThumbnailImage: string | undefined;
  handleThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setThumbnail: React.Dispatch<React.SetStateAction<string | undefined>>;
  setThumbnailUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ThumbnailUploadUI = ({
  ThumbnailImage,
  handleThumbnailChange,
  setThumbnail,
  setThumbnailUrl,
}: FloorImageUploaderProps) => {
  const handleThumbnailRemove = () => {
    setThumbnail('');
    setThumbnailUrl('');
  };

  return (
    <FileUploaderContainer>
      <input type="file" id="file" onChange={(e) => handleThumbnailChange(e)} />
      {ThumbnailImage ? (
        <label htmlFor="file">
          <StyledImgInput src={ThumbnailImage} alt="" />
        </label>
      ) : (
        <Button
          as="label"
          htmlFor="file"
          width="300px"
          height="200px"
          backgroundColor="#eee"
          cursor="pointer"
          color="#777"
        >
          썸네일 이미지 선택하기
        </Button>
      )}
      <Button onClick={() => handleThumbnailRemove()} mt="20px">
        썸네일 제거하기
      </Button>
    </FileUploaderContainer>
  );
};
