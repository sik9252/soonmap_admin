import React, { useState, useEffect, useMemo } from 'react';
import InputUI from '../../components/ui/InputUI';
import { Container, Box, Flex } from '@chakra-ui/react';
import { checkEmailValidate } from '../../utils/checkEmailValidate';
import { DefaultButton } from '../../components/ui/ButtonUI';
import toast from 'react-hot-toast';
import Timer from '../../utils/timer';
import { useFindIdCertificateConfirmRequest, useFindIdEmailValidateRequest } from '../../api-requests/Account';

function FindId() {
  const {
    mutate: findIdEmailValidateRequest,
    data: findIdEmailValidateRequestData,
    error: findIdEmailValidateRequestError,
    isLoading: findIdEmailValidateRequestLoading,
  } = useFindIdEmailValidateRequest();

  const {
    mutate: findIdCertificateConfirmRequest,
    data: findIdCertificateConfirmRequestData,
    error: findIdCertificateConfirmRequestError,
    isLoading: findIdCertificateConfirmRequestLoading,
  } = useFindIdCertificateConfirmRequest();

  const [userEmail, setUserEmail] = useState('');
  const [isEmailCheckSuccess, setIsEmailCheckSuccess] = useState(false);
  const [certificateNum, setCertificateNum] = useState('');
  const [isTimeUp, setTimeUp] = useState<boolean>(false);

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

  useEffect(() => {
    if (findIdEmailValidateRequestData) {
      toast.success('이메일로 인증번호가 전송되었습니다.');
      setIsEmailCheckSuccess(true);
    } else if (findIdEmailValidateRequestError) {
      toast.error((findIdEmailValidateRequestError as Error).message);
    }
  }, [findIdEmailValidateRequestData, findIdEmailValidateRequestError]);

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
    if (findIdCertificateConfirmRequestData) {
      toast.success('인증이 완료되었습니다.');
    } else if (findIdCertificateConfirmRequestError) {
      toast.error((findIdCertificateConfirmRequestError as Error).message);
    }
  }, [findIdCertificateConfirmRequestData, findIdCertificateConfirmRequestError]);

  const timerComponent = useMemo(() => {
    return <Timer isStart={isEmailCheckSuccess} setTimeUp={setTimeUp} />;
  }, [isEmailCheckSuccess]);

  useEffect(() => {
    if (isTimeUp) {
      toast.error('인증번호가 만료되었습니다. 다시 받아주세요.');
      setIsEmailCheckSuccess(false);
    }

    setTimeout(() => {
      setTimeUp(false);
    }, 500);
  }, [isTimeUp]);

  return (
    <Container>
      {findIdCertificateConfirmRequestData ? (
        <Flex alignItems="center" justifyContent="space-between" w="500px" mb="10px">
          <Box w="60px">아이디</Box>
          <InputUI width="460px" value={findIdCertificateConfirmRequestData?.data.id} isDisabled={true} />
        </Flex>
      ) : (
        <>
          <Flex alignItems="center" justifyContent="space-between" w="700px" mb="10px">
            <Box w="60px">이메일</Box>
            <InputUI
              width="460px"
              placeholder={'가입하신 이메일을 입력하세요. ex) test123@sch.ac.kr'}
              onChange={handleUserEmailInput}
            />
            <DefaultButton
              width="150px"
              onClick={() => handleGetCertificateButton()}
              isLoading={findIdEmailValidateRequestLoading}
              loadingText="인증번호 발급중"
            >
              인증번호 받기
            </DefaultButton>
          </Flex>
          {isEmailCheckSuccess ? (
            <Flex alignItems="center" justifyContent="space-between" w="745px">
              <Box w="60px">인증번호</Box>
              <InputUI
                width="460px"
                placeholder={'이메일로 전송된 인증번호를 입력하세요.'}
                onChange={handleCertificateNumInput}
              />
              <DefaultButton
                width="120px"
                onClick={() => handleCertificateButton()}
                isLoading={findIdCertificateConfirmRequestLoading}
                loadingText="인증 중"
              >
                인증하기
              </DefaultButton>
              <Box w="60px">{timerComponent}</Box>
            </Flex>
          ) : (
            ''
          )}
        </>
      )}
    </Container>
  );
}

export default FindId;
