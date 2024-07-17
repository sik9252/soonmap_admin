import React, { useState } from 'react';
import { useLoginRequest } from '../../api-hooks/Auth';
import toast from 'react-hot-toast';

const useLogin = () => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const { adminLoginRequest, adminLoginLoading } = useLoginRequest();

  const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleUserPwInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
  };

  const clickLoginSubmit = () => {
    if (!userId || !userPw) {
      toast.error('아이디 혹은 비밀번호를 입력해주세요.');
    } else {
      adminLoginRequest({ userId, userPw });
    }
  };

  const handleEnterKeyLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      adminLoginRequest({ userId, userPw });
    }
  };

  const clickShowPassword = () => {
    setShow((prevState) => !prevState);
  };

  return {
    show,
    handleUserIdInput,
    handleUserPwInput,
    clickLoginSubmit,
    handleEnterKeyLogin,
    clickShowPassword,
    adminLoginLoading,
  };
};

export default useLogin;
