import RightContainer from '../../../components/layout/RightContainer';
import TextEditor from '../../../components/features/TextEditor';
import { TitleInputSection, ButtonContainer } from './style';
import SelectUI from '../../../components/ui/SelectUI';
import InputUI from '../../../components/ui/InputUI';
import { DefaultButton } from '../../../components/ui/ButtonUI';
import { ThumbnailUploadUI } from '../../../components/ui/ThumbnailUploadUI';
import { Flex } from '@chakra-ui/react';
import useCreateInfo from './useCreateInfo';

function CreateInfoPage() {
  const {
    editorRef,
    options,
    thumbnail,
    setThumbnail,
    setThumbnailUrl,
    createInfoLoading,
    handleCategory,
    handleTitle,
    handleContent,
    handleThumbnailChange,
    clickSubmitting,
  } = useCreateInfo();

  return (
    <RightContainer title={'정보 글 업로드'}>
      <TitleInputSection>
        <SelectUI options={options} handleCategory={handleCategory} />
        <InputUI placeholder={'제목을 입력해주세요.'} onChange={handleTitle} maxLength={100} />
      </TitleInputSection>
      <Flex>
        <TextEditor editorRef={editorRef} content={'여기에 내용을 입력해주세요.'} onChange={handleContent} />
        <Flex m="0 auto">
          <ThumbnailUploadUI
            ThumbnailImage={thumbnail}
            handleThumbnailChange={handleThumbnailChange}
            setThumbnail={setThumbnail}
            setThumbnailUrl={setThumbnailUrl}
          />
        </Flex>
      </Flex>
      <ButtonContainer>
        <div>{/* <FileUploaderUI /> */}</div>
        <DefaultButton isLoading={createInfoLoading} loadingText="등록 중" onClick={() => clickSubmitting()}>
          정보 글 등록
        </DefaultButton>
      </ButtonContainer>
    </RightContainer>
  );
}

export default CreateInfoPage;
