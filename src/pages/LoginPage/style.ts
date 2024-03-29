import styled from '@emotion/styled';

export const LoginPageContainer = styled.div`
  width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const PageTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const ButtonSection = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 15px 0;

  & > a {
    color: #777777;
  }
`;
