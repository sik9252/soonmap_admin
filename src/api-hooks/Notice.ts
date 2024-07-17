import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';
import { INoticeData, INoticeQueryRequest, INoticeQueryResponse, INoticeResponse } from '../@types/Notice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
