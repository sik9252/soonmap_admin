import { Table, Thead, Tbody, Tr, Td, Th, TableContainer } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import RightContainer from '../../../components/layout/RightContainer';
import AlertDialogModal from '../../../components/features/AlertDialogModal';
import BuildingModifyModal from '../../../components/features/BuildingModifyModal';
import Pagination from '../../../components/features/Pagination';
import useCampusManage from './useCampusManage';

function CampusManagePage() {
  const {
    location,
    selectedBuilding,
    currentPage,
    setCurrentPage,
    isAlertOpen,
    setIsAlertOpen,
    isModalOpen,
    setIsModalOpen,
    buildingList,
    totalPosts,
    handleAlertDialog,
    handleBuildingModifyModal,
  } = useCampusManage();

  return (
    <RightContainer title={'건물 및 강의실 관리'}>
      <BuildingModifyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <AlertDialogModal
        location={location}
        selectedItemIndex={selectedBuilding.id}
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>건물 고유번호</Th>
              <Th>건물 명</Th>
              <Th>건물 정보</Th>
              <Th>건물 층 수</Th>
              <Th>편집 도구</Th>
            </Tr>
          </Thead>
          <Tbody>
            {buildingList &&
              buildingList.map((building) => (
                <Tr key={building.id}>
                  <Td width="5%">{building.uniqueNumber}</Td>
                  <Td width="20%">{building.name}</Td>
                  <Td width="45%">{building.description}</Td>
                  <Td width="15%">{(building.floorsUp || 0) + (building.floorsDown || 0)} 층</Td>
                  <Td width="10%">
                    <EditIcon mr="10px" cursor={'pointer'} onClick={() => handleBuildingModifyModal(building)} />
                    <DeleteIcon cursor={'pointer'} onClick={() => handleAlertDialog(building)} />
                  </Td>
                </Tr>
              ))}
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

export default CampusManagePage;
