interface INoticeData {
  id?: number;
  title?: string;
  content?: string;
  createAt?: string;
  writer?: string;
  top?: boolean;
  view?: number;
}

interface INoticeResponse extends INoticeData {
  success: boolean;
}

interface INoticeQueryRequest {
  page: number;
  startDate?: string | null;
  endDate?: string | null;
  title?: string | null;
}

interface INoticeQueryResponse {
  totalPage: number;
  noticeList: [];
}

export type { INoticeData, INoticeResponse, INoticeQueryRequest, INoticeQueryResponse };
