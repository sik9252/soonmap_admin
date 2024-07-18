import { useLocation } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { DefaultButton } from '../../ui/ButtonUI';
import { AccountInfoText, FooterSection } from './style';
import { SelectedAccountProps } from '../../../@types/Account';
import useDefaultInfoModal from './useDefaultInfoModal';

function DefaultInfo({ selectedAccount, setIsModalOpen, currentPage, setCurrentPage }: SelectedAccountProps) {
  const location = useLocation();
  const { accountBanStateLoading, giveManagerAuthStateLoading, handleChangeBanState, handleGiveManagerAuth } =
    useDefaultInfoModal({ selectedAccount, setIsModalOpen, currentPage, setCurrentPage });

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
