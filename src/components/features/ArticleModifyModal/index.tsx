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
import { FileUploaderUI } from '../../ui/FileUploaderUI';
import { TitleInputSection, ButtonContainer } from './style';
import { useUpdateInfoRequest, useGetInfoRequest } from '../../../api/Info';
import { useUpdateNoticeRequest, useGetNoticeRequest } from '../../../api/Notice';
import { useGetAllCategoryRequest } from '../../../api/InfoCategory';
import toast from 'react-hot-toast';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { CategoryDataType } from '../../../api/InfoCategory';

type EditorInstance = Editor | null;

interface ModalProps {
  location: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ArticleModifyModal({ location, isModalOpen, setIsModalOpen }: ModalProps) {
  const editorRef = useRef<EditorInstance>(null);
  const { selectedArticle, resetAtom } = useSelectedArticleAtom();

  const [options, setOptions] = useState<CategoryDataType[]>([]);
  const [category, setCategory] = useState<string | undefined>('');
  const [title, setTitle] = useState<string | undefined>('');
  const [content, setContent] = useState<string | undefined>('');
  const [isTopChecked, setIsTopChecked] = useState<boolean | undefined>(false);

  useEffect(() => {
    setIsTopChecked(selectedArticle.top);
  }, [selectedArticle]);

  const { data: categoryGetAllResult, isError: categoryGetAllError } = useGetAllCategoryRequest();
  const { refetch: getInfoRefetch } = useGetInfoRequest(
    {
      page: 0,
    },
    false,
  );
  const { refetch: getNoticeRefetch } = useGetNoticeRequest(
    {
      page: 0,
      startDate: '',
      endDate: '',
      title: '',
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

  // 공지사항 글 수정 관련
  const clickSelectTopNotice = () => {
    setIsTopChecked((prevState) => !prevState);
  };

  const handleUpdateButton = () => {
    if (location === '정보') {
      const data = {
        id: selectedArticle.id,
        title: title,
        content: content,
        articleTypeName: category,
      };

      if (!title || !content) {
        toast.error('제목과 내용은 필수 항목 입니다.');
      } else {
        infoUpdateRequest({ ...data });
      }
    } else if (location === '공지') {
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
          {location === '정보' ? (
            <TitleInputSection>
              <SelectUI
                options={options}
                defaultValue={selectedArticle.articleTypeName}
                handleCategory={handleCategory}
              />
              <InputUI defaultValue={selectedArticle.title} onChange={handleTitle} />
            </TitleInputSection>
          ) : (
            <TitleInputSection>
              <InputUI defaultValue={selectedArticle.title} onChange={handleTitle} />
              <CheckboxUI isChecked={isTopChecked} onChange={() => clickSelectTopNotice()}>
                주요 공지
              </CheckboxUI>
            </TitleInputSection>
          )}
          <ModalBody>
            <TextEditor editorRef={editorRef} content={selectedArticle.content} onChange={handleContent} />
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
