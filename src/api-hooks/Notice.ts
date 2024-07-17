import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';
import { INoticeData, INoticeQueryRequest, INoticeQueryResponse, INoticeResponse } from '../@types/Notice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useGetMyNoticeRequest } from './MyPage';
import { useSelectedArticleAtom } from '../store/articleAtom';

export function useGetNoticeRequest(params: INoticeQueryRequest, isEnabled?: boolean) {
  const [noticeList, setNoticeList] = useState<INoticeData[] | null>([]);
  const [totalPosts, setTotalPosts] = useState(1);

  const {
    data,
    error,
    refetch: noticeRefetch,
  } = useQuery(
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

  useEffect(() => {
    if (data) {
      setNoticeList(data?.data.noticeList);
      setTotalPosts(data?.data.totalPage);
    } else if (error) {
      toast.error('정보 글 목록을 불러오는데 실패했습니다.');
    }
  }, [data, error]);

  return {
    noticeList,
    totalPosts,
    noticeRefetch,
  };
}

export function useCreateNoticeRequest() {
  const navigate = useNavigate();

  const {
    mutate: adminCreateNoticeRequest,
    data,
    error,
    isLoading: adminCreateNoticeLoading,
  } = useMutation((data: INoticeData) =>
    httpClient<INoticeResponse>({
      method: 'POST',
      url: '/admin/notice',
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('게시글 등록이 완료되었습니다.');
      navigate('/notice/manage');
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return {
    adminCreateNoticeRequest,
    adminCreateNoticeLoading,
  };
}

export function useUpdateNoticeRequest(
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { resetAtom } = useSelectedArticleAtom();
  const { noticeRefetch } = useGetNoticeRequest(
    {
      page: currentPage - 1,
      startDate: '',
      endDate: '',
      title: '',
    },
    false,
  );

  const { myNoticeRefetch } = useGetMyNoticeRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const {
    mutate: noticeUpdateRequest,
    data,
    error,
    isLoading: noticeUpdateLoading,
  } = useMutation((data: INoticeData) =>
    httpClient<INoticeResponse>({
      method: 'PATCH',
      url: `/admin/notice/${data.id ? data.id : ''}`,
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('게시글 수정이 완료되었습니다.');
      setIsModalOpen(false);
      void noticeRefetch();
      void myNoticeRefetch();
      setCurrentPage(1);
      resetAtom();
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return {
    noticeUpdateRequest,
    noticeUpdateLoading,
  };
}

export function useDeleteNoticeRequest(
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { resetAtom } = useSelectedArticleAtom();
  const { noticeRefetch } = useGetNoticeRequest(
    {
      page: currentPage - 1,
      startDate: '',
      endDate: '',
      title: '',
    },
    false,
  );

  const { myNoticeRefetch } = useGetMyNoticeRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const {
    mutate: noticeDeleteRequest,
    data,
    error,
  } = useMutation((data: INoticeData) =>
    httpClient<INoticeResponse>({
      method: 'DELETE',
      url: `/admin/notice/${data.id ? data.id : ''}`,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('공지사항이 삭제되었습니다.');
      void noticeRefetch();
      void myNoticeRefetch();
      setCurrentPage(1);
      resetAtom();
    } else if (error) {
      toast.error((error as Error).message);
    }
    setIsAlertOpen(false);
  }, [data, error]);

  return {
    noticeDeleteRequest,
  };
}
