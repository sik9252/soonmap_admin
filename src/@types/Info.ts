interface IInfoData {
  id?: number;
  title?: string;
  content?: string;
  createAt?: string;
  writer?: string;
  articleTypeName?: string;
  view?: number;
  thumbnail?: string;
}

interface IInfoResponse extends IInfoData {
  success: boolean;
}

interface IInfoQueryRequest {
  page: number;
  startDate?: string | null;
  endDate?: string | null;
  title?: string | null;
  typeName?: string | null;
}

interface IInfoQueryResponse {
  totalPage: number;
  articleList: [];
}

export type { IInfoData, IInfoResponse, IInfoQueryRequest, IInfoQueryResponse };
