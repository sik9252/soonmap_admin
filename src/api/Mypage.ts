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

export interface MyNoticeDataType {
  id?: number;
  title?: string;
  content?: string;
  writer?: string;
  createAt?: string;
  view?: number;
  top?: boolean;
}

export interface MyNoticeResponseType {
  totalPage: number;
  noticeList: [];
}

export function useGetMyInfoRequest(params: MyArticleRequestType, isEnabled?: boolean) {
  return useQuery(
    [`/admin/article/my?page=${params.page}`],
    () =>
      httpClient<MyArticleResponseType>({
        method: 'GET',
        url: `/admin/article/my?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );
}

export function useGetMyNoticeRequest(params: MyArticleRequestType, isEnabled?: boolean) {
  return useQuery(
    [`/admin/notice/my?page=${params.page}`],
    () =>
      httpClient<MyNoticeResponseType>({
        method: 'GET',
        url: `/admin/notice/my?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );
}
