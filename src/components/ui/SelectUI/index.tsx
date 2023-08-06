import { Select } from '@chakra-ui/react';

type OptionType = {
  id: number;
  typeName: string;
  description: string;
};

interface SelectProps {
  options: OptionType[];
  handleCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectUI({ options, handleCategory }: SelectProps) {
  return (
    <Select
      onChange={handleCategory}
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
