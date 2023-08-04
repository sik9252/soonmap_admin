import styled from '@emotion/styled';

export const RegisterPageContainer = styled.div`
  width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > form {
    & > input:nth-of-type(1) {
      margin-bottom: 10px;
    }
  }
`;

export const PageTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const ButtonSection = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  & > a {
    color: #777777;
  }
`;
