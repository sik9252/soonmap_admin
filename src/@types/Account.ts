interface IAccountData {
  id?: number;
  name?: string;
  email?: string;
  admin?: boolean;
  manager?: boolean;
  staff?: boolean;
  ban?: boolean;
  createAt?: string;
}

interface IAccountRequest {
  page: number;
}

interface IAccountResponse {
  accountCount: number;
  memberList: IAccountData[];
}

interface ITotalAccountCountResponse {
  adminCount: number;
  userCount: number;
}

interface IMyInfoResponse {
  id?: number;
  admin?: boolean;
  manager?: boolean;
  staff?: boolean;
  ban?: boolean;
  name?: string;
  createAt?: string;
  email?: string;
}

interface IMyEmailChangeRequest {
  newEmail?: string;
  code?: string;
}

// 계정 찾기
interface IFindAccountData {
  code?: string;
  receiver?: string;
  token?: string;
}

interface ICertificateConfirmResponse {
  id?: string;
  confirmToken?: string;
}

interface SelectedAccountProps {
  selectedAccount: IAccountData;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage?: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export type {
  IAccountData,
  IAccountRequest,
  IAccountResponse,
  ITotalAccountCountResponse,
  IMyInfoResponse,
  IMyEmailChangeRequest,
  IFindAccountData,
  ICertificateConfirmResponse,
  SelectedAccountProps,
};
