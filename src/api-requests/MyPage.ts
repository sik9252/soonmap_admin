import { httpClient } from '.';
import { useQuery } from '@tanstack/react-query';
import { IMyArticleRequest, IMyArticleResponse, IMyNoticeResponse } from '../@types/MyPage';

export function useGetMyInfoRequest(params: IMyArticleRequest, isEnabled?: boolean) {
  return useQuery(
    [`/admin/article/my?page=${params.page}`],
    () =>
      httpClient<IMyArticleResponse>({
        method: 'GET',
        url: `/admin/article/my?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );
}

export function useGetMyNoticeRequest(params: IMyArticleRequest, isEnabled?: boolean) {
  return useQuery(
    [`/admin/notice/my?page=${params.page}`],
    () =>
      httpClient<IMyNoticeResponse>({
        method: 'GET',
        url: `/admin/notice/my?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );
}
