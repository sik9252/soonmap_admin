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
