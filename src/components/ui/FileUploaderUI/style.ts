import styled from '@emotion/styled';

export const FileUploaderContainer = styled.div`
  width: 100%;

  input[type='file'] {
    display: none;
  }

  display: flex;
  align-items: center;
`;

export const StyledFileInput = styled.input`
  width: 100%;
  color: #777;
  background-color: transparent;
  border: none;
  margin-left: 15px;

  ::placeholder {
    font-size: 18px;
    color: #716b6b;
  }

  :focus {
    outline: none;
  }
`;
