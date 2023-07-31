import { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { Editor } from '@toast-ui/react-editor';
import TextEditor from '../TextEditor';
import InputUI from '../InputUI';
import CheckboxUI from '../CheckboxUI';
import { FileUploadButton } from '../ButtonUI';
import { TitleInputSection, ButtonContainer } from './style';

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type EditorInstance = Editor | null;

function ArticleModifyModal({ isModalOpen, setIsModalOpen }: ModalProps) {
  const editorRef = useRef<EditorInstance>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isTopChecked, setIsTopChecked] = useState(false);

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleContentInput = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    setNewContent(editorRef.current?.getInstance().getHTML());
  };

  const clickSelectTopNotice = () => {
    setIsTopChecked((prevState) => !prevState);
  };

  const handleArticleModifyModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal onClose={() => handleArticleModifyModal()} isOpen={isModalOpen} isCentered size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>게시글 수정하기</ModalHeader>
          <ModalCloseButton />
          <TitleInputSection>
            <InputUI placeholder={'기존 제목'} onChange={handleTitleInput} />
            <CheckboxUI isChecked={isTopChecked} onChange={() => clickSelectTopNotice()}>
              주요 공지
            </CheckboxUI>
          </TitleInputSection>
          <ModalBody>
            <TextEditor editorRef={editorRef} content={'기존 내용'} onChange={handleContentInput} />
          </ModalBody>
          <ButtonContainer>
            <div>
              <span>기존 파일 링크</span>
              <FileUploadButton />
            </div>
            <div>
              <Button onClick={() => handleArticleModifyModal()}>취소</Button>
              <Button
                backgroundColor="#25549c"
                color="#ffffff"
                ml={3}
                _hover={{
                  bg: '#1a478a',
                }}
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
