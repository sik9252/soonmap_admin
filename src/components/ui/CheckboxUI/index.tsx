import { Checkbox } from '@chakra-ui/react';

interface CheckboxProps {
  children: React.ReactNode;
  isChecked: boolean;
  onChange: () => void;
}

function CheckboxUI({ children, isChecked, onChange }: CheckboxProps) {
  return (
    <Checkbox borderColor="gray.300" isChecked={isChecked} onChange={onChange}>
      {children}
    </Checkbox>
  );
}

export default CheckboxUI;
