import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import RightContainer from '../../../components/layout/RightContainer';
import AlertDialogModal from '../../../components/features/AlertDialogModal';
import CategoryInput from '../../../components/ui/CategoryUI/CategoryInput';
import Pagination from '../../../components/features/Pagination';
import AddMode from '../../../components/ui/CategoryUI/AddMode';
import { useGetCategoryRequest } from '../../../api/InfoCategory';
import toast from 'react-hot-toast';

interface CategoryType {
  id: number;
  typeName: string;
  description: string;
}

function InfoCategoryManage() {
  const {
    mutate: categoryGetRequest,
    data: categoryGetData,
    error: categoryGetError,
    isLoading: categoryGetLoading,
  } = useGetCategoryRequest();

  const [categoryList, setCategoryList] = useState<CategoryType[] | null>([]);
  const [isAddClick, setIsAddClick] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);

  useEffect(() => {
    categoryGetRequest(currentPage - 1);
  }, [currentPage, isAddClick, isAlertOpen]);

  useEffect(() => {
    if (categoryGetData) {
      setCategoryList(categoryGetData?.data.articleTypeList);
      setTotalPosts(categoryGetData?.data.totalPage);
    } else if (categoryGetError) {
      toast.error((categoryGetError as Error).message);
    }
  }, [categoryGetData, categoryGetError]);

  const handleCategoryAddButton = () => {
    setIsAddClick(true);
  };

  const handleAlertDialog = (categoryId: number) => {
    setLocation('카테고리');
    setSelectedItemIndex(categoryId);
    setIsAlertOpen(true);
  };

  return (
    <RightContainer title={'정보 게시판 카테고리 관리'}>
      <AlertDialogModal
        location={location}
        selectedItemIndex={selectedItemIndex}
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
      />
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            <PlusSquareIcon w={8} h={8} cursor={'pointer'} onClick={() => handleCategoryAddButton()} />
          </TableCaption>
          <Thead>
            <Tr>
              <Th>카테고리 명</Th>
              <Th>카테고리 설명</Th>
              <Th>편집 도구</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categoryList &&
              categoryList.map((category) => (
                <CategoryInput
                  key={category.id}
                  category={category}
                  handleAlertDialog={() => handleAlertDialog(category.id)}
                />
              ))}
            {isAddClick ? <AddMode setIsAddClick={setIsAddClick} /> : null}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        totalPosts={totalPosts * 10}
        postPerPages={10}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </RightContainer>
  );
}

export default InfoCategoryManage;
