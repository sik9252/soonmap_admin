import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import RightContainer from '../../../components/layout/RightContainer';
import TextEditor from '../../../components/features/TextEditor';
import { TitleInputSection, ButtonContainer } from './style';
import InputUI from '../../../components/ui/InputUI';
import CheckboxUI from '../../../components/ui/CheckboxUI';
import toast from 'react-hot-toast';
import { DefaultButton } from '../../../components/ui/ButtonUI';
import { FileUploaderUI } from '../../../components/ui/FileUploaderUI';
import { useCreateNoticeRequest } from '../../../api-requests/Notice';

type EditorInstance = Editor | null;

function CreateNoticePage() {
  const navigate = useNavigate();
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

  const {
    mutate: adminCreateNoticeRequest,
    data: adminCreateNoticeData,
    error: adminCreateNoticeError,
    isLoading: adminCreateNoticeLoading,
  } = useCreateNoticeRequest();

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

  useEffect(() => {
    if (adminCreateNoticeData) {
      toast.success('게시글 등록이 완료되었습니다.');
      navigate('/notice/manage');
    } else if (adminCreateNoticeError) {
      toast.error((adminCreateNoticeError as Error).message);
    }
  }, [adminCreateNoticeData, adminCreateNoticeError]);

  return (
    <RightContainer title={'공지사항 글 업로드'}>
      <TitleInputSection>
        <InputUI placeholder={'제목을 입력해주세요.'} onChange={handleTitleInput} maxLength={100} />
        <CheckboxUI isChecked={isTopChecked} onChange={() => clickSelectTopNotice()}>
          주요 공지
        </CheckboxUI>
      </TitleInputSection>
      <TextEditor editorRef={editorRef} content={'여기에 내용을 입력해주세요.'} onChange={handleContentInput} />
      <ButtonContainer>
        <div>{/* <FileUploaderUI /> */}</div>
        <DefaultButton
          isLoading={adminCreateNoticeLoading}
          loadingText="등록 중"
          onClick={() => clickCreateNoticeSubmit()}
        >
          공지사항 등록
        </DefaultButton>
      </ButtonContainer>
    </RightContainer>
  );
}

export default CreateNoticePage;
