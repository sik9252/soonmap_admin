import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IInfoData, IInfoQueryRequest, IInfoQueryResponse, IInfoResponse } from '../@types/Info';

export function useGetInfoRequest(params: IInfoQueryRequest, isEnabled?: boolean) {
  return useQuery(
    [
      `/admin/article/search?page=${params.page}&startDate=${params.startDate || ''}&endDate=${
        params.endDate || ''
      }&title=${params.title || ''}&typeName=${params.typeName || ''}`,
      params,
    ],
    () =>
      httpClient<IInfoQueryResponse>({
        method: 'GET',
        url: `/admin/article/search?page=${params.page}&startDate=${params.startDate || ''}&endDate=${
          params.endDate || ''
        }&title=${params.title || ''}&typeName=${params.typeName || ''}`,
      }),
    { enabled: isEnabled },
  );
}

export function useCreateInfoRequest() {
  return useMutation((data: IInfoData) =>
    httpClient<IInfoResponse>({
      method: 'POST',
      url: '/admin/article',
      data,
    }),
  );
}

export function useUpdateInfoRequest() {
  return useMutation((data: IInfoData) =>
    httpClient<IInfoResponse>({
      method: 'PATCH',
      url: `/admin/article/${data.id ? data.id : ''}`,
      data,
    }),
  );
}

export function useDeleteInfoRequest() {
  return useMutation((data: IInfoData) =>
    httpClient<IInfoResponse>({
      method: 'DELETE',
      url: `/admin/article/${data.id ? data.id : ''}`,
    }),
  );
}
