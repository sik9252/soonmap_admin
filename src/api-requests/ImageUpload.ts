import { httpClient } from '.';
import { useMutation } from '@tanstack/react-query';
import { IImageUploadRequestProps } from '../@types/ImageUpload';

export function useUploadImageRequest() {
  return useMutation(({ image }: IImageUploadRequestProps) => {
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
}
