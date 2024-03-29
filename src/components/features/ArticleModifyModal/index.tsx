/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useRef, useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { Editor } from '@toast-ui/react-editor';
import TextEditor from '../TextEditor';
import InputUI from '../../ui/InputUI';
import SelectUI from '../../ui/SelectUI';
import CheckboxUI from '../../ui/CheckboxUI';
import { TitleInputSection, ButtonContainer } from './style';
import { useUpdateInfoRequest, useGetInfoRequest } from '../../../api/Info';
import { useUpdateNoticeRequest, useGetNoticeRequest } from '../../../api/Notice';
import { useGetAllCategoryRequest } from '../../../api/InfoCategory';
import { useGetMyInfoRequest, useGetMyNoticeRequest } from '../../../api/Mypage';
import { useUploadImageRequest } from '../../../api/TextEditor';
import toast from 'react-hot-toast';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useCurrentLocationAtom } from '../../../store/currentLocationAtom';
import { CategoryDataType } from '../../../api/InfoCategory';
import { Flex } from '@chakra-ui/react';
import { ThumbnailUploadUI } from '../../ui/ThumbnailUploadUI';

type EditorInstance = Editor | null;

interface ModalProps {
  location: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function ArticleModifyModal({ location, isModalOpen, setIsModalOpen, currentPage, setCurrentPage }: ModalProps) {
  const editorRef = useRef<EditorInstance>(null);
  const { selectedArticle, resetAtom } = useSelectedArticleAtom();
  const { currentLocation } = useCurrentLocationAtom();

  const [options, setOptions] = useState<CategoryDataType[]>([]);
  const [category, setCategory] = useState<string | undefined>('');
  const [title, setTitle] = useState<string | undefined>('');
  const [content, setContent] = useState<string | undefined>('');
  const [isTopChecked, setIsTopChecked] = useState<boolean | undefined>(false);
  const [thumbnail, setThumbnail] = useState<string | undefined>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>('');

  useEffect(() => {
    setIsTopChecked(selectedArticle.top);
  }, [selectedArticle]);

  const { data: categoryGetAllResult, isError: categoryGetAllError } = useGetAllCategoryRequest();
  const { refetch: getInfoRefetch } = useGetInfoRequest(
    {
      page: currentPage - 1,
      startDate: '',
      endDate: '',
      title: '',
      typeName: '',
    },
    false,
  );
  const { refetch: getNoticeRefetch } = useGetNoticeRequest(
    {
      page: currentPage - 1,
      startDate: '',
      endDate: '',
      title: '',
    },
    false,
  );

  const { refetch: myArticleRefetch } = useGetMyInfoRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const { refetch: myNoticeRefetch } = useGetMyNoticeRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const {
    mutate: infoUpdateRequest,
    data: infoUpdateData,
    error: infoUpdateError,
    isLoading: infoUpdateLoading,
  } = useUpdateInfoRequest();

  const {
    mutate: noticeUpdateRequest,
    data: noticeUpdateData,
    error: noticeUpdateError,
    isLoading: noticeUpdateLoading,
  } = useUpdateNoticeRequest();

  const { mutate: uploadThumbnailRequest, data: thumbnailData, error: uploadThumbnailError } = useUploadImageRequest();

  useEffect(() => {
    if (categoryGetAllResult) {
      setOptions(categoryGetAllResult.data);
    } else if (categoryGetAllError) {
      toast.error('카테고리 목록을 불러오는데 실패했습니다.');
    }
  }, [categoryGetAllResult, categoryGetAllError]);

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

  useEffect(() => {
    if (thumbnailData) {
      setThumbnailUrl(thumbnailData.data);
    } else if (uploadThumbnailError) {
      toast.error('썸네일 수정에 실패했습니다.');
    }
  }, [thumbnailData, uploadThumbnailError]);

  // 공지사항 글 수정 관련
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

  useEffect(() => {
    if (infoUpdateData) {
      toast.success('게시글 수정이 완료되었습니다.');
      setIsModalOpen(false);
      void getInfoRefetch();
      void myArticleRefetch();
      setCurrentPage(1);
      resetAtom();
    } else if (infoUpdateError) {
      toast.error((infoUpdateError as Error).message);
    }
  }, [infoUpdateData, infoUpdateError]);

  useEffect(() => {
    if (noticeUpdateData) {
      toast.success('게시글 수정이 완료되었습니다.');
      setIsModalOpen(false);
      void getNoticeRefetch();
      void myNoticeRefetch();
      setCurrentPage(1);
      resetAtom();
    } else if (noticeUpdateError) {
      toast.error((noticeUpdateError as Error).message);
    }
  }, [noticeUpdateData, noticeUpdateError]);

  return (
    <>
      <Modal onClose={() => handleArticleModifyModal()} isOpen={isModalOpen} isCentered size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>게시글 수정하기</ModalHeader>
          <ModalCloseButton />
          {location === '정보' || currentLocation === '작성한 정보' ? (
            <TitleInputSection>
              <SelectUI
                options={options}
                defaultValue={selectedArticle.articleTypeName}
                handleCategory={handleCategory}
              />
              <InputUI defaultValue={selectedArticle.title} onChange={handleTitle} maxLength={100} />
            </TitleInputSection>
          ) : (
            <TitleInputSection>
              <InputUI defaultValue={selectedArticle.title} onChange={handleTitle} maxLength={100} />
              <CheckboxUI isChecked={isTopChecked} onChange={() => clickSelectTopNotice()}>
                주요 공지
              </CheckboxUI>
            </TitleInputSection>
          )}
          <ModalBody>
            {location === '정보' || currentLocation === '작성한 정보' ? (
              <Flex>
                <TextEditor editorRef={editorRef} content={selectedArticle.content} onChange={handleContent} />
                <Flex m="0 auto">
                  <ThumbnailUploadUI
                    ThumbnailImage={thumbnail}
                    handleThumbnailChange={handleThumbnailChange}
                    setThumbnail={setThumbnail}
                    setThumbnailUrl={setThumbnailUrl}
                  />
                </Flex>
              </Flex>
            ) : (
              <TextEditor editorRef={editorRef} content={selectedArticle.content} onChange={handleContent} />
            )}
          </ModalBody>
          <ButtonContainer>
            <div>{/* <FileUploaderUI /> */}</div>
            <div>
              <Button onClick={() => handleArticleModifyModal()}>취소</Button>
              <Button
                backgroundColor="#25549c"
                color="#ffffff"
                ml={3}
                _hover={{
                  bg: '#1a478a',
                }}
                isLoading={infoUpdateLoading || noticeUpdateLoading}
                loadingText={'수정 중'}
                onClick={() => handleUpdateButton()}
              >
                수정
              </Button>
            </div>
          </ButtonContainer>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ArticleModifyModal;
