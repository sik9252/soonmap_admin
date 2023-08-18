import styled from '@emotion/styled';

export const AccountInfoText = styled.div`
  font-size: 18px;
  padding: 5px 0;
`;

export const FooterSection = styled.div`
  position: absolute;
  bottom: 30px;
`;

// 내가 작성한 글
export const MyArticleSection = styled.div`
  display: flex;
`;

export const MyArticleListSection = styled.div`
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

export const MyArticlePreviewSection = styled.div`
  width: 50%;
  height: calc(100vh - 170px);
  margin-left: 10px;
  box-shadow: 0px 3px 10px #00000029;
  border-radius: 6px;
  padding: 20px;
  overflow-y: scroll;

  @media only screen and (min-width: 1700px) {
    width: 60%;
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

export const PreviewMyArticle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 15px;
`;
