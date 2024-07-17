import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ICategoryData, ICategoryQueryRequest, ICategoryResponse } from '../@types/InfoCategory';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useGetAllCategoryRequest() {
  const [options, setOptions] = useState<ICategoryData[]>([]);

  const { data, error } = useQuery([`/admin/article/category`], () =>
    httpClient<ICategoryData[]>({
      method: 'GET',
      url: `/admin/article/category`,
    }),
  );

  useEffect(() => {
    if (data) {
      setOptions(data.data);
    } else if (error) {
      toast.error('카테고리 목록을 불러오는데 실패했습니다.');
    }
  }, [data, error]);

  return { options, setOptions };
}

// 해당 호출을 적용한 컴포넌트 렌더링 시 바로 query가 실행되지 않고 트리거 발생시 refetch 등을 통해 실행되게 하려면 isEnabled 속성 추가하기
export function useGetCategoryRequest(params: ICategoryQueryRequest, isEnabled?: boolean) {
  const [categoryList, setCategoryList] = useState<ICategoryData[]>([]);
  const [totalPosts, setTotalPosts] = useState(1);

  const {
    data,
    error,
    refetch: getCategoryRefetch,
  } = useQuery(
    [`/admin/article/category/page?page=${params.page}`, params],
    () =>
      httpClient<ICategoryResponse>({
        method: 'GET',
        url: `/admin/article/category/page?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );

  useEffect(() => {
    if (data) {
      setCategoryList(data?.data.articleTypeList);
      setTotalPosts(data?.data.totalPage);
    } else if (error) {
      toast.error('카테고리 목록을 불러오는데 실패했습니다.');
    }
  }, [data, error]);

  return {
    categoryList,
    totalPosts,
    getCategoryRefetch,
  };
}

export default function useCreateCategoryRequest() {
  return useMutation((data: ICategoryData) =>
    httpClient<ICategoryResponse>({
      method: 'POST',
      url: '/admin/article/category',
      data,
    }),
  );
}

export function useUpdateCategoryRequest(
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  onChangeViewMode?: () => void,
) {
  const { getCategoryRefetch } = useGetCategoryRequest({
    page: currentPage - 1,
  });

  const {
    mutate: categoryUpdateRequest,
    data,
    error,
  } = useMutation((data: ICategoryData) =>
    httpClient<ICategoryResponse>({
      method: 'PATCH',
      url: `/admin/article/category/${data.id ? data.id : ''}`,
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('수정되었습니다.');
      void getCategoryRefetch();
      setCurrentPage(1);
      onChangeViewMode && onChangeViewMode();
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return {
    categoryUpdateRequest,
  };
}

export function useDeleteCategoryRequest() {
  return useMutation((data: ICategoryData) =>
    httpClient<ICategoryResponse>({
      method: 'DELETE',
      url: `/admin/article/category/${data.id ? data.id : ''}`,
    }),
  );
}
