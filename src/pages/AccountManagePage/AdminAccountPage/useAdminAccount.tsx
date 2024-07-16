import { useEffect, useState } from 'react';
import { useSelectedAccountAtom } from '../../../store/accountAtom';
import { useGetAdminAccountRequest, useGetTotalAccountCountRequest } from '../../../api-requests/Account';
import { IAccountData } from '../../../@types/Account';

export const useAdminAccount = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { setSelectedAccount } = useSelectedAccountAtom();

  const { accountList, totalPosts, adminAccountRefetch } = useGetAdminAccountRequest({ page: currentPage - 1 }, false);
  const { adminCount, totalAccountCountRefetch } = useGetTotalAccountCountRequest(false);

  useEffect(() => {
    void adminAccountRefetch();
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
    adminCount,
    handleAccountManageModal,
  };
};
