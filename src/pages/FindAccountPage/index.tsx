import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import FindId from './FindId';
import FindPassword from './FindPassword';
import { Container } from './style';
import { Link } from 'react-router-dom';

function FindAccountPage() {
  return (
    <Container>
      <Box mb="10px" color="#777" textAlign="right">
        <Link to="/login">로그인 페이지로 돌아가기</Link>
      </Box>

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
