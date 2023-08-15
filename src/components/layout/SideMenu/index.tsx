import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SideMenuContainer, ProfileSection, Logo, Title, Item, FooterSection } from './style';
import { removeAuthToken } from '../../../utils/setAuthToken';
import SoonMapWhiteLogo from '../../../assets/soonmap_white.png';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import toast from 'react-hot-toast';
import AccordionUI from '../../ui/AccordionUI';
import { Accordion } from '@chakra-ui/react';

function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const hierarchy = localStorage.getItem('auth');

    if (hierarchy === 'one') {
      setIsAdmin(true);
      setIsManager(true);
      setIsStaff(true);
    } else if (hierarchy === 'two') {
      setIsManager(true);
      setIsStaff(true);
    } else if (hierarchy === 'three') {
      setIsStaff(true);
    }
  }, []);

  const goToPage = (url: string) => {
    navigate(url);
  };

  const handleLogoutButton = () => {
    removeAuthToken();
    toast.success('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
    <SideMenuContainer>
      <ProfileSection>
        <Logo src={SoonMapWhiteLogo} alt="logo" onClick={() => goToPage('/home')} />
        <Title>{localStorage.getItem('user_name')}</Title>
      </ProfileSection>
      <Accordion allowToggle={true}>
        {isAdmin ? (
          <>
            <AccordionUI menuTitle={'건물 및 강의실 정보'}>
              <Item onClick={() => goToPage('/campus/create')} $isSelected={location.pathname === '/campus/create'}>
                <span>{'-'}</span> 건물 및 강의실 업로드
              </Item>
              <Item onClick={() => goToPage('/campus/manage')} $isSelected={location.pathname === '/campus/manage'}>
                <span>{'-'}</span> 건물 및 강의실 관리
              </Item>
            </AccordionUI>
            <AccordionUI menuTitle={'공지사항 게시판'}>
              <Item onClick={() => goToPage('/notice/create')} $isSelected={location.pathname === '/notice/create'}>
                <span>{'-'}</span> 공지사항 글 업로드
              </Item>
              <Item onClick={() => goToPage('/notice/manage')} $isSelected={location.pathname === '/notice/manage'}>
                <span>{'-'}</span> 공지사항 글 관리
              </Item>
            </AccordionUI>
          </>
        ) : null}
        <AccordionUI menuTitle={'정보 게시판'}>
          <Item onClick={() => goToPage('/info/create')} $isSelected={location.pathname === '/info/create'}>
            <span>{'-'}</span> 정보 글 업로드
          </Item>
          <Item onClick={() => goToPage('/info/manage')} $isSelected={location.pathname === '/info/manage'}>
            <span>{'-'}</span> 정보 글 관리
          </Item>
          <Item onClick={() => goToPage('/info/category')} $isSelected={location.pathname === '/info/category'}>
            <span>{'-'}</span> 정보 카테고리 관리
          </Item>
        </AccordionUI>
        {isAdmin || isManager ? (
          <AccordionUI menuTitle={'관리자 계정 관리'}>
            <Item onClick={() => goToPage('/account/manage')} $isSelected={location.pathname === '/account/manage'}>
              <span>{'-'}</span> 계정 관리
            </Item>
          </AccordionUI>
        ) : null}
        <AccordionUI menuTitle={'마이페이지'}>
          <Item onClick={() => goToPage('/my/info')} $isSelected={location.pathname === '/my/info'}>
            <span>{'-'}</span> 내 정보 관리
          </Item>
          <Item onClick={() => goToPage('/my/article')} $isSelected={location.pathname === '/my/article'}>
            <span>{'-'}</span> 내가 작성한 글 관리
          </Item>
        </AccordionUI>
      </Accordion>
      <FooterSection>
        <div onClick={() => handleLogoutButton()}>
          로그아웃
          <ArrowForwardIcon />
        </div>
      </FooterSection>
    </SideMenuContainer>
  );
}

export default SideMenu;
