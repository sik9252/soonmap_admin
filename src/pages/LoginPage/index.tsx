import { Link } from 'react-router-dom';
import InputUI, { PasswordInputUI } from '../../components/ui/InputUI';
import { DefaultButton } from '../../components/ui/ButtonUI';
import { LoginPageContainer, PageTitle, ButtonSection } from './style';
import useLogin from './useLogin';

function LoginPage() {
  const {
    show,
    handleUserIdInput,
    handleUserPwInput,
    clickLoginSubmit,
    handleEnterKeyLogin,
    clickShowPassword,
    adminLoginLoading,
  } = useLogin();

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
