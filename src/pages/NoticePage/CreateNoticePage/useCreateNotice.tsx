import React, { useRef, useState } from 'react';
import { useCreateNoticeRequest } from '../../../api-hooks/Notice';
import toast from 'react-hot-toast';
import { EditorInstance } from '../../../@types/Editor';

const useCreateNotice = () => {
  const editorRef = useRef<EditorInstance>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isTopChecked, setIsTopChecked] = useState(false);

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentInput = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    setContent(editorRef.current?.getInstance().getHTML());
  };

  const clickSelectTopNotice = () => {
    setIsTopChecked((prevState) => !prevState);
  };

  const { adminCreateNoticeRequest, adminCreateNoticeLoading } = useCreateNoticeRequest();

  const clickCreateNoticeSubmit = () => {
    const data = {
      title: title,
      content: content,
      top: isTopChecked,
    };

    if (!title || !content) {
      toast.error('제목과 내용은 필수 항목 입니다.');
    } else {
      adminCreateNoticeRequest({ ...data });
    }
  };

  return {
    editorRef,
    isTopChecked,
    handleTitleInput,
    handleContentInput,
    clickSelectTopNotice,
    clickCreateNoticeSubmit,
    adminCreateNoticeLoading,
  };
};

export default useCreateNotice;
