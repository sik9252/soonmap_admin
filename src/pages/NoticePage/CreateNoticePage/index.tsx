import { useRef, useState } from 'react';
import TextEditor from '../../../components/TextEditor';
import { Container, PageTitle, TitleInputSection, ButtonContainer } from './style';
import InputUI from '../../../components/InputUI';
import CheckboxUI from '../../../components/CheckboxUI';
import { DefaultButton, FileUploadButton } from '../../../components/ButtonUI';

function CreateNoticePage() {
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const clickSubmitting = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const clickSelectTopNotice = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <Container>
      <PageTitle>공지사항 글 업로드</PageTitle>
      <TitleInputSection>
        <InputUI placeholder={'제목을 입력해주세요.'} />
        <CheckboxUI isChecked={isChecked} onChange={() => clickSelectTopNotice()}>
          주요 공지
        </CheckboxUI>
      </TitleInputSection>
      <TextEditor editorRef={editorRef} content={'여기에 내용을 입력해주세요.'} />
      <ButtonContainer>
        <FileUploadButton />
        <DefaultButton isLoading={isLoading} loadingText="등록 중" onClick={() => clickSubmitting()}>
          게시글 등록
        </DefaultButton>
      </ButtonContainer>
    </Container>
  );
}

export default CreateNoticePage;
