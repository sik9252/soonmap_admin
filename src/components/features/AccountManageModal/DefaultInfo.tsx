import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AccountDataType } from '../../../api/Account';
import { Button } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import {
  useChangeBanStateRequest,
  useGetAdminAccountRequest,
  useGiveManagerAuthRequest,
  useGetUserAccountRequest,
} from '../../../api/Account';
import { DefaultButton } from '../../ui/ButtonUI';
import { AccountInfoText, FooterSection } from './style';

export interface SelectedAccountProps {
  selectedAccount: AccountDataType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function DefaultInfo({ selectedAccount, setIsModalOpen, currentPage, setCurrentPage }: SelectedAccountProps) {
  const location = useLocation();

  const { refetch: getAdminAccountRefetch } = useGetAdminAccountRequest({ page: currentPage - 1 });
  const { refetch: getUserAccountRefetch } = useGetUserAccountRequest({ page: currentPage - 1 });

  const {
    mutate: accountBanStateRequest,
    data: accountBanStateData,
    error: accountBanStateError,
    isLoading: accountBanStateLoading,
  } = useChangeBanStateRequest();

  const {
    mutate: giveManagerAuthRequest,
    data: giveManagerAuthStateData,
    error: giveManagerAuthStateError,
    isLoading: giveManagerAuthStateLoading,
  } = useGiveManagerAuthRequest();

  useEffect(() => {
    if (accountBanStateData) {
      if (selectedAccount.ban) {
        toast.success('계정이 활성화되었습니다.');
        setCurrentPage(1);
      } else if (!selectedAccount.ban) {
        toast('계정이 비활성화되었습니다.', {
          icon: '⚠️',
        });
      }
      void getAdminAccountRefetch();
      void getUserAccountRefetch();
      setIsModalOpen(false);
    } else if (accountBanStateError) {
      toast.error((accountBanStateError as Error).message);
    }
  }, [accountBanStateData, accountBanStateError]);

  useEffect(() => {
    if (giveManagerAuthStateData) {
      if (!selectedAccount.manager) {
        toast.success('해당 계정에 매니저 권한이 부여되었습니다.');
        setCurrentPage(1);
      } else if (selectedAccount.manager) {
        toast('해당 계정의 매니저 권한이 제거되었습니다.', {
          icon: '⚠️',
        });
      }
      void getAdminAccountRefetch();
      setIsModalOpen(false);
    } else if (giveManagerAuthStateError) {
      toast.error((giveManagerAuthStateError as Error).message);
    }
  }, [giveManagerAuthStateData, giveManagerAuthStateError]);

  const handleChangeBanState = () => {
    if (selectedAccount.ban) {
      const isYesClicked = confirm('정말 해당 계정을 활성화 하시겠습니까?');
      if (isYesClicked) accountBanStateRequest({ id: selectedAccount.id });
    } else if (!selectedAccount.ban) {
      const isYesClicked = confirm('정말 해당 계정을 비활성화 하시겠습니까?');
      if (isYesClicked) accountBanStateRequest({ id: selectedAccount.id });
    }
  };

  const handleGiveManagerAuth = () => {
    if (!selectedAccount.manager) {
      const isYesClicked = confirm('정말 해당 계정에 매니저 권한을 부여하시겠습니까?');
      if (isYesClicked) giveManagerAuthRequest({ id: selectedAccount.id });
    } else if (selectedAccount.manager) {
      const isYesClicked = confirm('정말 해당 계정의 매니저 권한을 해제하시겠습니까??');
      if (isYesClicked) giveManagerAuthRequest({ id: selectedAccount.id });
    }
  };

  return (
    <div>
      <AccountInfoText>계정 이름: {selectedAccount.name}</AccountInfoText>
      <AccountInfoText>계정 이메일: {selectedAccount.email || '이메일이 없습니다.'}</AccountInfoText>
      <AccountInfoText>
        계정 권한:{' '}
        {location.pathname === '/account/admin-manage' ? (
          <>
            {' '}
            {selectedAccount.admin
              ? 'Admin'
              : selectedAccount.manager
              ? 'Manager'
              : selectedAccount.staff
              ? 'Staff'
              : ''}
          </>
        ) : (
          '일반 사용자'
        )}
      </AccountInfoText>
      <AccountInfoText>계정 생성일: {selectedAccount.createAt?.slice(0, 10)}</AccountInfoText>
      <AccountInfoText>
        계정 활성화 상태: {selectedAccount.ban ? '비활성화된 계정입니다.' : '활성화된 계정입니다.'}
      </AccountInfoText>

      {location.pathname === '/account/admin-manage' ? (
        <FooterSection>
          <>
            {localStorage.getItem('auth') === 'one' && !selectedAccount.admin ? (
              selectedAccount.manager ? (
                <Button
                  onClick={() => handleGiveManagerAuth()}
                  mr="10px"
                  isLoading={giveManagerAuthStateLoading}
                  loadingText="권한 부여중"
                >
                  매니저 권한 해제하기
                </Button>
              ) : (
                <Button
                  onClick={() => handleGiveManagerAuth()}
                  mr="10px"
                  isLoading={giveManagerAuthStateLoading}
                  loadingText="권한 부여중"
                >
                  매니저 권한 부여하기
                </Button>
              )
            ) : (
              ''
            )}
            {selectedAccount.admin && selectedAccount.manager && selectedAccount.staff ? (
              ''
            ) : (
              <>
                {selectedAccount.ban ? (
                  <DefaultButton onClick={() => handleChangeBanState()}>계정 활성화하기</DefaultButton>
                ) : (
                  <Button
                    bgColor="#dc143c"
                    color="#ffffff"
                    _hover={{
                      bg: '#CE2029',
                    }}
                    onClick={() => handleChangeBanState()}
                    isLoading={accountBanStateLoading}
                    loadingText="비활성화중"
                  >
                    계정 비활성화하기
                  </Button>
                )}
              </>
            )}
          </>
        </FooterSection>
      ) : (
        <FooterSection>
          {selectedAccount.ban ? (
            <DefaultButton onClick={() => handleChangeBanState()}>계정 활성화하기</DefaultButton>
          ) : (
            <Button
              bgColor="#dc143c"
              color="#ffffff"
              _hover={{
                bg: '#CE2029',
              }}
              onClick={() => handleChangeBanState()}
              isLoading={accountBanStateLoading}
              loadingText="비활성화중"
            >
              계정 비활성화하기
            </Button>
          )}
        </FooterSection>
      )}
    </div>
  );
}

export default DefaultInfo;
