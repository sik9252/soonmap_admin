import React, { useRef, useState } from 'react';
import { useGetAllCategoryRequest } from '../../../api-hooks/InfoCategory';
import { useUploadImageRequest } from '../../../api-hooks/ImageUpload';
import { useCreateInfoRequest } from '../../../api-hooks/Info';
import toast from 'react-hot-toast';
import { Editor } from '@toast-ui/react-editor';

type EditorInstance = Editor | null;

const useCreateInfo = () => {
  const editorRef = useRef<EditorInstance>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState<string | undefined>('');

  const { options } = useGetAllCategoryRequest();
  const { uploadThumbnailRequest, thumbnailUrl, setThumbnailUrl } = useUploadImageRequest();
  const { createInfoRequest, createInfoLoading } = useCreateInfoRequest();

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    setContent(editorRef.current?.getInstance().getHTML());
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);

      uploadThumbnailRequest({
        image: e.target.files[0],
      });
    }
  };

  const clickSubmitting = () => {
    const data = {
      title: title,
      content: content,
      articleTypeName: category,
      thumbnail: thumbnail && thumbnailUrl ? thumbnailUrl : '',
    };

    if (!title || !content || !category) {
      toast.error('제목, 내용, 카테고리는 필수 항목 입니다.');
    } else {
      createInfoRequest({ ...data });
    }
  };

  return {
    editorRef,
    options,
    thumbnail,
    setThumbnail,
    setThumbnailUrl,
    createInfoLoading,
    handleCategory,
    handleTitle,
    handleContent,
    handleThumbnailChange,
    clickSubmitting,
  };
};

export default useCreateInfo;
