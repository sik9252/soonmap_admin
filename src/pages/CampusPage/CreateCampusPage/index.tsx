import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useCreateBuildingRequest, useCreateFloorImageRequest } from '../../../api-requests/Building';

function CreateCampusPage() {
  const navigate = useNavigate();

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
  const [buildingUpFloorsCount, setBuildingUpFloorsCount] = useState(0);
  const [buildingDownFloorsCount, setBuildingDownFloorsCount] = useState(0);
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

  const handleBuildingUpFloorsCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setBuildingUpFloorsCount(Number(onlyNumber));
  };

  const handleBuildingDownFloorsCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setBuildingDownFloorsCount(Number(onlyNumber));
  };

  const handleBuildingXpos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingXpos(Number(e.target.value));
  };

  const handleBuildingYpos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingYpos(Number(e.target.value));
  };

  useEffect(() => {
    setImgPreview(Array(buildingUpFloorsCount + buildingDownFloorsCount).fill(''));
  }, [buildingUpFloorsCount, buildingDownFloorsCount]);

  const handleImageChange = (defaultIndex: number, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

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

      // 도면 삽입시 바로 api 요청
      createFloorImageRequest({
        buildingId: uploadedBuildingId,
        floorValue: index,
        description: '',
        image: e.target.files[0],
      });

      console.log(index);
      setFloorIndex(index);
    }
  };

  const handleBuildingInfoUploadButton = () => {
    // 건물 정보 등록 요청 api
    const data = {
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
      toast.error('건물 정보를 먼저 등록해주세요.');
    }
  }, [createFloorImageData, createFloorImageError]);

  const handleBuildingAndFloorUpload = () => {
    toast.success(`건물 정보 및 도면 업로드에 성공하였습니다.`);
    navigate('/campus/manage');
  };

  return (
    <RightContainer title={'건물 및 강의실 업로드'}>
      <SubContainer>
        <LeftSection>
          <SubTitle>건물 정보 입력</SubTitle>
          <Notice>건물 정보를 먼저 등록한 후 도면을 업로드 해주세요.</Notice>
          <Notice>도면을 모두 업로드 한 후 도면 업로드 완료하기 버튼을 누르면 최종 건물 등록이 완료됩니다.</Notice>
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
            <InputUI placeholder="지상 층수 (<= 20)" width="36.5%" onChange={handleBuildingUpFloorsCount} />
            <div style={{ width: '1px' }}></div>
            <InputUI placeholder="지하 층수 (<= 10)" width="36.5%" onChange={handleBuildingDownFloorsCount} />
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
            <DefaultButton onClick={() => handleBuildingAndFloorUpload()}>도면 업로드 완료하기</DefaultButton>
          </ButtonSection>
        </LeftSection>
        <RightSection>
          <SubTitle>층별 도면 업로드</SubTitle>
          <FloorInputSection>
            <div>설정한 층 수가 보이지 않는다면 아래로 스크롤해주세요.</div>
            {Array.from({ length: buildingUpFloorsCount + buildingDownFloorsCount }).map((_, index) => (
              <FloorItem key={index + buildingDownFloorsCount}>
                <div>
                  {index - buildingDownFloorsCount >= 0
                    ? index - buildingDownFloorsCount + 1
                    : index - buildingDownFloorsCount}
                  층
                </div>
                <FloorImageUploaderUI
                  defaultIndex={index}
                  index={
                    index - buildingDownFloorsCount >= 0
                      ? index - buildingDownFloorsCount + 1
                      : index - buildingDownFloorsCount
                  }
                  imgPreview={imgPreview}
                  onImageChange={handleImageChange}
                />
              </FloorItem>
            ))}
          </FloorInputSection>
        </RightSection>
      </SubContainer>
    </RightContainer>
  );
}

export default CreateCampusPage;
