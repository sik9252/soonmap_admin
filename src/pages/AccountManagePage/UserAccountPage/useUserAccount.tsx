import { useEffect, useState } from 'react';
import { useSelectedAccountAtom } from '../../../store/accountAtom';
import { useGetTotalAccountCountRequest, useGetUserAccountRequest } from '../../../api-requests/Account';
import { IAccountData } from '../../../@types/Account';

const useUserAccount = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { setSelectedAccount } = useSelectedAccountAtom();

  const { accountList, totalPosts, accountRefetch } = useGetUserAccountRequest({ page: currentPage - 1 }, false);
  const { totalAccountCountRefetch } = useGetTotalAccountCountRequest(false);

  useEffect(() => {
    void accountRefetch();
  }, [currentPage]);

  useEffect(() => {
    void totalAccountCountRefetch();
  }, []);

  const handleAccountManageModal = (account: IAccountData) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  return {
    isAlertOpen,
    setIsAlertOpen,
    isModalOpen,
    setIsModalOpen,
    currentPage,
    setCurrentPage,
    accountList,
    totalPosts,
    handleAccountManageModal,
  };
};

export default useUserAccount;
