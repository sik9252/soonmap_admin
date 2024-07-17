import { httpClient } from '.';
import { useMutation } from '@tanstack/react-query';
import { IAuthRequestProps, IAuthResponse } from '../@types/Auth';
import { useEffect } from 'react';
import { setAuthToken } from '../utils/setAuthToken';
import { setAuthHierarchy } from '../utils/setAuthHierarchy';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLoginRequest() {
  const navigate = useNavigate();

  const {
    mutate: adminLoginRequest,
    data,
    error,
    isLoading: adminLoginLoading,
  } = useMutation((data: IAuthRequestProps) =>
    httpClient<IAuthResponse>({
      method: 'POST',
      url: '/admin/login',
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      setAuthToken(data?.data.accessToken, data?.data.refreshToken);
      setAuthHierarchy(data?.data);
      toast.success(`${localStorage.getItem('user_name')!}님 환영합니다.`);
      navigate('/home');
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return { adminLoginRequest, adminLoginLoading };
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
