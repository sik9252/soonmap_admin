import { httpClient } from '.';
import { useMutation } from '@tanstack/react-query';

interface CreateNoticeRequestProps {
  title: string;
  content: string;
  isTop: boolean;
  isExistImage: null;
}

interface CreateNoticeResponse {
  success: boolean;
  id: number;
  title: string;
}

export function useCreateNoticeRequest() {
  return useMutation((data: CreateNoticeRequestProps) =>
    httpClient<CreateNoticeResponse>({
      method: 'POST',
      url: '/admin/notice',
      data,
    }),
  );
}

export function useGetNoticeRequest() {
  return useMutation(() =>
    httpClient<CreateNoticeResponse>({
      method: 'GET',
      // url 수정 필요
      url: '/admin/notice',
    }),
  );
}

export function useUpdateNoticeRequest() {
  return useMutation((data: { id: number }) =>
    httpClient<CreateNoticeResponse>({
      method: 'PATCH',
      url: '/admin/notice',
      data,
    }),
  );
}

export function useDeleteNoticeRequest() {
  return useMutation((data: { id: number }) =>
    httpClient<CreateNoticeResponse>({
      method: 'DELETE',
      url: '/admin/notice',
      data,
    }),
  );
}
