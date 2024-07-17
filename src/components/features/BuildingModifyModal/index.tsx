import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import InputUI from '../../ui/InputUI';
import { FloorImageUploaderUI } from '../../ui/FloorImageUploaderUI';
import {
  ButtonContainer,
  SubContainer,
  SubTitle,
  LeftSection,
  RightSection,
  InputItem,
  FloorInputSection,
  FloorItem,
  Notice,
} from './style';
import { DefaultButton } from '../../ui/ButtonUI';
import { ModalProps } from '../../../@types/Modal';
import useBuildingModifyModal from './useBuildingModifyModal';

function BuildingModifyModal({ isModalOpen, setIsModalOpen, currentPage, setCurrentPage }: ModalProps) {
  const {
    selectedBuilding,
    imgPreview,
    updatedImgList,
    handleBuildingModifyModal,
    handleBuildingNumber,
    handleBuildingName,
    handleBuildingDescription,
    handleBuildingUpFloorsCount,
    handleBuildingDownFloorsCount,
    handleBuildingXpos,
    handleBuildingYpos,
    handleImageChange,
    handleBuildingInfoUpdateButton,
    handleFloorImageUpdate,
    floorImages,
    updateBuildingInfoLoading,
  } = useBuildingModifyModal({ isModalOpen, setIsModalOpen, currentPage, setCurrentPage });

  return (
    <>
      <Modal onClose={() => handleBuildingModifyModal()} isOpen={isModalOpen} isCentered size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>건물 및 강의실 정보 수정하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SubContainer>
              <LeftSection>
                <SubTitle>건물 정보 수정</SubTitle>
                <InputItem>
                  <div>고유번호</div>
                  <InputUI
                    placeholder="건물의 고유번호를 입력해주세요."
                    width="75%"
                    defaultValue={selectedBuilding.uniqueNumber}
                    onChange={handleBuildingNumber}
                  />
                </InputItem>
                <InputItem>
                  <div>이름</div>
                  <InputUI
                    placeholder="건물의 이름을 입력해주세요."
                    width="75%"
                    defaultValue={selectedBuilding.name}
                    onChange={handleBuildingName}
                  />
                </InputItem>
                <InputItem>
                  <div>정보</div>
                  <InputUI
                    placeholder="건물의 정보를 입력해주세요."
                    width="75%"
                    defaultValue={selectedBuilding.description}
                    onChange={handleBuildingDescription}
                  />
                </InputItem>
                <InputItem>
                  <div>총 층수</div>
                  <InputUI
                    placeholder="지상 층수 (<= 20)"
                    width="36.5%"
                    defaultValue={selectedBuilding.floorsUp?.toString()}
                    onChange={handleBuildingUpFloorsCount}
                  />
                  <div style={{ width: '1px' }}></div>
                  <InputUI
                    placeholder="지하 층수 (<= 10)"
                    width="36.5%"
                    defaultValue={selectedBuilding.floorsDown?.toString()}
                    onChange={handleBuildingDownFloorsCount}
                  />
                </InputItem>
                <InputItem>
                  <div>X 좌표</div>
                  <InputUI
                    placeholder="건물의 X 좌표를 입력해주세요."
                    width="75%"
                    defaultValue={selectedBuilding.latitude?.toString()}
                    onChange={handleBuildingXpos}
                  />
                </InputItem>
                <InputItem>
                  <div>Y 좌표</div>
                  <InputUI
                    placeholder="건물의 Y 좌표를 입력해주세요."
                    width="75%"
                    defaultValue={selectedBuilding.longitude?.toString()}
                    onChange={handleBuildingYpos}
                  />
                </InputItem>
              </LeftSection>
              <RightSection>
                <SubTitle>
                  층별 도면 수정
                  <Notice>각 도면 옆의 수정하기 버튼을 눌러야 이미지 수정이 완료됩니다.</Notice>
                </SubTitle>
                <FloorInputSection>
                  {floorImages && floorImages.length > 0 ? (
                    <>
                      {Array.from({ length: selectedBuilding.floorsUp || 0 + (selectedBuilding.floorsDown || 0) }).map(
                        (_, index) => (
                          <FloorItem key={index + (selectedBuilding.floorsDown || 0)}>
                            <div>
                              {index - (selectedBuilding.floorsDown || 0) >= 0
                                ? index - (selectedBuilding.floorsDown || 0) + 1
                                : index - (selectedBuilding.floorsDown || 0)}
                              층
                            </div>
                            <FloorImageUploaderUI
                              defaultIndex={index}
                              index={
                                index - (selectedBuilding.floorsDown || 0) >= 0
                                  ? index - (selectedBuilding.floorsDown || 0) + 1
                                  : index - (selectedBuilding.floorsDown || 0)
                              }
                              imgPreview={imgPreview}
                              onImageChange={handleImageChange}
                            />
                            <DefaultButton
                              onClick={() => handleFloorImageUpdate(floorImages[index].id, updatedImgList![index])}
                            >
                              {index - (selectedBuilding.floorsDown || 0) >= 0
                                ? index - (selectedBuilding.floorsDown || 0) + 1
                                : index - (selectedBuilding.floorsDown || 0)}
                              층 도면 수정하기
                            </DefaultButton>
                          </FloorItem>
                        ),
                      )}
                    </>
                  ) : (
                    <div>도면이 존재하지 않는 건물입니다.</div>
                  )}
                </FloorInputSection>
              </RightSection>
            </SubContainer>
          </ModalBody>
          <ButtonContainer>
            <div>
              <Button onClick={() => handleBuildingModifyModal()}>취소</Button>
              <Button
                backgroundColor="#25549c"
                color="#ffffff"
                ml={3}
                _hover={{
                  bg: '#1a478a',
                }}
                onClick={() => handleBuildingInfoUpdateButton()}
                isLoading={updateBuildingInfoLoading}
                loadingText="건물 정보 수정중"
              >
                건물 정보 수정
              </Button>
            </div>
          </ButtonContainer>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BuildingModifyModal;
