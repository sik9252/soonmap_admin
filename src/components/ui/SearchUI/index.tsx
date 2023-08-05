import React from 'react';
import { SearchBarContainer } from './style';
import InputUI from '../InputUI';
import { ReactComponent as SearchBtn } from '../../../assets/SearchBtn.svg';

interface SearchProps {
  placeholder: string;
}

const SearchUI = ({ placeholder }: SearchProps) => {
  return (
    <SearchBarContainer>
      <InputUI placeholder={placeholder} width="100%" />
      <SearchBtn />
    </SearchBarContainer>
  );
};

export default SearchUI;
