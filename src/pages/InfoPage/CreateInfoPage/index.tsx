import { useRef, useState } from 'react';
import TextEditor from '../../../components/TextEditor';
import { ButtonGroup, Button, IconButton, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Container, PageTitle, TitleInputSection, ButtonContainer } from './style';
import SelectUI from '../../../components/SelectUI';

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
        <Input
          placeholder="제목을 입력해주세요."
          size="lg"
          variant="outline"
          borderColor="gray.300"
          focusBorderColor="gray.300"
          _focus={{
            boxShadow: 'none',
          }}
        />
      </TitleInputSection>
      <TextEditor editorRef={editorRef} content={'여기에 내용을 입력해주세요.'} />
      <ButtonContainer>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button>파일 업로드</Button>
          <IconButton aria-label="Add File" icon={<AddIcon />} />
        </ButtonGroup>
        <Button
          isLoading={isLoading}
          loadingText="등록 중"
          bg="#24549C"
          color="white"
          _hover={{
            bg: '#1a478a',
          }}
          variant="outline"
          onClick={() => clickSubmitting()}
        >
          게시글 등록
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default CreateInfoPage;
