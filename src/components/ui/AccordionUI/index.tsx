import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';

type MenuItemProps = {
  menuTitle: string;
  children?: React.ReactNode;
};

function AccordionUI({ menuTitle, children }: MenuItemProps) {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left" fontWeight={600}>
          {menuTitle}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>{children}</AccordionPanel>
    </AccordionItem>
  );
}

export default AccordionUI;
