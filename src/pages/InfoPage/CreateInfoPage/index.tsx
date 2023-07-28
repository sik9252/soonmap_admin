import { useRef, useState } from 'react';
import TextEditor from '../../../components/TextEditor';
import { Container, PageTitle, TitleInputSection, ButtonContainer } from './style';
import SelectUI from '../../../components/SelectUI';
import InputUI from '../../../components/InputUI';
import { DefaultButton, FileUploadButton } from '../../../components/ButtonUI';

function CreateInfoPage() {
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([
    {
      id: 1,
      value: '이벤트',
    },
    {
      id: 2,
      value: '행사',
    },
    {
      id: 3,
      value: '축제',
    },
  ]);

  const clickSubmitting = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Container>
      <PageTitle>정보 글 업로드</PageTitle>
      <TitleInputSection>
        <SelectUI options={options} />
        <InputUI placeholder={'제목을 입력해주세요.'} />
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

export default CreateInfoPage;
