import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SideMenuContainer, ProfileSection, Logo, Title, Item } from './style';
import MenuSection from './MenuSection';
import SoonMapWhiteLogo from '../../../assets/soonmap_white.png';
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, InfoIcon, SmallCloseIcon } from '@chakra-ui/icons';

function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(true);
  const [isManager, setIsManager] = useState(false);

  const goToPage = (url: string) => {
    navigate(url);
  };

  return (
    <SideMenuContainer>
      <ProfileSection>
        <Logo src={SoonMapWhiteLogo} alt="logo" onClick={() => goToPage('/home')} />
        <Title>관리자 계정</Title>
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="none" />
          <MenuList>
            <MenuItem color="#000000" icon={<InfoIcon />}>
              내 정보
            </MenuItem>
            <MenuItem color="#000000" icon={<SmallCloseIcon />}>
              로그아웃
            </MenuItem>
          </MenuList>
        </Menu>
      </ProfileSection>
      {isAdmin ? (
        <>
          <MenuSection menuTitle={'건물 및 강의실 정보'}>
            <Item onClick={() => goToPage('/campus/create')} $isSelected={location.pathname === '/campus/create'}>
              <span>{'▶'}</span> 건물 및 강의실 업로드
            </Item>
            <Item onClick={() => goToPage('/campus/manage')} $isSelected={location.pathname === '/campus/manage'}>
              <span>{'▶'}</span> 건물 및 강의실 관리
            </Item>
          </MenuSection>
          <MenuSection menuTitle={'공지사항 게시판'}>
            <Item onClick={() => goToPage('/notice/create')} $isSelected={location.pathname === '/notice/create'}>
              <span>{'▶'}</span> 공지사항 글 업로드
            </Item>
            <Item onClick={() => goToPage('/notice/manage')} $isSelected={location.pathname === '/notice/manage'}>
              <span>{'▶'}</span> 공지사항 글 관리
            </Item>
          </MenuSection>
        </>
      ) : null}
      <MenuSection menuTitle={'정보 게시판'}>
        <Item onClick={() => goToPage('/info/create')} $isSelected={location.pathname === '/info/create'}>
          <span>{'▶'}</span> 정보 글 업로드
        </Item>
        <Item onClick={() => goToPage('/info/manage')} $isSelected={location.pathname === '/info/manage'}>
          <span>{'▶'}</span> 정보 글 관리
        </Item>
        <Item onClick={() => goToPage('/info/category')} $isSelected={location.pathname === '/info/category'}>
          <span>{'▶'}</span> 정보 카테고리 관리
        </Item>
      </MenuSection>
      {isAdmin || isManager ? (
        <MenuSection menuTitle={'관리자 계정 관리'}>
          <Item onClick={() => goToPage('/account/manage')} $isSelected={location.pathname === '/account/manage'}>
            <span>{'▶'}</span> 계정 관리
          </Item>
        </MenuSection>
      ) : null}
    </SideMenuContainer>
  );
}

export default SideMenu;
