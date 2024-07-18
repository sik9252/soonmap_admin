interface ICategoryData {
  id?: number;
  typeName?: string;
  description?: string;
}

interface ICategoryResponse {
  totalPage: number;
  articleTypeList: [];
}

interface ICategoryQueryRequest {
  page: number;
}

export type { ICategoryData, ICategoryResponse, ICategoryQueryRequest };
