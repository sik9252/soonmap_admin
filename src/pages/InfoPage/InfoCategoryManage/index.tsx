import { useState } from 'react';
import { Container, PageTitle } from './style';
import { Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import AlertDialogUI from '../../../components/AlertDialogUI';
import CategoryInput from '../../../components/CategoryUI/CategoryInput';
import AddMode from '../../../components/CategoryUI/AddMode';

function InfoCategoryManage() {
  const [categoryList, setCategoryList] = useState([
    {
      id: 1,
      categoryName: '이벤트',
      categoryDescription: '이벤트 관련 게시글 작성',
    },
    {
      id: 2,
      categoryName: '축제',
      categoryDescription: '축제 관련 게시글 작성',
    },
    {
      id: 3,
      categoryName: '동아리',
      categoryDescription: '동아리 관련 게시글 작성',
    },
    {
      id: 4,
      categoryName: '기타',
      categoryDescription: '기타 게시글 작성',
    },
  ]);

  const [isAddClick, setIsAddClick] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleCategoryAddButton = () => {
    setIsAddClick(true);
  };

  const handleAlertDialog = () => {
    setIsAlertOpen(true);
  };

  return (
    <Container>
      <PageTitle>정보 게시판 카테고리 관리</PageTitle>
      <AlertDialogUI isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} />
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
                <CategoryInput category={category} handleAlertDialog={handleAlertDialog} />
              ))}
            {isAddClick ? <AddMode setIsAddClick={setIsAddClick} /> : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default InfoCategoryManage;
