import { useState } from 'react';
import RightContainer from '../../../components/layout/RightContainer';
import { SubTitle, SubContainer, LeftSection, RightSection, InputItem, FloorInputSection, FloorItem } from './style';
import InputUI from '../../../components/ui/InputUI';
import { DefaultButton } from '../../../components/ui/ButtonUI';
import { FloorImageUploaderUI } from '../../../components/ui/FloorImageUploaderUI';

function CreateCampusPage() {
  const [floorCount, setFloorCount] = useState(5);

  const handleUploadButton = () => {
    //
  };

  const [imgPreview, setImgPreview] = useState<string[]>(Array(floorCount).fill(''));

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
    <RightContainer title={'건물 및 강의실 업로드'}>
      <SubContainer>
        <LeftSection>
          <SubTitle>건물 정보 입력</SubTitle>
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
          <DefaultButton onClick={() => handleUploadButton()}>건물 등록하기</DefaultButton>
        </LeftSection>
        <RightSection>
          <SubTitle>층별 도면 업로드</SubTitle>
          <FloorInputSection>
            <div>설정한 층 수가 보이지 않는다면 아래로 스크롤해주세요.</div>
            {Array.from({ length: floorCount }).map((_, index) => (
              <FloorItem key={index}>
                <div>{index + 1}층</div>
                <FloorImageUploaderUI
                  floorCount={floorCount}
                  index={index}
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
