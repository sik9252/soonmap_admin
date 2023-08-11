import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface InfoDataType {
  id?: number;
  title?: string;
  content?: string;
  createAt?: string;
  writer?: string;
  articleTypeName?: string;
  view?: number;
}

export interface InfoResponseType extends InfoDataType {
  success: boolean;
}

export interface InfoQueryRequestType {
  page: number;
  startDate?: string | null;
  endDate?: string | null;
  title?: string | null;
  typeName?: string | null;
}

export interface InfoQueryResponseType {
  totalPage: number;
  articleList: [];
}

export function useGetInfoRequest(params: InfoQueryRequestType, isEnabled?: boolean) {
  return useQuery(
    [
      `/admin/article/search?page=${params.page}&startDate=${params.startDate || ''}&endDate=${
        params.endDate || ''
      }&title=${params.title || ''}&typeName=${params.typeName || ''}`,
      params,
    ],
    () =>
      httpClient<InfoQueryResponseType>({
        method: 'GET',
        url: `/admin/article/search?page=${params.page}&startDate=${params.startDate || ''}&endDate=${
          params.endDate || ''
        }&title=${params.title || ''}&typeName=${params.typeName || ''}`,
      }),
    { enabled: isEnabled },
  );
}

export function useCreateInfoRequest() {
  return useMutation((data: InfoDataType) =>
    httpClient<InfoResponseType>({
      method: 'POST',
      url: '/admin/article',
      data,
    }),
  );
}

export function useUpdateInfoRequest() {
  return useMutation((data: InfoDataType) =>
    httpClient<InfoResponseType>({
      method: 'PATCH',
      url: `/admin/article/${data.id ? data.id : ''}`,
      data,
    }),
  );
}

export function useDeleteInfoRequest() {
  return useMutation((data: InfoDataType) =>
    httpClient<InfoResponseType>({
      method: 'DELETE',
      url: `/admin/article/${data.id ? data.id : ''}`,
    }),
  );
}
