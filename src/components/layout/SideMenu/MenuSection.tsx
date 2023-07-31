import { MenuItemContainer, MenuTitle } from './style';

type MenuItemProps = {
  menuTitle: string;
  children?: React.ReactNode;
};

function MenuItem({ menuTitle, children }: MenuItemProps) {
  return (
    <MenuItemContainer>
      <MenuTitle>{menuTitle}</MenuTitle>
      {children}
    </MenuItemContainer>
  );
}

export default MenuItem;
