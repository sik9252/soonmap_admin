import { httpClient } from '.';
import { useMutation } from '@tanstack/react-query';

interface AuthRequestProps {
  name?: string;
  userId: string;
  userPw: string;
}

interface AuthResponse {
  success: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isStaff: boolean;
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
