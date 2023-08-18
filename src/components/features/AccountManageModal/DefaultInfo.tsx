import { useEffect } from 'react';
import { AccountDataType } from '../../../api/Account';
import { Button } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useChangeBanStateRequest, useGetAccountRequest } from '../../../api/Account';
import { DefaultButton } from '../../ui/ButtonUI';
import { AccountInfoText, FooterSection } from './style';

export interface SelectedAccountProps {
  selectedAccount: AccountDataType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DefaultInfo({ selectedAccount, setIsModalOpen }: SelectedAccountProps) {
  const { refetch: getAccountRefetch } = useGetAccountRequest();

  const {
    mutate: accountBanStateRequest,
    data: accountBanStateData,
    error: accountBanStateError,
    isLoading: accountBanStateLoading,
  } = useChangeBanStateRequest();

  useEffect(() => {
    if (accountBanStateData) {
      if (selectedAccount.ban) {
        toast.success('계정이 활성화되었습니다.');
      } else if (!selectedAccount.ban) {
        toast('계정이 비활성화되었습니다.', {
          icon: '⚠️',
        });
      }
      void getAccountRefetch();
      setIsModalOpen(false);
    } else if (accountBanStateError) {
      toast.error((accountBanStateError as Error).message);
    }
  }, [accountBanStateData, accountBanStateError]);

  const handleChangeBanState = () => {
    if (selectedAccount.ban) {
      const isYesClicked = confirm('정말 해당 계정을 활성화 하시겠습니까?');
      if (isYesClicked) accountBanStateRequest({ id: selectedAccount.id });
    } else if (!selectedAccount.ban) {
      const isYesClicked = confirm('정말 해당 계정을 비활성화 하시겠습니까?');
      if (isYesClicked) accountBanStateRequest({ id: selectedAccount.id });
    }
  };

  return (
    <div>
      <AccountInfoText>계정 이름: {selectedAccount.name}</AccountInfoText>
      <AccountInfoText>계정 이메일: {selectedAccount.email || '이메일이 없습니다.'}</AccountInfoText>
      <AccountInfoText>
        계정 권한:{' '}
        {selectedAccount.admin ? '관리자' : selectedAccount.manager ? '매니저' : selectedAccount.staff ? '일반' : ''}
      </AccountInfoText>
      <AccountInfoText>계정 생성일: {selectedAccount.createAt?.slice(0, 10)}</AccountInfoText>
      <AccountInfoText>
        계정 활성화 상태: {selectedAccount.ban ? '비활성화된 계정입니다.' : '활성화된 계정입니다.'}
      </AccountInfoText>

      <FooterSection>
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
      </FooterSection>
    </div>
  );
}

export default DefaultInfo;
