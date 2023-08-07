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
}

export interface InfoQueryResponseType {
  totalPage: number;
  articleList: [];
}

export function useGetInfoRequest(params: InfoQueryRequestType, isEnabled?: boolean) {
  return useQuery(
    [`/admin/article/all?page=${params.page}`, params],
    () =>
      httpClient<InfoQueryResponseType>({
        method: 'GET',
        url: `/admin/article/all?page=${params.page}`,
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
