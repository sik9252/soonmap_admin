import { useState } from 'react';
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
} from './style';

interface SelectedBuildingType {
  id?: number;
  unique_num?: number;
  name?: string;
  floors?: number;
  description?: string;
  x?: number;
  y?: number;
}

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBuilding: SelectedBuildingType;
}

function BuildingModifyModal({ isModalOpen, setIsModalOpen, selectedBuilding }: ModalProps) {
  const handleBuildingModifyModal = () => {
    setIsModalOpen(false);
  };

  const [imgPreview, setImgPreview] = useState<string[]>(Array(selectedBuilding.floors).fill(''));

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview((prevImgPreview) => [
          ...prevImgPreview.slice(0, index),
          reader.result as string,
          ...prevImgPreview.slice(index + 1),
        ]);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
                  <InputUI placeholder="건물의 고유번호를 입력해주세요." width="75%" />
                </InputItem>
                <InputItem>
                  <div>이름</div>
                  <InputUI placeholder="건물의 이름을 입력해주세요." width="75%" />
                </InputItem>
                <InputItem>
                  <div>정보</div>
                  <InputUI placeholder="건물의 정보를 입력해주세요." width="75%" />
                </InputItem>
                <InputItem>
                  <div>총 층수</div>
                  <InputUI placeholder="건물의 총 층수를 입력해주세요." width="75%" />
                </InputItem>
                <InputItem>
                  <div>X 좌표</div>
                  <InputUI placeholder="건물의 X 좌표를 입력해주세요." width="75%" />
                </InputItem>
                <InputItem>
                  <div>Y 좌표</div>
                  <InputUI placeholder="건물의 Y 좌표를 입력해주세요." width="75%" />
                </InputItem>
              </LeftSection>
              <RightSection>
                <SubTitle>층별 도면 수정</SubTitle>
                <FloorInputSection>
                  <div>설정한 층 수가 보이지 않는다면 아래로 스크롤해주세요.</div>
                  {Array.from({ length: selectedBuilding.floors || 0 }).map((_, index) => (
                    <FloorItem key={index}>
                      <div>{index + 1}층</div>
                      <FloorImageUploaderUI
                        floorCount={selectedBuilding.floors || 0}
                        index={index}
                        imgPreview={imgPreview}
                        onImageChange={handleImageChange}
                      />
                    </FloorItem>
                  ))}
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

export default BuildingModifyModal;
