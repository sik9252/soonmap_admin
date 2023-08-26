import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface AccountDataType {
  id?: number;
  name?: string;
  email?: string;
  admin?: boolean;
  manager?: boolean;
  staff?: boolean;
  ban?: boolean;
  createAt?: string;
}

export interface AccountResponseType {
  accountCount: number;
  memberList: AccountDataType[];
}

export interface MyInfoResponseType {
  id?: number;
  admin?: boolean;
  manager?: boolean;
  staff?: boolean;
  ban?: boolean;
  name?: string;
  createAt?: string;
  email?: string;
}

export interface MyEmailChangeRequest {
  newEmail?: string;
  code?: string;
}

export function useGetAdminAccountRequest() {
  return useQuery([`/admin/account/admin`], () =>
    httpClient<AccountResponseType>({
      method: 'GET',
      url: `/admin/account/admin`,
    }),
  );
}

// export function useGetUserAccountRequest() {
//   return useQuery([`/admin/account/user`], () =>
//     httpClient<AccountResponseType>({
//       method: 'GET',
//       url: `/admin/account/user`,
//     }),
//   );
// }

export function useChangeBanStateRequest() {
  return useMutation((data: AccountDataType) =>
    httpClient<AccountResponseType>({
      method: 'PATCH',
      url: `/admin/manage/ban?id=${data.id ? data.id : ''}`,
      data,
    }),
  );
}

export function useGiveManagerAuthRequest() {
  return useMutation((data: AccountDataType) =>
    httpClient<AccountResponseType>({
      method: 'PATCH',
      url: `/admin/manage/manager?id=${data.id ? data.id : ''}`,
    }),
  );
}

// 내 정보 가져오기
export function useGetMyInfoRequest() {
  return useQuery([`/admin/me`], () =>
    httpClient<MyInfoResponseType>({
      method: 'GET',
      url: `/admin/me`,
    }),
  );
}

// 이메일 변경
export function useMyEmailChangeRequest() {
  return useMutation((data: MyEmailChangeRequest) =>
    httpClient<MyEmailChangeRequest>({
      method: 'POST',
      url: `/admin/change/email`,
      data,
    }),
  );
}

export function useMyEmailChangeValidateRequest() {
  return useMutation((data: MyEmailChangeRequest) =>
    httpClient<MyInfoResponseType>({
      method: 'POST',
      url: `/admin/change/email/confirm`,
      data,
    }),
  );
}
