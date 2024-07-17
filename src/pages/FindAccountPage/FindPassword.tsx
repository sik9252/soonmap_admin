import { useMemo } from 'react';
import { Container, Box, Flex, FormControl, FormHelperText } from '@chakra-ui/react';
import InputUI from '../../components/ui/InputUI';
import { DefaultButton } from '../../components/ui/ButtonUI';
import Timer from '../../utils/timer';
import useFindPassword from './useFindPassword';

function FindPassword() {
  const {
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
  } = useFindPassword();

  const timerComponent = useMemo(() => {
    return <Timer isStart={isEmailAndIdCheckSuccess} setTimeUp={setTimeUp} />;
  }, [isEmailAndIdCheckSuccess]);

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
