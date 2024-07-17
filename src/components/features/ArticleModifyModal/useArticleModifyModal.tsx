/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useRef, useState } from 'react';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useCurrentLocationAtom } from '../../../store/currentLocationAtom';
import { useUpdateInfoRequest } from '../../../api-hooks/Info';
import { useUpdateNoticeRequest } from '../../../api-hooks/Notice';
import { useUploadImageRequest } from '../../../api-hooks/ImageUpload';
import { useGetAllCategoryRequest } from '../../../api-hooks/InfoCategory';
import { ArticleModalProps } from '.';
import { Editor } from '@toast-ui/react-editor';
import toast from 'react-hot-toast';

const useArticleModifyModal = ({ location, setIsModalOpen, currentPage, setCurrentPage }: ArticleModalProps) => {
  type EditorInstance = Editor | null;
  const editorRef = useRef<EditorInstance>(null);

  const { selectedArticle } = useSelectedArticleAtom();
  const { currentLocation } = useCurrentLocationAtom();

  const [category, setCategory] = useState<string | undefined>('');
  const [title, setTitle] = useState<string | undefined>('');
  const [content, setContent] = useState<string | undefined>('');
  const [isTopChecked, setIsTopChecked] = useState<boolean | undefined>(false);
  const [thumbnail, setThumbnail] = useState<string | undefined>('');

  useEffect(() => {
    setIsTopChecked(selectedArticle.top);
  }, [selectedArticle]);

  const { options } = useGetAllCategoryRequest();

  const { infoUpdateRequest, infoUpdateLoading } = useUpdateInfoRequest(currentPage, setCurrentPage, setIsModalOpen);
  const { noticeUpdateRequest, noticeUpdateLoading } = useUpdateNoticeRequest(
    currentPage,
    setCurrentPage,
    setIsModalOpen,
  );
  const { uploadThumbnailRequest, thumbnailUrl, setThumbnailUrl } = useUploadImageRequest('수정');

  useEffect(() => {
    setCategory(selectedArticle.articleTypeName);
    setTitle(selectedArticle.title);
    setContent(selectedArticle.content);
    setThumbnail(selectedArticle.thumbnail);
    setThumbnailUrl(selectedArticle.thumbnail);
  }, [selectedArticle]);

  const handleArticleModifyModal = () => {
    setIsModalOpen(false);
  };

  // 정보 글 수정 관련
  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = () => {
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

  // 공지사항 글 수정
  const clickSelectTopNotice = () => {
    setIsTopChecked((prevState) => !prevState);
  };

  const handleUpdateButton = () => {
    if (location === '정보' || currentLocation === '작성한 정보') {
      const data = {
        id: selectedArticle.id,
        title: title,
        content: content,
        articleTypeName: category,
        thumbnail: thumbnail && thumbnailUrl ? thumbnailUrl : '',
      };

      if (!title || !content || !category) {
        toast.error('제목, 내용, 카테고리는 필수 항목 입니다.');
      } else {
        infoUpdateRequest({ ...data });
      }
    } else if (location === '공지' || currentLocation === '작성한 공지사항') {
      // 공지사항 수정
      const data = {
        id: selectedArticle.id,
        title: title,
        content: content,
        top: isTopChecked,
      };

      if (!title || !content) {
        toast.error('제목과 내용은 필수 항목 입니다.');
      } else {
        noticeUpdateRequest({ ...data });
      }
    }
  };

  return {
    editorRef,
    selectedArticle,
    currentLocation,
    options,
    isTopChecked,
    thumbnail,
    setThumbnail,
    setThumbnailUrl,
    infoUpdateLoading,
    noticeUpdateLoading,
    handleArticleModifyModal,
    handleCategory,
    handleTitle,
    handleContent,
    handleThumbnailChange,
    clickSelectTopNotice,
    handleUpdateButton,
  };
};

export default useArticleModifyModal;
