import styled from '@emotion/styled';

export const FileUploaderContainer = styled.div`
  input[type='file'] {
    display: none;
  }

  display: flex;
  align-items: center;
`;

export const StyledFileInput = styled.input`
  width: 300px;
  height: 200px;
  background-color: #eee;
  cursor: default;

  ::placeholder {
    font-size: 14px;
    text-align: center;
  }
`;

export const StyledImgInput = styled.img`
  width: 300px;
  height: 200px;
  object-fit: contain;
`;
