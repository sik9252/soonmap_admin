import { httpClient } from '.';
import { useMutation } from '@tanstack/react-query';

interface CreateInfoRequestProps {
  title: string;
  content: string;
  articleTypeId: number;
}

interface CreateInfoResponse {
  success: boolean;
  id: number;
  title: string;
}

export function useCreateInfoRequest() {
  return useMutation((data: CreateInfoRequestProps) =>
    httpClient<CreateInfoResponse>({
      method: 'POST',
      url: '/admin/article',
      data,
    }),
  );
}
