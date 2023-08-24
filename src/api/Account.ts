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

export function useGetAccountRequest() {
  return useQuery([`/admin/account/all`], () =>
    httpClient<AccountResponseType>({
      method: 'GET',
      url: `/admin/account/all`,
    }),
  );
}

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
