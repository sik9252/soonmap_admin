import { Tr, Td } from '@chakra-ui/react';
import { CategoryItem } from '../CategoryInput';
import InputUI from '../../InputUI';
import { DefaultButton, CancelButton } from '../../ButtonUI';

type TodoItemEditorProps = {
  category: CategoryItem;
  onChangeViewMode: () => void;
};

function EditMode({ category, onChangeViewMode }: TodoItemEditorProps) {
  const handleModify = () => {
    // 실제 수정 요청
  };

  return (
    <Tr>
      <Td>
        <InputUI placeholder={category.categoryName} width="100%" />
      </Td>
      <Td>
        <InputUI placeholder={category.categoryDescription} width="100%" />
      </Td>
      <Td>
        <DefaultButton onClick={() => handleModify()} mr="5px">
          수정
        </DefaultButton>
        <CancelButton onClick={onChangeViewMode}>취소</CancelButton>
      </Td>
    </Tr>
  );
}

export default EditMode;
