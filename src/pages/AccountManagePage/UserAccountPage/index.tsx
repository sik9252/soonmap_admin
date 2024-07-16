import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Td, Th, TableContainer, Box } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { BanState } from '../style';
import RightContainer from '../../../components/layout/RightContainer';
import { BanAlertDialogModal } from '../../../components/features/AlertDialogModal';
import AccountManageModal from '../../../components/features/AccountManageModal';
import Pagination from '../../../components/features/Pagination';
import toast from 'react-hot-toast';
import { useGetUserAccountRequest, useGetTotalAccountCountRequest } from '../../../api-requests/Account';
import { useSelectedAccountAtom } from '../../../store/accountAtom';
import { IAccountData } from '../../../@types/Account';

function UserAccountPage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);
  const [accountList, setAccountList] = useState<IAccountData[] | null>([]);
  const [userCount, setUserCount] = useState(0);
  const { setSelectedAccount } = useSelectedAccountAtom();

  const {
    data: accountResult,
    isError: accountError,
    refetch: accountRefetch,
  } = useGetUserAccountRequest({ page: currentPage - 1 }, false);

  const { totalAccountCountRefetch } = useGetTotalAccountCountRequest(false);

  useEffect(() => {
    void accountRefetch();
  }, [currentPage]);

  useEffect(() => {
    void totalAccountCountRefetch();
  }, []);

  useEffect(() => {
    if (accountResult) {
      setAccountList(accountResult?.data.memberList);
      setTotalPosts(accountResult?.data.accountCount);
    } else if (accountError) {
      toast.error('유저 계정 목록을 불러오는데 실패했습니다.');
    }
  }, [accountResult, accountError]);

  const handleAccountManageModal = (account: IAccountData) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  return (
    <RightContainer title={'계정 관리'}>
      <BanAlertDialogModal
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <AccountManageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Box mb="10px" fontWeight="600" color="#25549c">
        유저 계정 관리 (총 계정 수: {userCount})
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>계정 이름</Th>
              <Th>계정 이메일</Th>
              <Th>계정 권한</Th>
              <Th>계정 생성일</Th>
              <Th>계정 정지 상태</Th>
              <Th textAlign={'center'}>계정 관리</Th>
            </Tr>
          </Thead>
          <Tbody>
            {accountList &&
              accountList.map((account) => (
                <Tr key={account.id}>
                  <Td>{account.name}</Td>
                  <Td>{account.email}</Td>
                  <Td>일반 사용자</Td>
                  <Td>{account.createAt?.slice(0, 10)}</Td>
                  <Td>{account.ban ? <BanState>정지</BanState> : <div>활성화</div>}</Td>
                  <Td textAlign={'center'}>
                    <SettingsIcon cursor={'pointer'} onClick={() => handleAccountManageModal(account)} />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        totalPosts={totalPosts * 10}
        postPerPages={10}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </RightContainer>
  );
}

export default UserAccountPage;
