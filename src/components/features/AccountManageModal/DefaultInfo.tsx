import { useEffect } from 'react';
import { AccountDataType } from '../../../api/Account';
import { Button } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useChangeBanStateRequest, useGetAdminAccountRequest, useGiveManagerAuthRequest } from '../../../api/Account';
import { DefaultButton } from '../../ui/ButtonUI';
import { AccountInfoText, FooterSection } from './style';

export interface SelectedAccountProps {
  selectedAccount: AccountDataType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DefaultInfo({ selectedAccount, setIsModalOpen }: SelectedAccountProps) {
  const { refetch: getAdminAccountRefetch } = useGetAdminAccountRequest();

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
      } else if (!selectedAccount.ban) {
        toast('계정이 비활성화되었습니다.', {
          icon: '⚠️',
        });
      }
      void getAdminAccountRefetch();
      setIsModalOpen(false);
    } else if (accountBanStateError) {
      toast.error((accountBanStateError as Error).message);
    }
  }, [accountBanStateData, accountBanStateError]);

  useEffect(() => {
    if (giveManagerAuthStateData) {
      if (!selectedAccount.manager) {
        toast.success('해당 계정에 매니저 권한이 부여되었습니다.');
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
        {selectedAccount.admin ? 'Admin' : selectedAccount.manager ? 'Manager' : selectedAccount.staff ? 'Staff' : ''}
      </AccountInfoText>
      <AccountInfoText>계정 생성일: {selectedAccount.createAt?.slice(0, 10)}</AccountInfoText>
      <AccountInfoText>
        계정 활성화 상태: {selectedAccount.ban ? '비활성화된 계정입니다.' : '활성화된 계정입니다.'}
      </AccountInfoText>

      <FooterSection>
        <>
          {localStorage.getItem('auth') === 'one' && !selectedAccount.admin ? (
            <Button onClick={() => handleGiveManagerAuth()} mr="10px">
              매니저 권한 부여하기
            </Button>
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
                >
                  계정 비활성화하기
                </Button>
              )}
            </>
          )}
        </>
      </FooterSection>
    </div>
  );
}

export default DefaultInfo;
