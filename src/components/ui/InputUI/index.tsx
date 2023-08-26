import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

interface InputProps {
  width?: string;
  placeholder?: string;
  show?: boolean;
  defaultValue?: string;
  value?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  maxLength?: number;
  type?: string;
}

export default function InputUI({
  width,
  placeholder,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  isDisabled,
  maxLength,
  type,
}: InputProps) {
  return (
    <Input
      type={type ? type : 'text'}
      width={width ? width : '91%'}
      placeholder={placeholder}
      value={value}
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
      onKeyDown={onKeyDown}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      maxLength={maxLength}
    />
  );
}

export const PasswordInputUI = ({ width, placeholder, show, onClick, onChange, onKeyDown }: InputProps) => {
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
        onKeyDown={onKeyDown}
      />
      <InputRightElement width="4.5rem">
        <Button mt="1.75rem" h="1.75rem" size="sm" onClick={onClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
