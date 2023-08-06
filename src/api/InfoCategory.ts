import { httpClient } from '.';
import { useMutation } from '@tanstack/react-query';

interface CategoryRequestProps {
  id?: number;
  name?: string;
  description?: string;
}

interface CategoryResponse {
  totalPage: number;
  articleTypeList: [];
}

export function useGetCategoryRequest() {
  return useMutation((page: number) =>
    httpClient<CategoryResponse>({
      method: 'GET',
      url: `/admin/article/category/page?page=${page}`,
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
