import { Select } from '@chakra-ui/react';
import { ICategoryData } from '../../../@types/InfoCategory';

interface SelectProps {
  options: ICategoryData[];
  defaultValue?: string;
  handleCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectUI({ options, defaultValue, handleCategory }: SelectProps) {
  return (
    <Select
      onChange={handleCategory}
      defaultValue={defaultValue}
      placeholder="카테고리를 선택하세요."
      variant="outline"
      borderColor="gray.300"
      focusBorderColor="gray.300"
      _focus={{
        boxShadow: 'none',
      }}
      size="lg"
      width="25%"
      mr="10px"
    >
      {options.map((option) => (
        <option key={option.id} value={option.typeName}>
          {option.typeName}
        </option>
      ))}
    </Select>
  );
}

export default SelectUI;
