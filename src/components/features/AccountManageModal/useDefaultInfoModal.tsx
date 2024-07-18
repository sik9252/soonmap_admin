import { useChangeBanStateRequest, useGiveManagerAuthRequest } from '../../../api-hooks/Account';
import { SelectedAccountProps } from '../../../@types/Account';

const useDefaultInfoModal = ({
  selectedAccount,
  setIsModalOpen,
  currentPage,
  setCurrentPage,
}: SelectedAccountProps) => {
  const { accountBanStateRequest, accountBanStateLoading } = useChangeBanStateRequest({
    setIsModalOpen,
    selectedAccount,
    currentPage,
    setCurrentPage,
  });

  const { giveManagerAuthRequest, giveManagerAuthStateLoading } = useGiveManagerAuthRequest({
    setIsModalOpen,
    selectedAccount,
    currentPage,
    setCurrentPage,
  });

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

  return {
    accountBanStateLoading,
    giveManagerAuthStateLoading,
    handleChangeBanState,
    handleGiveManagerAuth,
  };
};

export default useDefaultInfoModal;
