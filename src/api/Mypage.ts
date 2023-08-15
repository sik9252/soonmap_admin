import { httpClient } from '.';
import { useQuery } from '@tanstack/react-query';

export interface MyArticleDataType {
  id?: number;
  title?: string;
  content?: string;
  createAt?: string;
  writer?: string;
  articleTypeName?: string;
  view?: number;
}

export interface MyArticleRequestType {
  page: number;
}

export interface MyArticleResponseType {
  totalPage: number;
  articleList: [];
}

export function useGetMyArticleRequest(params: MyArticleRequestType, isEnabled?: boolean) {
  return useQuery([`/admin/article/my?page=${params.page}`], () =>
    httpClient<MyArticleResponseType>({
      method: 'GET',
      url: `/admin/article/my?page=${params.page}`,
    }),
  );
}
