import React, { useState, useEffect } from 'react';
import { PaginationContainer, PageNum, HiddenBtn } from './style';
import { ReactComponent as PagePrevBtn } from '../../assets/PagePrevBtn.svg';
import { ReactComponent as PageNextBtn } from '../../assets/PageNextBtn.svg';

interface PaginationProps {
  totalPosts: number;
  postPerPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postPerPages }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFirstPage, setIsFirstPage] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const totalPages = Math.ceil(totalPosts / postPerPages);

  useEffect(() => {
    const getPageList = () => {
      const start = 1 + Math.floor((currentPage - 1) / 5) * 5;
      const end = Math.min(start + 4, totalPages);
      const pageNumbers = Array.from({ length: end - start + 1 }, (_, i) => i + start);
      return pageNumbers;
    };

    setPageNumbers(getPageList());
  }, [currentPage, totalPages]);

  const clickPagePrevBtn = (e: React.MouseEvent) => {
    if (currentPage === 1) {
      e.preventDefault();
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const clickPageNextBtn = (e: React.MouseEvent) => {
    if (currentPage === Math.ceil(totalPosts / postPerPages)) {
      e.preventDefault();
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (currentPage === 1) {
      setIsFirstPage(true);
    } else {
      setIsFirstPage(false);
    }

    if (currentPage === Math.ceil(totalPosts / postPerPages)) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [currentPage]);

  const clickPageNum = (number: number) => {
    setCurrentPage(number);
  };

  return (
    <PaginationContainer>
      {isFirstPage ? <HiddenBtn /> : <PagePrevBtn onClick={(e) => clickPagePrevBtn(e)} />}
      {pageNumbers.map((number) => (
        <PageNum key={number} onClick={() => clickPageNum(number)} $currentPage={currentPage} $number={number}>
          {number}
        </PageNum>
      ))}
      {isLastPage ? <HiddenBtn /> : <PageNextBtn onClick={(e) => clickPageNextBtn(e)} />}
    </PaginationContainer>
  );
};

export default Pagination;
