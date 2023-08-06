import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';

interface CategoryRequestProps {
  id?: number;
  name?: string;
  description?: string;
}

interface CategoryResponse {
  totalPage: number;
  articleTypeList: [];
}

interface AllCategoryResponse {
  id: number;
  typeName: string;
  description: string;
}

interface CategoryQueryRequest {
  page: number;
}

export function useGetAllCategoryRequest() {
  return useQuery([`/admin/article/category`], () =>
    httpClient<AllCategoryResponse[]>({
      method: 'GET',
      url: `/admin/article/category`,
    }),
  );
}

export function useGetCategoryRequest(params: CategoryQueryRequest) {
  return useQuery([`/admin/article/category/page?page=${params.page}`, params], () =>
    httpClient<CategoryResponse>({
      method: 'GET',
      url: `/admin/article/category/page?page=${params.page}`,
      params: params,
    }),
  );
}

export function useCreateCategoryRequest() {
  return useMutation((data: CategoryRequestProps) =>
    httpClient<CategoryResponse>({
      method: 'POST',
      url: '/admin/article/category',
      data,
    }),
  );
}

export function useUpdateCategoryRequest() {
  return useMutation((data: CategoryRequestProps) =>
    httpClient<CategoryResponse>({
      method: 'PATCH',
      url: `/admin/article/category/${data.id ? data.id : ''}`,
      data,
    }),
  );
}

export function useDeleteCategoryRequest() {
  return useMutation((data: CategoryRequestProps) =>
    httpClient<CategoryResponse>({
      method: 'DELETE',
      url: `/admin/article/category/${data.id ? data.id : ''}`,
    }),
  );
}
