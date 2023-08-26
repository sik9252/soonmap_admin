import { useState, useEffect } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import InputUI from '../../InputUI';
import { DefaultButton, CancelButton } from '../../ButtonUI';
import { useCreateCategoryRequest, useGetCategoryRequest } from '../../../../api/InfoCategory';
import toast from 'react-hot-toast';

interface AddModeProps {
  setIsAddClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddMode({ setIsAddClick }: AddModeProps) {
  const { refetch: getCategoryRefetch } = useGetCategoryRequest({
    page: 0,
  });

  const {
    mutate: categoryCreateRequest,
    data: categoryCreateData,
    error: categoryCreateError,
    isLoading: categoryCreateLoading,
  } = useCreateCategoryRequest();

  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const handleCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleCategoryDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryDescription(e.target.value);
  };

  const handleCategoryAdd = () => {
    if (!categoryName || !categoryDescription) {
      toast.error('카테고리명과 설명은 필수값입니다.');
    } else {
      categoryCreateRequest({ typeName: categoryName, description: categoryDescription });
    }
  };

  useEffect(() => {
    if (categoryCreateData) {
      toast.success('카테고리 등록에 성공하였습니다.');
      setIsAddClick(false);
      void getCategoryRefetch();
    } else if (categoryCreateError) {
      toast.error((categoryCreateError as Error).message);
    }
  }, [categoryCreateData, categoryCreateError]);

  return (
    <Tr>
      <Td>
        <InputUI
          placeholder="추가할 카테고리 명을 작성해주세요."
          width="100%"
          onChange={handleCategoryName}
          maxLength={20}
        />
      </Td>
      <Td>
        <InputUI
          placeholder="추가할 카테고리 설명을 작성해주세요."
          width="100%"
          onChange={handleCategoryDescription}
          maxLength={50}
        />
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
