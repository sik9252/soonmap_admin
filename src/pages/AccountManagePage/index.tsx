import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Td, Th, TableContainer, Switch } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import RightContainer from '../../components/layout/RightContainer';
import { BanAlertDialogModal } from '../../components/features/AlertDialogModal';

function AccountManagePage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [accountList, setAccountList] = useState([
    {
      id: 1,
      name: '순맵',
      email: 'soonmap@test.com',
      isAdmin: true,
      isManager: true,
      isStaff: true,
      isBan: false,
      createdAt: '2023-08-01',
    },
    {
      id: 2,
      name: '총학생회',
      email: 'sch@test.com',
      isAdmin: false,
      isManager: true,
      isStaff: true,
      isBan: false,
      createdAt: '2023-08-01',
    },
    {
      id: 3,
      name: '공과대 학생회',
      email: 'sch_engineer@test.com',
      isAdmin: false,
      isManager: false,
      isStaff: true,
      isBan: false,
      createdAt: '2023-08-01',
    },
    {
      id: 4,
      name: '자연대 학생회',
      email: 'sch_nature@test.com',
      isAdmin: false,
      isManager: false,
      isStaff: true,
      isBan: true,
      createdAt: '2023-08-03',
    },
  ]);

  // const handleAlertDialog = (isBan: boolean) => {
  //   if (!isBan) {
  //     setIsAlertOpen(true);
  //   }
  // };

  return (
    <RightContainer title={'계정 관리'}>
      <BanAlertDialogModal isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>계정 이름</Th>
              <Th>계정 이메일</Th>
              <Th>계정 권한</Th>
              <Th>계정 생성일</Th>
              <Th textAlign={'center'}>상세정보</Th>
              <Th>계정 정지 여부</Th>
            </Tr>
          </Thead>
          <Tbody>
            {accountList &&
              accountList.map((account) => (
                <Tr>
                  <Td>{account.name}</Td>
                  <Td>{account.email}</Td>
                  <Td> {account.isAdmin ? '관리자' : account.isManager ? '매니저' : account.isStaff ? '일반' : ''}</Td>
                  <Td>{account.createdAt}</Td>
                  <Td textAlign={'center'}>
                    <InfoIcon
                      cursor={'pointer'}
                      onClick={() => alert('각 계정에서 작성한 글 목록을 볼 수 있도록하는 기능을 개발중입니다.')}
                    />
                  </Td>
                  <Td>
                    <Switch
                      colorScheme="red"
                      defaultChecked={account.isBan}
                      //onChange={() => handleAlertDialog(account.isBan)}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </RightContainer>
  );
}

export default AccountManagePage;
