import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Td, Th, TableContainer, Box } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { BanState } from '../style';
import RightContainer from '../../../components/layout/RightContainer';
import { BanAlertDialogModal } from '../../../components/features/AlertDialogModal';
import AccountManageModal from '../../../components/features/AccountManageModal';
import Pagination from '../../../components/features/Pagination';
import toast from 'react-hot-toast';
import { useGetAdminAccountRequest, useGetTotalAccountCountRequest } from '../../../api/Account';
import { AccountDataType } from '../../../api/Account';
import { useSelectedAccountAtom } from '../../../store/accountAtom';

function AdminAccountPage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);
  const [accountList, setAccountList] = useState<AccountDataType[] | null>([]);
  const [adminCount, setAdminCount] = useState(0);
  const { setSelectedAccount } = useSelectedAccountAtom();

  const {
    data: accountResult,
    isError: accountError,
    refetch: accountRefetch,
  } = useGetAdminAccountRequest({ page: currentPage - 1 }, false);

  const {
    data: totalAccountCountResult,
    isError: totalAccountCountError,
    refetch: totalAccountCountRefetch,
  } = useGetTotalAccountCountRequest(false);

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
      toast.error('회원 계정 목록을 불러오는데 실패했습니다.');
    }
  }, [accountResult, accountError]);

  useEffect(() => {
    if (totalAccountCountResult) {
      setAdminCount(totalAccountCountResult?.data.adminCount);
    } else if (totalAccountCountError) {
      toast.error('총 계정 수를 불러오는데 실패했습니다.');
    }
  }, [totalAccountCountResult, totalAccountCountError]);

  const handleAccountManageModal = (account: AccountDataType) => {
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
        관리자 계정 관리 (총 계정 수: {adminCount})
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>계정 이름</Th>
              <Th>계정 이메일</Th>
              <Th>계정 권한</Th>
              <Th>계정 생성일</Th>
              <Th>가입 승인 상태</Th>
              <Th textAlign={'center'}>계정 관리</Th>
            </Tr>
          </Thead>
          <Tbody>
            {accountList &&
              accountList.map((account) => (
                <Tr key={account.id}>
                  <Td>{account.name}</Td>
                  <Td>{account.email}</Td>
                  <Td> {account.admin ? 'Admin' : account.manager ? 'Manager' : account.staff ? 'Staff' : ''}</Td>
                  <Td>{account.createAt?.slice(0, 10)}</Td>
                  <Td>{account.ban ? <BanState>미승인</BanState> : <div>승인</div>}</Td>
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

export default AdminAccountPage;
