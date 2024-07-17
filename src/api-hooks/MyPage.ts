import { httpClient } from '.';
import { useQuery } from '@tanstack/react-query';
import {
  IMyArticleData,
  IMyArticleRequest,
  IMyArticleResponse,
  IMyNoticeData,
  IMyNoticeResponse,
} from '../@types/MyPage';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useGetMyArticleRequest(params: IMyArticleRequest, isEnabled?: boolean) {
  const [myArticleList, setMyArticleList] = useState<IMyArticleData[] | null>([]);
  const [totalPosts, setTotalPosts] = useState(1);

  const {
    data,
    error,
    refetch: myArticleRefetch,
  } = useQuery(
    [`/admin/article/my?page=${params.page}`],
    () =>
      httpClient<IMyArticleResponse>({
        method: 'GET',
        url: `/admin/article/my?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );

  useEffect(() => {
    if (data) {
      setMyArticleList(data.data.articleList);
      setTotalPosts(data.data.totalPage);
    } else if (error) {
      toast.error('내 글 목록을 불러오는데 실패했습니다..');
    }
  }, [data, error]);

  return { myArticleList, totalPosts, myArticleRefetch };
}

export function useGetMyNoticeRequest(params: IMyArticleRequest, isEnabled?: boolean) {
  const [myNoticeList, setMyNoticeList] = useState<IMyNoticeData[] | null>([]);
  const [totalPosts, setTotalPosts] = useState(1);

  const {
    data,
    error,
    refetch: myNoticeRefetch,
  } = useQuery(
    [`/admin/notice/my?page=${params.page}`],
    () =>
      httpClient<IMyNoticeResponse>({
        method: 'GET',
        url: `/admin/notice/my?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );

  useEffect(() => {
    if (data) {
      setMyNoticeList(data.data.noticeList);
      setTotalPosts(data.data.totalPage);
    } else if (error) {
      toast.error('내 공지사항 목록을 불러오는데 실패했습니다..');
    }
  }, [data, error]);

  return { myNoticeList, totalPosts, myNoticeRefetch };
}
