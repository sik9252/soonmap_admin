import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Flex, FormControl, FormHelperText } from '@chakra-ui/react';
import InputUI from '../../components/ui/InputUI';
import { DefaultButton } from '../../components/ui/ButtonUI';
import { checkEmailValidate } from '../../utils/checkEmailValidate';
import {
  useFindPasswordValidateRequest,
  useFindPasswordCertificateConfirmRequest,
  useChangePasswordRequest,
} from '../../api/FindAccount';
import toast from 'react-hot-toast';
import Timer from '../../utils/timer';

function FindPassword() {
  const navigate = useNavigate();

  const {
    mutate: findPasswordEmailValidateRequest,
    data: findPasswordEmailValidateRequestData,
    error: findPasswordEmailValidateRequestError,
    isLoading: findPasswordEmailValidateRequestLoading,
  } = useFindPasswordValidateRequest();

  const {
    mutate: findPasswordCertificateConfirmRequest,
    data: findPasswordCertificateConfirmRequestData,
    error: findPasswordCertificateConfirmRequestError,
    isLoading: findPasswordCertificateConfirmRequestLoading,
  } = useFindPasswordCertificateConfirmRequest();

  const {
    mutate: changePasswordRequest,
    data: changePasswordRequestData,
    error: changePasswordRequestError,
    isLoading: changePasswordRequestLoading,
  } = useChangePasswordRequest();

  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isEmailAndIdCheckSuccess, setIsEmailAndIdCheckSuccess] = useState(false);
  const [certificateNum, setCertificateNum] = useState('');
  const [isTimeUp, setTimeUp] = useState<boolean>(false);
  const [confirmToken, setConfirmToken] = useState<string | undefined>('');

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

  useEffect(() => {
    if (findPasswordEmailValidateRequestData) {
      toast.success('이메일로 인증번호가 전송되었습니다.');
      setIsEmailAndIdCheckSuccess(true);
    } else if (findPasswordEmailValidateRequestError) {
      toast.error((findPasswordEmailValidateRequestError as Error).message);
    }
  }, [findPasswordEmailValidateRequestData, findPasswordEmailValidateRequestError]);

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

  useEffect(() => {
    if (findPasswordCertificateConfirmRequestData) {
      setConfirmToken(findPasswordCertificateConfirmRequestData.data.confirmToken);
      toast.success('인증이 완료되었습니다.');
    } else if (findPasswordCertificateConfirmRequestError) {
      toast.error((findPasswordCertificateConfirmRequestError as Error).message);
    }
  }, [findPasswordCertificateConfirmRequestData, findPasswordCertificateConfirmRequestError]);

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
    if (changePasswordRequestData) {
      alert('비밀번호 변경이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } else if (changePasswordRequestError) {
      toast.error((changePasswordRequestError as Error).message);
    }
  }, [changePasswordRequestData, changePasswordRequestError]);

  const timerComponent = useMemo(() => {
    return <Timer isStart={isEmailAndIdCheckSuccess} setTimeUp={setTimeUp} />;
  }, [isEmailAndIdCheckSuccess]);

  useEffect(() => {
    if (isTimeUp) {
      toast.error('인증번호가 만료되었습니다. 다시 받아주세요.');
      setIsEmailAndIdCheckSuccess(false);
    }

    setTimeout(() => {
      setTimeUp(false);
    }, 500);
  }, [isTimeUp]);

  return (
    <Container>
      <Flex alignItems="center" justifyContent="space-between" w="700px" mb="10px">
        <Box w="120px">이메일</Box>
        <InputUI
          width="400px"
          placeholder={'가입하신 이메일을 입력하세요. ex) test123@sch.ac.kr'}
          onChange={handleUserEmailInput}
        />
        <Box w="150px"></Box>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" w="700px" mb="10px">
        <Box w="120px">아이디</Box>
        <InputUI
          width="400px"
          placeholder={'가입하신 아이디를 입력하세요. ex) test123@sch.ac.kr'}
          onChange={handleUserIdInput}
        />
        <DefaultButton
          width="150px"
          onClick={() => handleGetCertificateButton()}
          isLoading={findPasswordEmailValidateRequestLoading}
          loadingText="인증번호 발급중"
        >
          인증번호 받기
        </DefaultButton>
      </Flex>
      {isEmailAndIdCheckSuccess ? (
        <Flex alignItems="center" justifyContent="space-between" w="745px" mb="10px">
          <Box w="120px">인증번호</Box>
          <InputUI
            width="400px"
            placeholder={'이메일로 전송된 인증번호를 입력하세요.'}
            onChange={handleCertificateNumInput}
          />
          <DefaultButton
            width="120px"
            onClick={() => handleCertificateButton()}
            isLoading={findPasswordCertificateConfirmRequestLoading}
            loadingText="인증 중"
          >
            인증하기
          </DefaultButton>
          <Box w="60px">{timerComponent}</Box>
        </Flex>
      ) : (
        ''
      )}
      {findPasswordCertificateConfirmRequestData && isEmailAndIdCheckSuccess ? (
        <>
          <Flex alignItems="center" justifyContent="space-between" w="745px" mb="10px">
            <Box w="120px">새 비밀번호</Box>
            <InputUI
              width="400px"
              placeholder={'새로운 비밀번호를 입력하세요.'}
              onChange={handleUserNewPasswordInput}
              type="password"
            />
            <Box width="200px"></Box>
          </Flex>

          <FormControl>
            <Flex alignItems="center" justifyContent="space-between" w="745px" mb="10px">
              <Box w="120px">새 비밀번호 확인</Box>
              <InputUI
                width="400px"
                placeholder={'새로운 비밀번호를 재입력해주세요.'}
                onChange={handleUserNewPasswordConfirmInput}
                type="password"
              />
              <DefaultButton
                width="200px"
                onClick={() => handleChangePasswordButton()}
                isLoading={changePasswordRequestLoading}
                loadingText="비밀번호 변경 중"
              >
                비밀번호 변경하기
              </DefaultButton>
            </Flex>
            {passwordError ? (
              <Flex>
                <Box w="133px"></Box>
                <FormHelperText color="#dc143c">비밀번호가 일치하지 않습니다.</FormHelperText>
              </Flex>
            ) : (
              ''
            )}
          </FormControl>
        </>
      ) : (
        ''
      )}
    </Container>
  );
}

export default FindPassword;
