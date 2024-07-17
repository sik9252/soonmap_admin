import React, { useState } from 'react';
import { useRegisterRequest } from '../../api-hooks/Auth';
import toast from 'react-hot-toast';
import { checkEmailValidate } from '../../utils/checkEmailValidate';

const useRegister = () => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');

  const handleUserNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleUserEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleUserPwInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
  };

  const clickShowPassword = () => {
    setShow((prevState) => !prevState);
  };

  const { adminRegisterRequest, adminRegisterLoading } = useRegisterRequest();

  const clickRegisterSubmit = () => {
    const data = {
      name: userName,
      userId: userId,
      email: userEmail,
      userPw: userPw,
    };

    if (!userName || !userId || !userEmail || !userPw) {
      toast.error('모든 입력 칸을 채워주세요.');
    } else {
      if (checkEmailValidate(userEmail)) {
        adminRegisterRequest({ ...data });
      } else {
        toast.error('올바른 이메일 주소를 입력해주세요.');
      }
    }
  };

  return {
    show,
    handleUserNameInput,
    handleUserIdInput,
    handleUserEmailInput,
    handleUserPwInput,
    clickShowPassword,
    clickRegisterSubmit,
    adminRegisterLoading,
  };
};

export default useRegister;
