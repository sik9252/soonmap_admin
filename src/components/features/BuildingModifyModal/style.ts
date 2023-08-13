import styled from '@emotion/styled';

export const TitleInputSection = styled.div`
  padding: 0 24px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px 50px 24px;

  & > div:nth-of-type(1) {
    width: 80%;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const LeftSection = styled.div`
  width: 45%;
  padding: 15px;

  & > button {
    position: absolute;
    bottom: 35px;
  }
`;

export const RightSection = styled.div`
  width: 55%;
  height: calc(100vh - 170px);
`;

export const InputItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  & > div {
    width: 60px;
    margin-right: 10px;
  }
`;

export const FloorInputSection = styled.div`
  width: 100%;
  overflow-y: scroll;
  padding: 10px;
  box-shadow: 0px 2px 5px #00000029;
  border-radius: 5px;
  height: 100%;

  & > div:nth-of-type(1) {
    font-size: 14px;
    color: #777;
  }
`;

export const FloorItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;

  & > div:nth-of-type(1) {
    width: 50px;
  }

  & > button {
    margin-left: 30px;
  }
`;

export const Notice = styled.div`
  font-size: 13px;
  color: #dc143c;
  margin-top: 8px;
`;
