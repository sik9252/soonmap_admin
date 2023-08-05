import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface PageNumProps {
  $currentPage: number;
  $number: number;
}

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0px 10px 0px;

  & > svg {
    cursor: pointer;
  }
  & > svg:nth-of-type(1) {
    margin-right: 7px;
  }
  & > svg:nth-last-of-type(1) {
    margin-left: 7px;
  }
`;

export const PageNum = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 12px;
  margin: 0 5px;
  cursor: pointer;

  ${({ $currentPage, $number }: PageNumProps) =>
    $currentPage === $number
      ? css`
          font-weight: 700;
          border: 1px solid #25549c;
          color: #25549c;
        `
      : null}
`;

export const HiddenBtn = styled.div`
  width: 30px;
  height: 30px;
`;
