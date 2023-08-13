import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Td, Th, TableContainer } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { BanState } from './style';
import RightContainer from '../../components/layout/RightContainer';
import { BanAlertDialogModal } from '../../components/features/AlertDialogModal';
import AccountManageModal from '../../components/features/AccountManageModal';
import toast from 'react-hot-toast';
import { useGetAccountRequest } from '../../api/Account';
import { AccountDataType } from '../../api/Account';
import { useSelectedAccountAtom } from '../../store/accountAtom';

function AccountManagePage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [accountList, setAccountList] = useState<AccountDataType[] | null>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { setSelectedAccount } = useSelectedAccountAtom();

  const { data: accountResult, isError: accountError, refetch: accountRefetch } = useGetAccountRequest();

  useEffect(() => {
    if (accountResult) {
      setAccountList(accountResult?.data.memberList);
      setTotalCount(accountResult?.data.accountCount);
    } else if (accountError) {
      toast.error('회원 계정 목록을 불러오는데 실패했습니다.');
    }
  }, [accountResult, accountError]);

  const handleAccountManageModal = (account: AccountDataType) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  return (
    <RightContainer title={'계정 관리'}>
      <BanAlertDialogModal isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} />
      <AccountManageModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
                  <Td> {account.admin ? '관리자' : account.manager ? '매니저' : account.staff ? '일반' : ''}</Td>
                  <Td>{account.createAt}</Td>
                  <Td>{account.ban ? <BanState>미승인</BanState> : <div>승인</div>}</Td>
                  <Td textAlign={'center'}>
                    <SettingsIcon cursor={'pointer'} onClick={() => handleAccountManageModal(account)} />
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
