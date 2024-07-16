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
import useCreateCampus from './useCreateCampus';

function CreateCampusPage() {
  const {
    isCreateBuildingLoading,
    imgPreview,
    buildingUpFloorsCount,
    buildingDownFloorsCount,
    handleBuildingNumber,
    handleBuildingName,
    handleBuildingDescription,
    handleBuildingUpFloorsCount,
    handleBuildingDownFloorsCount,
    handleBuildingXpos,
    handleBuildingYpos,
    handleImageChange,
    handleBuildingInfoUploadButton,
    handleBuildingAndFloorUpload,
  } = useCreateCampus();

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
              isLoading={isCreateBuildingLoading}
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
