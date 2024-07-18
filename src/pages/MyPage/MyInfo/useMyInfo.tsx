import React, { useEffect, useState } from 'react';
import {
  useGetMyInfoRequest,
  useMyEmailChangeRequest,
  useMyEmailChangeValidateRequest,
} from '../../../api-hooks/Account';
import { checkEmailValidate } from '../../../utils/checkEmailValidate';
import toast from 'react-hot-toast';

const useMyInfo = () => {
  const { myInfo } = useGetMyInfoRequest();
  const { myEmailChangeRequest, myEmailChangeData, myEmailChangeLoading, isEmailCheckSuccess, setIsEmailCheckSuccess } =
    useMyEmailChangeRequest();
  const {
    myEmailChangeValidateRequest,
    myEmailChangeValidateLoading,
    emailChangeBtnClicked,
    setEmailChangeBtnClicked,
  } = useMyEmailChangeValidateRequest();

  const [newEmail, setNewEmail] = useState('');
  const [code, setCode] = useState('');
  const [isTimeUp, setTimeUp] = useState<boolean>(false);

  const handleNewEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleEmailModifyBtn = () => {
    setEmailChangeBtnClicked((prevState) => !prevState);
  };

  const handleEmailChangeBtn = () => {
    const data = {
      newEmail: newEmail,
    };

    if (!newEmail || !checkEmailValidate(newEmail)) {
      toast.error('올바른 이메일 주소를 입력해주세요.');
    } else {
      myEmailChangeRequest({ ...data });
    }
  };

  const handleEmailChangeValidateBtn = () => {
    const data = {
      newEmail: newEmail,
      code: code,
    };

    if (!newEmail || !checkEmailValidate(newEmail)) {
      toast.error('올바른 이메일 주소를 입력해주세요.');
    } else if (!code) {
      toast.error('올바른 인증번호를 입력해주세요.');
    } else {
      myEmailChangeValidateRequest({ ...data });
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
    myInfo,
    myEmailChangeData,
    myEmailChangeLoading,
    isEmailCheckSuccess,
    myEmailChangeValidateLoading,
    emailChangeBtnClicked,
    handleNewEmailInput,
    handleCodeInput,
    handleEmailModifyBtn,
    handleEmailChangeBtn,
    handleEmailChangeValidateBtn,
  };
};

export default useMyInfo;
