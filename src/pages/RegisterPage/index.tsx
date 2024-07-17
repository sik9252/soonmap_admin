import { Link } from 'react-router-dom';
import InputUI, { PasswordInputUI } from '../../components/ui/InputUI';
import { DefaultButton } from '../../components/ui/ButtonUI';
import { RegisterPageContainer, PageTitle, ButtonSection } from './style';
import useRegister from './useRegister';

function RegisterPage() {
  const {
    show,
    handleUserNameInput,
    handleUserIdInput,
    handleUserEmailInput,
    handleUserPwInput,
    clickShowPassword,
    clickRegisterSubmit,
    adminRegisterLoading,
  } = useRegister();

  return (
    <RegisterPageContainer>
      <PageTitle>관리자 회원가입</PageTitle>
      <form>
        <InputUI width={'100%'} placeholder={'이름(ex. OOO 학생회)'} onChange={handleUserNameInput} maxLength={20} />
        <InputUI width={'100%'} placeholder={'아이디'} onChange={handleUserIdInput} />
        <InputUI width={'100%'} placeholder={'이메일 ex) test123@sch.ac.kr'} onChange={handleUserEmailInput} />
        <PasswordInputUI
          width={'100%'}
          placeholder={'비밀번호'}
          show={show}
          onClick={() => clickShowPassword()}
          onChange={handleUserPwInput}
        />
      </form>
      <ButtonSection>
        <Link to="/login">로그인 하러가기</Link>
        <DefaultButton
          width={'120px'}
          isLoading={adminRegisterLoading}
          loadingText={'회원가입 중'}
          onClick={() => clickRegisterSubmit()}
        >
          회원가입
        </DefaultButton>
      </ButtonSection>
    </RegisterPageContainer>
  );
}

export default RegisterPage;
