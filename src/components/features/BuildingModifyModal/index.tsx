import { useState, useEffect } from 'react';
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
import { useSelectedBuildingAtom } from '../../../store/buildingAtom';
import {
  useGetBuildingRequest,
  useGetFloorRequest,
  useUpdateBuildingRequest,
  useUpdateFloorImageRequest,
  FloorQueryResponseType,
} from '../../../api/Building';
import toast from 'react-hot-toast';
import { DefaultButton } from '../../ui/ButtonUI';

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function BuildingModifyModal({ isModalOpen, setIsModalOpen, currentPage, setCurrentPage }: ModalProps) {
  const { selectedBuilding, resetBuildingAtom } = useSelectedBuildingAtom();
  const [floorImages, setFloorImages] = useState<FloorQueryResponseType[] | null>([]);
  const [buildingNumber, setBuildingNumber] = useState<string | undefined>('');
  const [buildingName, setBuildingName] = useState<string | undefined>('');
  const [buildingDescription, setBuildingDescription] = useState<string | undefined>('');
  const [buildingUpFloorsCount, setBuildingUpFloorsCount] = useState<number | undefined>(0);
  const [buildingDownFloorsCount, setBuildingDownFloorsCount] = useState<number | undefined>(0);
  const [buildingXpos, setBuildingXpos] = useState<number | undefined>(0);
  const [buildingYpos, setBuildingYpos] = useState<number | undefined>(0);
  const [imgPreview, setImgPreview] = useState<string[]>(Array(0).fill(''));
  const [updatedImgList, setUpdatedImgList] = useState<Blob[] | null>(Array(0).fill(null));

  useEffect(() => {
    setBuildingNumber(selectedBuilding.uniqueNumber);
    setBuildingName(selectedBuilding.name);
    setBuildingDescription(selectedBuilding.description);
    setBuildingUpFloorsCount(selectedBuilding.floorsUp);
    setBuildingDownFloorsCount(selectedBuilding.floorsDown);
    setBuildingXpos(selectedBuilding.latitude);
    setBuildingYpos(selectedBuilding.longitude);
  }, [selectedBuilding]);

  useEffect(() => {
    setImgPreview(Array((buildingUpFloorsCount || 0) + (buildingDownFloorsCount || 0)).fill(''));
    setUpdatedImgList(Array((buildingUpFloorsCount || 0) + (buildingDownFloorsCount || 0)).fill(''));
  }, [buildingUpFloorsCount, buildingDownFloorsCount]);

  const { refetch: getBuildingRefetch } = useGetBuildingRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const {
    data: getFloorResult,
    isError: getFloorError,
    refetch: getFloorRefetch,
  } = useGetFloorRequest(
    {
      buildingId: selectedBuilding.id ? selectedBuilding.id : 0,
    },
    false,
  );

  const {
    mutate: updateBuildingInfoRequest,
    data: updateBuildingInfoData,
    error: updateBuildingInfoError,
    isLoading: updateBuildingInfoLoading,
  } = useUpdateBuildingRequest();

  const {
    mutate: updateFloorImageRequest,
    data: updateFloorImageData,
    error: updateFloorImageError,
    isLoading: updateFloorImageLoading,
  } = useUpdateFloorImageRequest();

  useEffect(() => {
    if (isModalOpen) void getFloorRefetch();
  }, [isModalOpen]);

  useEffect(() => {
    if (getFloorResult) {
      setFloorImages(getFloorResult?.data as FloorQueryResponseType[] | null);
    } else if (getFloorError) {
      toast.error('건물 목록을 불러오는데 실패했습니다.');
    }
  }, [getFloorResult, getFloorError]);

  useEffect(() => {
    const floorImageList: string[] = [];

    floorImages?.forEach((image) => {
      if (image) {
        floorImageList.push(image.dir || '');
      }
    });

    setImgPreview(floorImageList);
  }, [floorImages]);

  const handleBuildingModifyModal = () => {
    setIsModalOpen(false);
  };

  const handleBuildingNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingNumber(e.target.value);
  };

  const handleBuildingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingName(e.target.value);
  };

  const handleBuildingDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingDescription(e.target.value);
  };

  const handleBuildingUpFloorsCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingUpFloorsCount(Number(e.target.value));
  };

  const handleBuildingDownFloorsCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingDownFloorsCount(Number(e.target.value));
  };

  const handleBuildingXpos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingXpos(Number(e.target.value));
  };

  const handleBuildingYpos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingYpos(Number(e.target.value));
  };

  const handleImageChange = (defaultIndex: number, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(index);
    e.preventDefault();

    const updatedImageList: Blob[] = [];

    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview((prevImgPreview) => [
          ...prevImgPreview.slice(0, defaultIndex),
          reader.result as string,
          ...prevImgPreview.slice(defaultIndex + 1),
        ]);
      };
      reader.readAsDataURL(e.target.files[0]);

      updatedImageList[defaultIndex] = e.target.files[0];
      setUpdatedImgList(updatedImageList);
    }
  };

  const handleBuildingInfoUpdateButton = () => {
    const data = {
      id: selectedBuilding.id,
      name: buildingName,
      floorsUp: buildingUpFloorsCount,
      floorsDown: buildingDownFloorsCount,
      description: buildingDescription,
      latitude: buildingXpos,
      longitude: buildingYpos,
      uniqueNumber: buildingNumber,
    };

    if (
      !buildingName ||
      !buildingUpFloorsCount ||
      !buildingDescription ||
      !buildingXpos ||
      !buildingYpos ||
      !buildingNumber
    ) {
      toast.error('모든 항목은 필수값입니다.');
    } else {
      updateBuildingInfoRequest({ ...data });
    }
  };

  useEffect(() => {
    if (updateBuildingInfoData) {
      toast.success('건물 정보 수정이 완료되었습니다.');
      void getBuildingRefetch();
      setCurrentPage(1);
    } else if (updateBuildingInfoError) {
      toast.error((updateBuildingInfoError as Error).message);
    }
  }, [updateBuildingInfoData, updateBuildingInfoError]);

  const handleFloorImageUpdate = (floorId?: number, image?: Blob) => {
    updateFloorImageRequest({
      floorId: floorId,
      image: image,
    });
  };

  useEffect(() => {
    if (updateFloorImageData) {
      toast.success('도면 수정이 완료되었습니다.');
      setCurrentPage(1);
    } else if (updateFloorImageError) {
      toast.error('수정할 이미지가 등록되지 않았습니다.');
    }
  }, [updateFloorImageData, updateFloorImageError]);

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
                      {/* {Array.from({ length: selectedBuilding.floorsDown || 0 }).map((_, index) => (
                        <FloorItem key={index}>
                          <div style={{ color: '#48aaad' }}>{index - (selectedBuilding.floorsDown || 0)}층</div>
                          <FloorImageUploaderUI
                            index={index}
                            imgPreview={imgPreview.slice(0, selectedBuilding.floorsDown)}
                            onImageChange={handleImageChange}
                          />
                          <DefaultButton
                            onClick={() => handleFloorImageUpdate(floorImages[index].id, updatedImgList![index])}
                          >
                            {index - (selectedBuilding.floorsDown || 0)}층 도면 수정하기
                          </DefaultButton>
                        </FloorItem>
                      ))}
                      {Array.from({ length: selectedBuilding.floorsUp || 0 }).map((_, index) => (
                        <FloorItem key={index + (buildingDownFloorsCount || 0)}>
                          <div>{index + 1}층</div>
                          <FloorImageUploaderUI
                            index={index + (buildingDownFloorsCount || 0)}
                            imgPreview={imgPreview}
                            onImageChange={handleImageChange}
                          />
                          <DefaultButton
                            onClick={() =>
                              handleFloorImageUpdate(
                                floorImages[index + (buildingDownFloorsCount || 0)].id,
                                updatedImgList![index + (buildingDownFloorsCount || 0)],
                              )
                            }
                          >
                            {index + 1}층 도면 수정하기
                          </DefaultButton>
                        </FloorItem>
                      ))} */}
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
