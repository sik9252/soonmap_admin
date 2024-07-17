import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
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
  const [accountList, setAccountList] = useState<IAccountData[] | null>([]);
  const [totalPosts, setTotalPosts] = useState(1);

  const {
    data,
    error,
    refetch: accountRefetch,
  } = useQuery(
    [`/admin/account/user?page=${params.page}`, params],
    () =>
      httpClient<IAccountResponse>({
        method: 'GET',
        url: `/admin/account/user?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );

  useEffect(() => {
    if (data) {
      setAccountList(data?.data.memberList);
      setTotalPosts(data?.data.accountCount);
    } else if (error) {
      toast.error('유저 계정 목록을 불러오는데 실패했습니다.');
    }
  }, [data, error]);

  return { accountList, totalPosts, accountRefetch };
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
  const [myInfo, setMyInfo] = useState<IMyInfoResponse>({});

  const {
    data,
    error,
    refetch: myInfoRefetch,
  } = useQuery([`/admin/me`], () =>
    httpClient<IMyInfoResponse>({
      method: 'GET',
      url: `/admin/me`,
    }),
  );

  useEffect(() => {
    if (data) {
      setMyInfo(data.data);
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return {
    myInfo,
    myInfoRefetch,
  };
}

// 이메일 변경
export function useMyEmailChangeRequest() {
  const [isEmailCheckSuccess, setIsEmailCheckSuccess] = useState(false);

  const {
    mutate: myEmailChangeRequest,
    data: myEmailChangeData,
    error,
    isLoading: myEmailChangeLoading,
  } = useMutation((data: IMyEmailChangeRequest) =>
    httpClient<IMyEmailChangeRequest>({
      method: 'POST',
      url: `/admin/change/email`,
      data,
    }),
  );

  useEffect(() => {
    if (myEmailChangeData) {
      toast.success('인증번호가 전송되었습니다.');
      setIsEmailCheckSuccess(true);
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [myEmailChangeData, error]);

  return {
    myEmailChangeRequest,
    myEmailChangeData,
    myEmailChangeLoading,
    isEmailCheckSuccess,
    setIsEmailCheckSuccess,
  };
}

export function useMyEmailChangeValidateRequest() {
  const { myInfoRefetch } = useGetMyInfoRequest();
  const [emailChangeBtnClicked, setEmailChangeBtnClicked] = useState(false);

  const {
    mutate: myEmailChangeValidateRequest,
    data,
    error,
    isLoading: myEmailChangeValidateLoading,
  } = useMutation((data: IMyEmailChangeRequest) =>
    httpClient<IMyInfoResponse>({
      method: 'POST',
      url: `/admin/change/email/confirm`,
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('이메일 변경이 완료되었습니다.');
      setEmailChangeBtnClicked(false);
      void myInfoRefetch();
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return {
    myEmailChangeValidateRequest,
    myEmailChangeValidateLoading,
    emailChangeBtnClicked,
    setEmailChangeBtnClicked,
  };
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
  const [isEmailCheckSuccess, setIsEmailCheckSuccess] = useState(false);

  const {
    mutate: findIdEmailValidateRequest,
    data,
    error,
    isLoading: findIdEmailValidateRequestLoading,
  } = useMutation((data: IFindAccountData) =>
    httpClient({
      method: 'POST',
      url: `/admin/find/id`,
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('이메일로 인증번호가 전송되었습니다.');
      setIsEmailCheckSuccess(true);
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return { findIdEmailValidateRequest, findIdEmailValidateRequestLoading, isEmailCheckSuccess, setIsEmailCheckSuccess };
}

export function useFindIdCertificateConfirmRequest() {
  const {
    mutate: findIdCertificateConfirmRequest,
    data: findIdCertificateConfirmRequestData,
    error,
    isLoading: findIdCertificateConfirmRequestLoading,
  } = useMutation((data: IFindAccountData) =>
    httpClient<ICertificateConfirmResponse>({
      method: 'POST',
      url: `/admin/find/id/confirm`,
      data,
    }),
  );

  useEffect(() => {
    if (findIdCertificateConfirmRequestData) {
      toast.success('인증이 완료되었습니다.');
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [findIdCertificateConfirmRequestData, error]);

  return {
    findIdCertificateConfirmRequest,
    findIdCertificateConfirmRequestData,
    findIdCertificateConfirmRequestLoading,
  };
}

export function useFindPasswordValidateRequest() {
  const [isEmailAndIdCheckSuccess, setIsEmailAndIdCheckSuccess] = useState(false);

  const {
    mutate: findPasswordEmailValidateRequest,
    data,
    error,
    isLoading: findPasswordEmailValidateRequestLoading,
  } = useMutation((data: IFindAccountData) =>
    httpClient({
      method: 'POST',
      url: `/admin/find/pw`,
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('이메일로 인증번호가 전송되었습니다.');
      setIsEmailAndIdCheckSuccess(true);
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return {
    findPasswordEmailValidateRequest,
    findPasswordEmailValidateRequestLoading,
    isEmailAndIdCheckSuccess,
    setIsEmailAndIdCheckSuccess,
  };
}

export function useFindPasswordCertificateConfirmRequest() {
  const [confirmToken, setConfirmToken] = useState<string | undefined>('');

  const {
    mutate: findPasswordCertificateConfirmRequest,
    data: findPasswordCertificateConfirmRequestData,
    error,
    isLoading: findPasswordCertificateConfirmRequestLoading,
  } = useMutation((data: IFindAccountData) =>
    httpClient<ICertificateConfirmResponse>({
      method: 'POST',
      url: `/admin/find/pw/confirm`,
      data,
    }),
  );

  useEffect(() => {
    if (findPasswordCertificateConfirmRequestData) {
      setConfirmToken(findPasswordCertificateConfirmRequestData.data.confirmToken);
      toast.success('인증이 완료되었습니다.');
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [findPasswordCertificateConfirmRequestData, error]);

  return {
    findPasswordCertificateConfirmRequest,
    findPasswordCertificateConfirmRequestData,
    findPasswordCertificateConfirmRequestLoading,
    confirmToken,
  };
}

export function useChangePasswordRequest() {
  const navigate = useNavigate();

  const {
    mutate: changePasswordRequest,
    data,
    error,
    isLoading: changePasswordRequestLoading,
  } = useMutation((data: IFindAccountData) =>
    httpClient<ICertificateConfirmResponse>({
      method: 'POST',
      url: `/admin/change/pw`,
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      alert('비밀번호 변경이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return { changePasswordRequest, changePasswordRequestLoading };
}
