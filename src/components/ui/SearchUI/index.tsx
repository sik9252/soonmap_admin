import React from 'react';
import { SearchBarContainer } from './style';
import InputUI from '../InputUI';
import { ReactComponent as SearchBtn } from '../../../assets/SearchBtn.svg';

interface SearchProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchUI = ({ placeholder, onChange, onKeyDown }: SearchProps) => {
  return (
    <SearchBarContainer>
      <InputUI placeholder={placeholder} width="100%" onChange={onChange} onKeyDown={onKeyDown} />
      <SearchBtn />
    </SearchBarContainer>
  );
};

export default SearchUI;
