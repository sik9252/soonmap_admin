import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginRequest } from '../../api-hooks/Auth';
import toast from 'react-hot-toast';

const useLogin = () => {
  const navigate = useNavigate();

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
      //adminLoginRequest({ userId, userPw });
      // 현재 서버가 연동되어있지 않기 때문에 임시로 메인 화면으로 이동할 수 있도록 작성
      navigate('/home');
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
