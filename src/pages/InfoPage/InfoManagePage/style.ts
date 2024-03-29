import styled from '@emotion/styled';

export const InfoSection = styled.div`
  display: flex;
`;

export const InfoListSection = styled.div`
  width: 60%;

  @media only screen and (min-width: 1700px) {
    width: 50%;
  }

  @media only screen and (min-width: 1995px) {
    width: 40%;
  }

  @media only screen and (min-width: 2421px) {
    width: 30%;
  }
`;

export const SearchSection = styled.div`
  display: flex;
  align-items: center;

  & > button {
    height: 49px;
    margin-bottom: 9px;
    margin-left: 5px;
  }
`;

export const CategoryFilterSection = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const InfoPreviewSection = styled.div`
  width: 40%;
  height: calc(100vh - 110px);
  margin-left: 10px;
  box-shadow: 0px 3px 10px #00000029;
  border-radius: 6px;
  padding: 20px;
  overflow-y: scroll;

  @media only screen and (min-width: 1700px) {
    width: 50%;
  }

  @media only screen and (min-width: 1995px) {
    width: 60%;
  }

  @media only screen and (min-width: 2421px) {
    width: 70%;
  }
`;

export const PreviewTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const PreviewInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 15px;
`;
