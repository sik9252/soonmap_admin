import { httpClient } from '.';
import { useMutation } from '@tanstack/react-query';
import { IAuthRequestProps, IAuthResponse } from '../@types/Auth';

export function useLoginRequest() {
  return useMutation((data: IAuthRequestProps) =>
    httpClient<IAuthResponse>({
      method: 'POST',
      url: '/admin/login',
      data,
    }),
  );
}

export function useRegisterRequest() {
  return useMutation((data: IAuthRequestProps) =>
    httpClient<IAuthResponse>({
      method: 'POST',
      url: '/admin/register',
      data,
    }),
  );
}

export function useLogoutRequest() {
  return useMutation(() =>
    httpClient({
      method: 'POST',
      url: '/admin/logout',
    }),
  );
}
