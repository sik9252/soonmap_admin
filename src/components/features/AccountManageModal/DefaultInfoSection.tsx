import { useEffect } from 'react';
import { AccountDataType } from '../../../api/Account';
import { Button } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useChangeBanStateRequest, useGetAccountRequest } from '../../../api/Account';
import { DefaultButton } from '../../ui/ButtonUI';

export interface SelectedAccountProps {
  selectedAccount: AccountDataType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DefaultInfoSection({ selectedAccount, setIsModalOpen }: SelectedAccountProps) {
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
    accountBanStateRequest({ id: selectedAccount.id });
  };

  return (
    <div>
      <div>이름: {selectedAccount.name}</div>
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
    </div>
  );
}

export default DefaultInfoSection;
