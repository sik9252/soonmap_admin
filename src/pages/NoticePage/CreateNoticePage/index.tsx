import RightContainer from '../../../components/layout/RightContainer';
import TextEditor from '../../../components/features/TextEditor';
import { TitleInputSection, ButtonContainer } from './style';
import InputUI from '../../../components/ui/InputUI';
import CheckboxUI from '../../../components/ui/CheckboxUI';
import { DefaultButton } from '../../../components/ui/ButtonUI';
import useCreateNotice from './useCreateNotice';

function CreateNoticePage() {
  const {
    editorRef,
    isTopChecked,
    handleTitleInput,
    handleContentInput,
    clickSelectTopNotice,
    clickCreateNoticeSubmit,
    adminCreateNoticeLoading,
  } = useCreateNotice();

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
