import styled from '@emotion/styled';

export const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  height: calc(100vh - 110px);
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
  height: calc(100vh - 140px);

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
`;
