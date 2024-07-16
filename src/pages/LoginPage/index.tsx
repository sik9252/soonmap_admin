import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputUI, { PasswordInputUI } from '../../components/ui/InputUI';
import { DefaultButton } from '../../components/ui/ButtonUI';
import toast from 'react-hot-toast';
import { LoginPageContainer, PageTitle, ButtonSection } from './style';

import { setAuthToken } from '../../utils/setAuthToken';
import { setAuthHierarchy } from '../../utils/setAuthHierarchy';
import { useLoginRequest } from '../../api-requests/Auth';

function LoginPage() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleUserPwInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
  };

  const {
    mutate: adminLoginRequest,
    data: adminLoginData,
    error: adminLoginError,
    isLoading: adminLoginLoading,
  } = useLoginRequest();

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

  useEffect(() => {
    if (adminLoginData) {
      setAuthToken(adminLoginData?.data.accessToken, adminLoginData?.data.refreshToken);
      setAuthHierarchy(adminLoginData?.data);
      toast.success(`${localStorage.getItem('user_name')!}님 환영합니다.`);
      navigate('/home');
    } else if (adminLoginError) {
      toast.error((adminLoginError as Error).message);
    }
  }, [adminLoginData, adminLoginError]);

  const clickShowPassword = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <LoginPageContainer>
      <PageTitle>관리자 로그인</PageTitle>
      <form>
        <InputUI width={'100%'} placeholder={'아이디'} onChange={handleUserIdInput} onKeyDown={handleEnterKeyLogin} />
        <PasswordInputUI
          width={'100%'}
          placeholder={'비밀번호'}
          show={show}
          onClick={() => clickShowPassword()}
          onChange={handleUserPwInput}
          onKeyDown={handleEnterKeyLogin}
        />
      </form>
      <ButtonSection>
        <Link to="/register">회원가입 하러가기</Link>
        <Link to="/find-account">아이디/비밀번호 찾기</Link>
      </ButtonSection>
      <DefaultButton
        width={'100%'}
        isLoading={adminLoginLoading}
        loadingText={'로그인 중'}
        onClick={() => clickLoginSubmit()}
      >
        로그인
      </DefaultButton>
    </LoginPageContainer>
  );
}

export default LoginPage;
