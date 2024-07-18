interface IMyArticleData {
  id?: number;
  title?: string;
  content?: string;
  createAt?: string;
  writer?: string;
  articleTypeName?: string;
  view?: number;
}

interface IMyArticleRequest {
  page: number;
}

interface IMyArticleResponse {
  totalPage: number;
  articleList: [];
}

interface IMyNoticeData {
  id?: number;
  title?: string;
  content?: string;
  writer?: string;
  createAt?: string;
  view?: number;
  top?: boolean;
}

interface IMyNoticeResponse {
  totalPage: number;
  noticeList: [];
}

export type { IMyArticleData, IMyArticleRequest, IMyArticleResponse, IMyNoticeData, IMyNoticeResponse };
