import React, { useMemo } from 'react';
import InputUI from '../../components/ui/InputUI';
import { Container, Box, Flex } from '@chakra-ui/react';
import { DefaultButton } from '../../components/ui/ButtonUI';
import Timer from '../../utils/timer';
import useFindId from './useFindId';

function FindId() {
  const {
    setTimeUp,
    findIdEmailValidateRequestLoading,
    isEmailCheckSuccess,
    findIdCertificateConfirmRequestData,
    findIdCertificateConfirmRequestLoading,
    handleUserEmailInput,
    handleCertificateNumInput,
    handleGetCertificateButton,
    handleCertificateButton,
  } = useFindId();

  const timerComponent = useMemo(() => {
    return <Timer isStart={isEmailCheckSuccess} setTimeUp={setTimeUp} />;
  }, [isEmailCheckSuccess]);

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
