import { Select } from '@chakra-ui/react';

type OptionType = {
  id: number;
  value: string;
};

interface SelectProps {
  options: OptionType[];
}

function SelectUI({ options }: SelectProps) {
  return (
    <Select
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
        <option key={option.id} value={option.value}>
          {option.value}
        </option>
      ))}
    </Select>
  );
}

export default SelectUI;
