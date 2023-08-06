import { httpClient } from '.';
import { useMutation } from '@tanstack/react-query';

interface ImageUploadRequestProps {
  image: Blob;
}

export function useUploadImageRequest() {
  return useMutation(({ image }: ImageUploadRequestProps) => {
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
