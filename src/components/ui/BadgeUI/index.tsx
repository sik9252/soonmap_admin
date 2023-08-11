import { Badge } from '@chakra-ui/react';

export interface BadgeProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick?: () => void;
}

function BadgeUI({ children, isSelected, onClick }: BadgeProps) {
  return (
    <Badge
      cursor={'pointer'}
      padding="3px"
      mr="5px"
      _hover={{
        bg: '#CBD5E0',
      }}
      bg={isSelected ? '#A0AEC0' : '#EDF2F7'}
      onClick={onClick}
    >
      {children}
    </Badge>
  );
}

export default BadgeUI;
