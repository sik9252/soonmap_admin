import { Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import RightContainer from '../../../components/layout/RightContainer';
import AlertDialogModal from '../../../components/features/AlertDialogModal';
import CategoryInput from '../../../components/ui/CategoryUI/CategoryInput';
import Pagination from '../../../components/features/Pagination';
import AddMode from '../../../components/ui/CategoryUI/AddMode';
import useInfoCategoryManage from './useInfoCategoryManage';

function InfoCategoryManage() {
  const {
    isAddClick,
    setIsAddClick,
    isAlertOpen,
    setIsAlertOpen,
    location,
    selectedItemIndex,
    currentPage,
    setCurrentPage,
    categoryList,
    totalPosts,
    handleCategoryAddButton,
    handleAlertDialog,
  } = useInfoCategoryManage();

  return (
    <RightContainer title={'정보 게시판 카테고리 관리'}>
      <AlertDialogModal
        location={location}
        selectedItemIndex={selectedItemIndex}
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
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
                  handleAlertDialog={() => handleAlertDialog(category.id!)}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
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
