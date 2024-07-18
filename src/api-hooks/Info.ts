import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { IInfoData, IInfoQueryRequest, IInfoQueryResponse, IInfoResponse } from '../@types/Info';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGetMyArticleRequest } from './MyPage';
import { useSelectedArticleAtom } from '../store/articleAtom';

export function useGetInfoRequest(params: IInfoQueryRequest, isEnabled?: boolean) {
  const [infoList, setInfoList] = useState<IInfoData[] | null>([]);
  const [totalPosts, setTotalPosts] = useState(1);

  const {
    data,
    error,
    refetch: infoRefetch,
  } = useQuery(
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

  useEffect(() => {
    if (data) {
      setInfoList(data?.data.articleList);
      setTotalPosts(data?.data.totalPage);
    } else if (error) {
      toast.error('정보 글 목록을 불러오는데 실패했습니다.');
    }
  }, [data, error]);

  return { infoList, totalPosts, infoRefetch };
}

export function useCreateInfoRequest() {
  const navigate = useNavigate();

  const {
    mutate: createInfoRequest,
    data,
    error,
    isLoading: createInfoLoading,
  } = useMutation((data: IInfoData) =>
    httpClient<IInfoResponse>({
      method: 'POST',
      url: '/admin/article',
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('게시글 등록이 완료되었습니다.');
      navigate('/info/manage');
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return { createInfoRequest, createInfoLoading };
}

export function useUpdateInfoRequest(
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { resetAtom } = useSelectedArticleAtom();
  const { myArticleRefetch } = useGetMyArticleRequest(
    {
      page: currentPage - 1,
    },
    false,
  );
  const { infoRefetch } = useGetInfoRequest(
    {
      page: currentPage - 1,
      startDate: '',
      endDate: '',
      title: '',
      typeName: '',
    },
    false,
  );

  const {
    mutate: infoUpdateRequest,
    data,
    error,
    isLoading: infoUpdateLoading,
  } = useMutation((data: IInfoData) =>
    httpClient<IInfoResponse>({
      method: 'PATCH',
      url: `/admin/article/${data.id ? data.id : ''}`,
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('게시글 수정이 완료되었습니다.');
      setIsModalOpen(false);
      void infoRefetch();
      void myArticleRefetch();
      setCurrentPage(1);
      resetAtom();
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return {
    infoUpdateRequest,
    infoUpdateLoading,
  };
}

export function useDeleteArticleRequest(
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { resetAtom } = useSelectedArticleAtom();
  const { myArticleRefetch } = useGetMyArticleRequest(
    {
      page: currentPage - 1,
    },
    false,
  );
  const { infoRefetch } = useGetInfoRequest(
    {
      page: currentPage - 1,
      startDate: '',
      endDate: '',
      title: '',
      typeName: '',
    },
    false,
  );

  const {
    mutate: infoDeleteRequest,
    data,
    error,
  } = useMutation((data: IInfoData) =>
    httpClient<IInfoResponse>({
      method: 'DELETE',
      url: `/admin/article/${data.id ? data.id : ''}`,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('게시글이 삭제되었습니다.');
      void infoRefetch();
      void myArticleRefetch();
      setCurrentPage(1);
      resetAtom();
    } else if (error) {
      toast.error((error as Error).message);
    }
    setIsAlertOpen(false);
  }, [data, error]);

  return { infoDeleteRequest };
}
