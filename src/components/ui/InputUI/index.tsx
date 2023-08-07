import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

interface InputProps {
  width?: string;
  placeholder?: string;
  show?: boolean;
  defaultValue?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputUI({ width, placeholder, defaultValue, onChange }: InputProps) {
  return (
    <Input
      width={width ? width : '91%'}
      placeholder={placeholder}
      fontSize="14px"
      size="lg"
      variant="outline"
      borderColor="gray.300"
      focusBorderColor="gray.300"
      _focus={{
        boxShadow: 'none',
      }}
      backgroundColor="transparent"
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
}

export const PasswordInputUI = ({ width, placeholder, show, onClick, onChange }: InputProps) => {
  return (
    <InputGroup size="md">
      <Input
        width={width}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        fontSize="14px"
        size="lg"
        variant="outline"
        borderColor="gray.300"
        focusBorderColor="gray.300"
        _focus={{
          boxShadow: 'none',
        }}
        backgroundColor="#ffffff"
        mt="10px"
        onChange={onChange}
        autoComplete="off"
      />
      <InputRightElement width="4.5rem">
        <Button mt="1.75rem" h="1.75rem" size="sm" onClick={onClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
