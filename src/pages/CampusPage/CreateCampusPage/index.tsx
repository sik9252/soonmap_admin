import { useState, useEffect } from 'react';
import RightContainer from '../../../components/layout/RightContainer';
import {
  SubTitle,
  SubContainer,
  LeftSection,
  RightSection,
  InputItem,
  FloorInputSection,
  FloorItem,
  Notice,
  ButtonSection,
} from './style';
import InputUI from '../../../components/ui/InputUI';
import { DefaultButton } from '../../../components/ui/ButtonUI';
import { FloorImageUploaderUI } from '../../../components/ui/FloorImageUploaderUI';
import toast from 'react-hot-toast';
import { useCreateBuildingRequest, useCreateFloorImageRequest } from '../../../api/Building';

function CreateCampusPage() {
  const {
    mutate: createBuildingRequest,
    data: createBuildingData,
    error: createBuildingError,
    isLoading: createBuildingLoading,
  } = useCreateBuildingRequest();

  const {
    mutate: createFloorImageRequest,
    data: createFloorImageData,
    error: createFloorImageError,
    isLoading: createFloorImageLoading,
  } = useCreateFloorImageRequest();

  // 기본 정보
  const [buildingNumber, setBuildingNumber] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [buildingDescription, setBuildingDescription] = useState('');
  const [buildingFloors, setBuildingNumberFloors] = useState(0);
  const [buildingXpos, setBuildingXpos] = useState(0);
  const [buildingYpos, setBuildingYpos] = useState(0);
  const [imgPreview, setImgPreview] = useState<string[]>(Array(0).fill(''));
  const [uploadedBuildingId, setUploadedBuildingId] = useState<number>(0);
  const [floorIndex, setFloorIndex] = useState(0);

  const handleBuildingNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingNumber(e.target.value);
  };

  const handleBuildingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingName(e.target.value);
  };

  const handleBuildingDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingDescription(e.target.value);
  };

  const handleBuildingFloors = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingNumberFloors(Number(e.target.value));
  };

  const handleBuildingXpos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingXpos(Number(e.target.value));
  };

  const handleBuildingYpos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingYpos(Number(e.target.value));
  };

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

      // 도면 삽입시 바로 api 요청
      createFloorImageRequest({
        buildingId: uploadedBuildingId,
        floorValue: index + 1,
        description: '',
        image: e.target.files[0],
      });

      setFloorIndex(index + 1);
    }
  };

  const handleBuildingInfoUploadButton = () => {
    // 건물 정보 등록 요청 api
    const data = {
      name: buildingName,
      floors: buildingFloors,
      description: buildingDescription,
      latitude: buildingXpos,
      longitude: buildingYpos,
      uniqueNumber: buildingNumber,
    };

    if (!buildingName || !buildingFloors || !buildingDescription || !buildingXpos || !buildingYpos || !buildingNumber) {
      toast.error('모든 항목은 필수값입니다.');
    } else {
      createBuildingRequest({ ...data });
    }
  };

  useEffect(() => {
    if (createBuildingData) {
      toast.success('건물 등록이 완료되었습니다.');
      setUploadedBuildingId(createBuildingData.data.id!);
    } else if (createBuildingError) {
      toast.error((createBuildingError as Error).message);
    }
  }, [createBuildingData, createBuildingError]);

  useEffect(() => {
    if (createFloorImageData) {
      toast.success(`${floorIndex}층 도면 등록이 완료되었습니다.`);
    } else if (createFloorImageError) {
      toast.error((createFloorImageError as Error).message);
    }
  }, [createFloorImageData, createFloorImageError]);

  return (
    <RightContainer title={'건물 및 강의실 업로드'}>
      <SubContainer>
        <LeftSection>
          <SubTitle>건물 정보 입력</SubTitle>
          <Notice>건물 정보를 먼저 등록한 후 도면을 업로드 해주세요.</Notice>
          <InputItem>
            <div>고유번호</div>
            <InputUI placeholder="건물의 고유번호를 입력해주세요." width="75%" onChange={handleBuildingNumber} />
          </InputItem>
          <InputItem>
            <div>이름</div>
            <InputUI placeholder="건물의 이름을 입력해주세요." width="75%" onChange={handleBuildingName} />
          </InputItem>
          <InputItem>
            <div>정보</div>
            <InputUI placeholder="건물의 정보를 입력해주세요." width="75%" onChange={handleBuildingDescription} />
          </InputItem>
          <InputItem>
            <div>총 층수</div>
            <InputUI
              placeholder="건물의 총 층수를 입력해주세요.(20층 이하)"
              width="75%"
              onChange={handleBuildingFloors}
            />
          </InputItem>
          <InputItem>
            <div>X 좌표</div>
            <InputUI placeholder="건물의 X 좌표를 입력해주세요." width="75%" onChange={handleBuildingXpos} />
          </InputItem>
          <InputItem>
            <div>Y 좌표</div>
            <InputUI placeholder="건물의 Y 좌표를 입력해주세요." width="75%" onChange={handleBuildingYpos} />
          </InputItem>
          <ButtonSection>
            <DefaultButton
              onClick={() => handleBuildingInfoUploadButton()}
              isLoading={createBuildingLoading}
              loadingText="건물 정보 등록 중"
            >
              건물 정보 등록하기
            </DefaultButton>
          </ButtonSection>
        </LeftSection>
        <RightSection>
          <SubTitle>층별 도면 업로드</SubTitle>
          <FloorInputSection>
            <div>설정한 층 수가 보이지 않는다면 아래로 스크롤해주세요.</div>
            {buildingFloors <= 20 ? (
              <>
                {Array.from({ length: buildingFloors }).map((_, index) => (
                  <FloorItem key={index}>
                    <div>{index + 1}층</div>
                    <FloorImageUploaderUI index={index} imgPreview={imgPreview} onImageChange={handleImageChange} />
                  </FloorItem>
                ))}
              </>
            ) : (
              ''
            )}
          </FloorInputSection>
        </RightSection>
      </SubContainer>
    </RightContainer>
  );
}

export default CreateCampusPage;
