import { Tr, Td } from '@chakra-ui/react';
import InputUI from '../../InputUI';
import { DefaultButton, CancelButton } from '../../ButtonUI';

interface AddModeProps {
  setIsAddClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddMode({ setIsAddClick }: AddModeProps) {
  const handleCategoryAdd = () => {
    // 실제 Add 요청
  };

  return (
    <Tr>
      <Td>
        <InputUI placeholder="추가할 카테고리 명을 작성해주세요." width="100%" />
      </Td>
      <Td>
        <InputUI placeholder="추가할 카테고리 설명을 작성해주세요." width="100%" />
      </Td>
      <Td>
        <DefaultButton onClick={() => handleCategoryAdd()} mr="5px">
          추가
        </DefaultButton>
        <CancelButton onClick={() => setIsAddClick(false)}>취소</CancelButton>
      </Td>
    </Tr>
  );
}

export default AddMode;
