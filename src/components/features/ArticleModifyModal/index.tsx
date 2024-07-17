import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import TextEditor from '../TextEditor';
import InputUI from '../../ui/InputUI';
import SelectUI from '../../ui/SelectUI';
import CheckboxUI from '../../ui/CheckboxUI';
import { TitleInputSection, ButtonContainer } from './style';
import { Flex } from '@chakra-ui/react';
import { ThumbnailUploadUI } from '../../ui/ThumbnailUploadUI';
import useArticleModifyModal from './useArticleModifyModal';
import { ModalProps } from '../../../@types/Modal';

export interface ArticleModalProps extends ModalProps {
  location: string;
}

function ArticleModifyModal({ location, isModalOpen, setIsModalOpen, currentPage, setCurrentPage }: ArticleModalProps) {
  const {
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
  } = useArticleModifyModal({ location, isModalOpen, setIsModalOpen, currentPage, setCurrentPage });

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
