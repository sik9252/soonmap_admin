import { useState } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import InputUI from '../../InputUI';
import { DefaultButton, CancelButton } from '../../ButtonUI';
import { useUpdateCategoryRequest } from '../../../../api-hooks/InfoCategory';
import toast from 'react-hot-toast';
import { ICategoryData } from '../../../../@types/InfoCategory';

type TodoItemEditorProps = {
  category: ICategoryData;
  onChangeViewMode: () => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function EditMode({ category, onChangeViewMode, currentPage, setCurrentPage }: TodoItemEditorProps) {
  const { categoryUpdateRequest } = useUpdateCategoryRequest(currentPage, setCurrentPage, onChangeViewMode);

  const [categoryName, setCategoryName] = useState(category.typeName);
  const [categoryDescription, setCategoryDescription] = useState(category.description);

  const handleCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleCategoryDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryDescription(e.target.value);
  };

  const handleUpdate = () => {
    const data = {
      id: category.id,
      typeName: categoryName,
      description: categoryDescription,
    };

    if (!categoryName || !categoryDescription) {
      toast.error('카테고리명과 설명은 필수값입니다.');
    } else {
      categoryUpdateRequest({ ...data });
    }
  };

  return (
    <Tr>
      <Td>
        <InputUI
          placeholder={category.typeName}
          width="100%"
          onChange={handleCategoryName}
          defaultValue={category.typeName}
          maxLength={20}
        />
      </Td>
      <Td>
        <InputUI
          placeholder={category.description}
          width="100%"
          onChange={handleCategoryDescription}
          defaultValue={category.description}
          maxLength={50}
        />
      </Td>
      <Td>
        <DefaultButton onClick={() => handleUpdate()} mr="5px">
          수정
        </DefaultButton>
        <CancelButton onClick={onChangeViewMode}>취소</CancelButton>
      </Td>
    </Tr>
  );
}

export default EditMode;
