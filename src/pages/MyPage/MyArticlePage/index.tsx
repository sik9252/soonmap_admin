import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import RightContainer from '../../../components/layout/RightContainer';
import useMyArticle from './useMyArticle';

function MyArticlePage() {
  const {
    ACCOUNT_MENU_DEFAULT,
    ACCOUNT_MENU_ADMIN,
    ACCOUNT_SCREEN_DEFAULT,
    ACCOUNT_SCREEN_ADMIN,
    handleCurrentLocation,
  } = useMyArticle();

  return (
    <RightContainer title={'내가 작성한 글 관리'}>
      <Tabs variant="enclosed">
        {localStorage.getItem('auth') === 'one' ? (
          <>
            <TabList>
              {ACCOUNT_MENU_ADMIN.map((menu) => (
                <Tab key={menu.id} onClick={() => handleCurrentLocation(menu.tabName)}>
                  {menu.tabName}
                </Tab>
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
                <Tab key={menu.id} onClick={() => handleCurrentLocation(menu.tabName)}>
                  {menu.tabName}
                </Tab>
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
