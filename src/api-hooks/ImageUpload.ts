import { httpClient } from '.';
import { useMutation } from '@tanstack/react-query';
import { IImageUploadRequestProps } from '../@types/ImageUpload';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useUploadImageRequest(mode?: string) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>('');

  const {
    mutate: uploadThumbnailRequest,
    mutateAsync: uploadImageRequest,
    data,
    error,
  } = useMutation(({ image }: IImageUploadRequestProps) => {
    const formData = new FormData();
    formData.append('image', image);

    return httpClient<string>(
      {
        method: 'POST',
        url: '/upload/image',
        data: formData,
      },
      {
        'content-type': 'multipart/form-data',
      },
    );
  });

  useEffect(() => {
    if (data) {
      setThumbnailUrl(data.data);
    } else if (error) {
      toast.error(`썸네일 ${mode ? '수정' : '등록'}에 실패했습니다.`);
    }
  }, [data, error]);

  return {
    uploadThumbnailRequest,
    uploadImageRequest,
    thumbnailUrl,
    setThumbnailUrl,
  };
}
