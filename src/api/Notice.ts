import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface NoticeDataType {
  id?: number;
  title?: string;
  content?: string;
  createAt?: string;
  writer?: string;
  isTop?: boolean;
  view?: number;
}

export interface NoticeResponseType extends NoticeDataType {
  success: boolean;
}

export interface NoticeQueryRequestType {
  page: number;
}

export interface NoticeQueryResponseType {
  totalPage: number;
  articleList: [];
}

export function useGetNoticeRequest(params: NoticeQueryRequestType, isEnabled?: boolean) {
  return useQuery(
    [`/admin/notice?page=${params.page}`, params],
    () =>
      httpClient<NoticeQueryResponseType>({
        method: 'GET',
        url: `/admin/notice?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );
}

export function useCreateNoticeRequest() {
  return useMutation((data: NoticeDataType) =>
    httpClient<NoticeResponseType>({
      method: 'POST',
      url: '/admin/notice',
      data,
    }),
  );
}

export function useUpdateNoticeRequest() {
  return useMutation((data: { id: number }) =>
    httpClient<NoticeResponseType>({
      method: 'PATCH',
      url: '/admin/notice',
      data,
    }),
  );
}

export function useDeleteNoticeRequest() {
  return useMutation((data: { id: number }) =>
    httpClient<NoticeResponseType>({
      method: 'DELETE',
      url: '/admin/notice',
      data,
    }),
  );
}
