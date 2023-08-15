import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import RightContainer from '../../../components/layout/RightContainer';
import Info from './Info';
import Notice from './Notice';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useEffect } from 'react';

function MyArticlePage() {
  const { resetAtom } = useSelectedArticleAtom();

  useEffect(() => {
    resetAtom();
  }, []);

  const ACCOUNT_MENU_DEFAULT = [
    {
      id: 1,
      tabName: '작성한 정보',
    },
  ];

  const ACCOUNT_MENU_ADMIN = [
    {
      id: 1,
      tabName: '작성한 공지사항',
    },
    {
      id: 2,
      tabName: '작성한 정보',
    },
  ];

  const ACCOUNT_SCREEN_DEFAULT = [
    {
      id: 1,
      screen: <Info />,
    },
  ];

  const ACCOUNT_SCREEN_ADMIN = [
    {
      id: 1,
      screen: <Notice />,
    },
    {
      id: 2,
      screen: <Info />,
    },
  ];

  return (
    <RightContainer title={'내가 작성한 글 관리'}>
      <Tabs variant="enclosed">
        {localStorage.getItem('auth') === 'one' ? (
          <>
            <TabList>
              {ACCOUNT_MENU_ADMIN.map((menu) => (
                <Tab key={menu.id}>{menu.tabName}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {ACCOUNT_SCREEN_ADMIN.map((screen) => (
                <TabPanel key={screen.id}>{screen.screen}</TabPanel>
              ))}
            </TabPanels>
          </>
        ) : (
          <>
            <TabList>
              {ACCOUNT_MENU_DEFAULT.map((menu) => (
                <Tab key={menu.id}>{menu.tabName}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {ACCOUNT_SCREEN_DEFAULT.map((screen) => (
                <TabPanel key={screen.id}>{screen.screen}</TabPanel>
              ))}
            </TabPanels>
          </>
        )}
      </Tabs>
    </RightContainer>
  );
}

export default MyArticlePage;
