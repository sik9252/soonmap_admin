import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  IAccountData,
  IAccountRequest,
  IAccountResponse,
  ICertificateConfirmResponse,
  IFindAccountData,
  IMyEmailChangeRequest,
  IMyInfoResponse,
  ITotalAccountCountResponse,
} from '../@types/Account';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useGetAdminAccountRequest(params: IAccountRequest, isEnabled?: boolean) {
  const [accountList, setAccountList] = useState<IAccountData[] | null>([]);
  const [totalPosts, setTotalPosts] = useState(1);

  const {
    data,
    error,
    refetch: adminAccountRefetch,
  } = useQuery(
    [`/admin/account/admin?page=${params.page}`, params],
    () =>
      httpClient<IAccountResponse>({
        method: 'GET',
        url: `/admin/account/admin?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );

  useEffect(() => {
    if (data) {
      setAccountList(data?.data.memberList);
      setTotalPosts(data?.data.accountCount);
    } else if (error) {
      toast.error('회원 계정 목록을 불러오는데 실패했습니다.');
    }
  }, [data, error]);

  return { accountList, totalPosts, adminAccountRefetch };
}

export function useGetUserAccountRequest(params: IAccountRequest, isEnabled?: boolean) {
  return useQuery(
    [`/admin/account/user?page=${params.page}`, params],
    () =>
      httpClient<IAccountResponse>({
        method: 'GET',
        url: `/admin/account/user?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );
}

export function useChangeBanStateRequest() {
  return useMutation((data: IAccountData) =>
    httpClient<IAccountResponse>({
      method: 'PATCH',
      url: `/admin/manage/ban?id=${data.id ? data.id : ''}`,
      data,
    }),
  );
}

export function useGiveManagerAuthRequest() {
  return useMutation((data: IAccountData) =>
    httpClient<IAccountResponse>({
      method: 'PATCH',
      url: `/admin/manage/manager?id=${data.id ? data.id : ''}`,
    }),
  );
}

// 내 정보 가져오기
export function useGetMyInfoRequest() {
  return useQuery([`/admin/me`], () =>
    httpClient<IMyInfoResponse>({
      method: 'GET',
      url: `/admin/me`,
    }),
  );
}

// 이메일 변경
export function useMyEmailChangeRequest() {
  return useMutation((data: IMyEmailChangeRequest) =>
    httpClient<IMyEmailChangeRequest>({
      method: 'POST',
      url: `/admin/change/email`,
      data,
    }),
  );
}

export function useMyEmailChangeValidateRequest() {
  return useMutation((data: IMyEmailChangeRequest) =>
    httpClient<IMyInfoResponse>({
      method: 'POST',
      url: `/admin/change/email/confirm`,
      data,
    }),
  );
}

// 내 정보 가져오기
export function useGetTotalAccountCountRequest(isEnabled?: boolean) {
  const [adminCount, setAdminCount] = useState(0);

  const {
    data,
    error,
    refetch: totalAccountCountRefetch,
  } = useQuery(
    [`/admin/account/count`],
    () =>
      httpClient<ITotalAccountCountResponse>({
        method: 'GET',
        url: `/admin/account/count`,
      }),
    { enabled: isEnabled },
  );

  useEffect(() => {
    if (data) {
      setAdminCount(data?.data.adminCount);
    } else if (error) {
      toast.error('총 계정 수를 불러오는데 실패했습니다.');
    }
  }, [data, error]);

  return { adminCount, totalAccountCountRefetch };
}

// 계정 찾기
export function useFindIdEmailValidateRequest() {
  return useMutation((data: IFindAccountData) =>
    httpClient({
      method: 'POST',
      url: `/admin/find/id`,
      data,
    }),
  );
}

export function useFindIdCertificateConfirmRequest() {
  return useMutation((data: IFindAccountData) =>
    httpClient<ICertificateConfirmResponse>({
      method: 'POST',
      url: `/admin/find/id/confirm`,
      data,
    }),
  );
}

export function useFindPasswordValidateRequest() {
  return useMutation((data: IFindAccountData) =>
    httpClient({
      method: 'POST',
      url: `/admin/find/pw`,
      data,
    }),
  );
}

export function useFindPasswordCertificateConfirmRequest() {
  return useMutation((data: IFindAccountData) =>
    httpClient<ICertificateConfirmResponse>({
      method: 'POST',
      url: `/admin/find/pw/confirm`,
      data,
    }),
  );
}

export function useChangePasswordRequest() {
  return useMutation((data: IFindAccountData) =>
    httpClient<ICertificateConfirmResponse>({
      method: 'POST',
      url: `/admin/change/pw`,
      data,
    }),
  );
}
