import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import FindId from './FindId';
import FindPassword from './FindPassword';
import { Container } from './style';

function FindAccountPage() {
  return (
    <Container>
      <Tabs isManual variant="enclosed">
        <TabList>
          <Tab>아이디 찾기</Tab>
          <Tab>비밀번호 재발급</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FindId />
          </TabPanel>
          <TabPanel>
            <FindPassword />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default FindAccountPage;
