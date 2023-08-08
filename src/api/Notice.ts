import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface NoticeDataType {
  id?: number;
  title?: string;
  content?: string;
  createAt?: string;
  writer?: string;
  top?: boolean;
  view?: number;
}

export interface NoticeResponseType extends NoticeDataType {
  success: boolean;
}

export interface NoticeQueryRequestType {
  page: number;
  startDate?: string | null;
  endDate?: string | null;
  title?: string | null;
}

export interface NoticeQueryResponseType {
  totalPage: number;
  noticeList: [];
}

export function useGetNoticeRequest(params: NoticeQueryRequestType, isEnabled?: boolean) {
  return useQuery(
    [
      `/admin/notice/search?page=${params.page}&startDate=${params.startDate || ''}&endDate=${
        params.endDate || ''
      }&title=${params.title || ''}`,
      params,
    ],
    () =>
      httpClient<NoticeQueryResponseType>({
        method: 'GET',
        url: `/admin/notice/search?page=${params.page}&startDate=${params.startDate || ''}&endDate=${
          params.endDate || ''
        }&title=${params.title || ''}`,
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
