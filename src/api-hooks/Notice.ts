import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';
import { INoticeData, INoticeQueryRequest, INoticeQueryResponse, INoticeResponse } from '../@types/Notice';

export function useGetNoticeRequest(params: INoticeQueryRequest, isEnabled?: boolean) {
  return useQuery(
    [
      `/admin/notice/search?page=${params.page}&startDate=${params.startDate || ''}&endDate=${
        params.endDate || ''
      }&title=${params.title || ''}`,
      params,
    ],
    () =>
      httpClient<INoticeQueryResponse>({
        method: 'GET',
        url: `/admin/notice/search?page=${params.page}&startDate=${params.startDate || ''}&endDate=${
          params.endDate || ''
        }&title=${params.title || ''}`,
      }),
    { enabled: isEnabled },
  );
}

export function useCreateNoticeRequest() {
  return useMutation((data: INoticeData) =>
    httpClient<INoticeResponse>({
      method: 'POST',
      url: '/admin/notice',
      data,
    }),
  );
}

export function useUpdateNoticeRequest() {
  return useMutation((data: INoticeData) =>
    httpClient<INoticeResponse>({
      method: 'PATCH',
      url: `/admin/notice/${data.id ? data.id : ''}`,
      data,
    }),
  );
}

export function useDeleteNoticeRequest() {
  return useMutation((data: INoticeData) =>
    httpClient<INoticeResponse>({
      method: 'DELETE',
      url: `/admin/notice/${data.id ? data.id : ''}`,
    }),
  );
}
