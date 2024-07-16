import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputUI, { PasswordInputUI } from '../../components/ui/InputUI';
import { DefaultButton } from '../../components/ui/ButtonUI';
import toast from 'react-hot-toast';
import { RegisterPageContainer, PageTitle, ButtonSection } from './style';
import { useRegisterRequest } from '../../api-requests/Auth';
import { checkEmailValidate } from '../../utils/checkEmailValidate';

function RegisterPage() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');

  const handleUserNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleUserEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleUserPwInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
  };

  const clickShowPassword = () => {
    setShow((prevState) => !prevState);
  };

  const {
    mutate: adminRegisterRequest,
    data: adminRegisterData,
    error: adminRegisterError,
    isLoading: adminRegisterLoading,
  } = useRegisterRequest();

  const clickRegisterSubmit = () => {
    const data = {
      name: userName,
      userId: userId,
      email: userEmail,
      userPw: userPw,
    };

    if (!userName || !userId || !userEmail || !userPw) {
      toast.error('모든 입력 칸을 채워주세요.');
    } else {
      if (checkEmailValidate(userEmail)) {
        adminRegisterRequest({ ...data });
      } else {
        toast.error('올바른 이메일 주소를 입력해주세요.');
      }
    }
  };

  useEffect(() => {
    if (adminRegisterData) {
      toast.success('회원가입이 완료되었습니다.');
      navigate('/login');
    } else if (adminRegisterError) {
      toast.error((adminRegisterError as Error).message);
    }
  }, [adminRegisterData, adminRegisterError]);

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
