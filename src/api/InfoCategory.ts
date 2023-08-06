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

// 해당 호출을 적용한 컴포넌트 렌더링 시 바로 query가 실행되지 않고 트리거 발생시 refetch 등을 통해 실행되게 하려면 isEnabled 속성 추가하기
export function useGetCategoryRequest(params: CategoryQueryRequest, isEnabled?: boolean) {
  return useQuery(
    [`/admin/article/category/page?page=${params.page}`, params],
    () =>
      httpClient<CategoryResponse>({
        method: 'GET',
        url: `/admin/article/category/page?page=${params.page}`,
      }),
    { enabled: isEnabled },
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
