import React, { useState } from 'react';
import { ButtonGroup, Button, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FileUploaderContainer, StyledFileInput } from './style';

export const FileUploaderUI = () => {
  const [FileName, setFileName] = useState('');

  const changeFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  return (
    <FileUploaderContainer>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button as="label" htmlFor="file" cursor={'pointer'}>
          파일 선택
        </Button>
        <IconButton as="label" htmlFor="file" aria-label="Add File" icon={<AddIcon />} cursor={'pointer'} />
      </ButtonGroup>
      <StyledFileInput placeholder="" value={FileName} />
      <input type="file" id="file" onChange={changeFileName} />
    </FileUploaderContainer>
  );
};
