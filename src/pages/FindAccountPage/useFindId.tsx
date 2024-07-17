import React, { useEffect, useMemo, useState } from 'react';
import { useFindIdCertificateConfirmRequest, useFindIdEmailValidateRequest } from '../../api-hooks/Account';
import { checkEmailValidate } from '../../utils/checkEmailValidate';
import toast from 'react-hot-toast';

const useFindId = () => {
  const [userEmail, setUserEmail] = useState('');
  const [certificateNum, setCertificateNum] = useState('');
  const [isTimeUp, setTimeUp] = useState<boolean>(false);

  const { findIdEmailValidateRequest, findIdEmailValidateRequestLoading, isEmailCheckSuccess, setIsEmailCheckSuccess } =
    useFindIdEmailValidateRequest();

  const {
    findIdCertificateConfirmRequest,
    findIdCertificateConfirmRequestData,
    findIdCertificateConfirmRequestLoading,
  } = useFindIdCertificateConfirmRequest();

  const handleUserEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleCertificateNumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateNum(e.target.value);
  };

  const handleGetCertificateButton = () => {
    const data = {
      receiver: userEmail,
    };

    if (!userEmail || !checkEmailValidate(userEmail)) {
      toast.error('올바른 이메일 주소를 입력해주세요.');
    } else {
      findIdEmailValidateRequest({ ...data });
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
      findIdCertificateConfirmRequest({ ...data });
    }
  };

  useEffect(() => {
    if (isTimeUp) {
      toast.error('인증번호가 만료되었습니다. 다시 받아주세요.');
      setIsEmailCheckSuccess(false);
    }

    setTimeout(() => {
      setTimeUp(false);
    }, 500);
  }, [isTimeUp]);

  return {
    setTimeUp,
    findIdEmailValidateRequestLoading,
    isEmailCheckSuccess,
    findIdCertificateConfirmRequestData,
    findIdCertificateConfirmRequestLoading,
    handleUserEmailInput,
    handleCertificateNumInput,
    handleGetCertificateButton,
    handleCertificateButton,
  };
};

export default useFindId;
