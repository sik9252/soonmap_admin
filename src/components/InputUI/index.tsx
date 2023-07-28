import { Input } from '@chakra-ui/react';

interface InputProps {
  placeholder: string;
}

function InputUI({ placeholder }: InputProps) {
  return (
    <Input
      width="91%"
      placeholder={placeholder}
      size="lg"
      variant="outline"
      borderColor="gray.300"
      focusBorderColor="gray.300"
      _focus={{
        boxShadow: 'none',
      }}
    />
  );
}

export default InputUI;
