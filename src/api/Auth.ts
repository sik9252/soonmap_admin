import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';

interface AuthRequestProps {
  name?: string;
  userId: string;
  userPw: string;
}

interface AuthResponse {
  success: boolean;
  admin: boolean;
  manager: boolean;
  staff: boolean;
  accessToken: string;
  refreshToken: string;
}

export function useLoginRequest() {
  return useMutation((data: AuthRequestProps) =>
    httpClient<AuthResponse>({
      method: 'POST',
      url: '/admin/login',
      data,
    }),
  );
}

export function useRegisterRequest() {
  return useMutation((data: AuthRequestProps) =>
    httpClient<AuthResponse>({
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
