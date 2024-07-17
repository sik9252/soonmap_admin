import React, { useEffect, useState } from 'react';
import {
  useChangePasswordRequest,
  useFindPasswordCertificateConfirmRequest,
  useFindPasswordValidateRequest,
} from '../../api-hooks/Account';
import { checkEmailValidate } from '../../utils/checkEmailValidate';
import toast from 'react-hot-toast';

const useFindPassword = () => {
  const {
    findPasswordEmailValidateRequest,
    findPasswordEmailValidateRequestLoading,
    isEmailAndIdCheckSuccess,
    setIsEmailAndIdCheckSuccess,
  } = useFindPasswordValidateRequest();

  const {
    findPasswordCertificateConfirmRequest,
    findPasswordCertificateConfirmRequestData,
    findPasswordCertificateConfirmRequestLoading,
    confirmToken,
  } = useFindPasswordCertificateConfirmRequest();

  const { changePasswordRequest, changePasswordRequestLoading } = useChangePasswordRequest();

  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [certificateNum, setCertificateNum] = useState('');
  const [isTimeUp, setTimeUp] = useState<boolean>(false);

  const handleUserEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleCertificateNumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateNum(e.target.value);
  };

  const handleUserNewPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleUserNewPasswordConfirmInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordConfirm(e.target.value);
    if (newPassword !== e.target.value) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleGetCertificateButton = () => {
    const data = {
      receiver: userEmail,
      id: userId,
    };

    if (!userEmail || !userId || !checkEmailValidate(userEmail)) {
      toast.error('올바른 이메일 주소 혹은 아이디를 입력해주세요.');
    } else {
      findPasswordEmailValidateRequest({ ...data });
    }
  };

  const handleCertificateButton = () => {
    const data = {
      code: certificateNum,
      receiver: userEmail,
    };

    if (!certificateNum) {
      toast.error('인증번호가 입력되지 않았습니다.');
    } else {
      findPasswordCertificateConfirmRequest({ ...data });
    }
  };

  const handleChangePasswordButton = () => {
    const data = {
      token: confirmToken,
      pw: newPassword,
    };

    if (!newPassword || !newPasswordConfirm) {
      alert('새 비밀번호가 입력되지 않았습니다.');
    } else {
      changePasswordRequest({ ...data });
    }
  };

  useEffect(() => {
    if (isTimeUp) {
      toast.error('인증번호가 만료되었습니다. 다시 받아주세요.');
      setIsEmailAndIdCheckSuccess(false);
    }

    setTimeout(() => {
      setTimeUp(false);
    }, 500);
  }, [isTimeUp]);

  return {
    setTimeUp,
    findPasswordEmailValidateRequestLoading,
    isEmailAndIdCheckSuccess,
    findPasswordCertificateConfirmRequestData,
    findPasswordCertificateConfirmRequestLoading,
    changePasswordRequestLoading,
    passwordError,
    handleUserEmailInput,
    handleUserIdInput,
    handleCertificateNumInput,
    handleUserNewPasswordInput,
    handleUserNewPasswordConfirmInput,
    handleGetCertificateButton,
    handleCertificateButton,
    handleChangePasswordButton,
  };
};

export default useFindPassword;
