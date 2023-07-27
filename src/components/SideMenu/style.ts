import styled from '@emotion/styled';

// SideMenu
export const SideMenuContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #24549c;
  color: #ffffff;
  padding: 15px;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const Logo = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding: 0 5px 0 15px;
`;

// MenuItem
export const MenuItemContainer = styled.div`
  margin-bottom: 40px;
`;

export const MenuTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
`;

export const Item = styled.div`
  font-size: 14px;
  margin: 8px 0;
  cursor: pointer;

  & > span {
    padding-right: 3.5px;
  }
`;
