import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin-bottom: 10px;

  & > svg {
    width: 30px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    color: #a6afb7;
  }
`;
