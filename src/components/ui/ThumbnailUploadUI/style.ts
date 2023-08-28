import styled from '@emotion/styled';

export const FileUploaderContainer = styled.div`
  input[type='file'] {
    display: none;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledFileInput = styled.input`
  width: 300px;
  height: 200px;
  background-color: #eee;
  cursor: pointer;

  ::placeholder {
    font-size: 14px;
    text-align: center;
  }
`;

export const StyledImgInput = styled.img`
  width: 300px;
  height: 200px;
  object-fit: contain;
  border: 0.8px solid #cbd5e0;
  cursor: pointer;
`;
