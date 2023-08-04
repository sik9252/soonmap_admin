import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Td, Th, TableContainer } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import RightContainer from '../../../components/layout/RightContainer';
import AlertDialogModal from '../../../components/features/AlertDialogModal';
import BuildingModifyModal from '../../../components/features/BuildingModifyModal';

function CampusManagePage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [buildingList, setBuildingList] = useState([
    {
      id: 1,
      unique_num: 9,
      name: '공학관',
      floors: 4,
      description: '공학관 주소',
      x: 36.123413,
      y: 126.343415,
    },
    {
      id: 2,
      unique_num: 9,
      name: '인문관',
      floors: 5,
      description: '인문관 주소',
      x: 36.123413,
      y: 126.343415,
    },
    {
      id: 3,
      unique_num: 9,
      name: '자연과학관',
      floors: 6,
      description: '자연과학관 주소',
      x: 36.123413,
      y: 126.343415,
    },
    {
      id: 4,
      unique_num: 9,
      name: '유니토피아',
      floors: 11,
      description: '유니토피아 주소',
      x: 36.123413,
      y: 126.343415,
    },
  ]);

  const [selectedBuilding, setSelectedBuilding] = useState({});

  const handleAlertDialog = () => {
    setIsAlertOpen(true);
  };

  const handleBuildingModifyModal = (buildingId: number) => {
    setSelectedBuilding(buildingId);
    setIsModalOpen(true);
  };

  return (
    <RightContainer title={'건물 및 강의실 관리'}>
      <BuildingModifyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedBuilding={selectedBuilding}
      />
      <AlertDialogModal isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>건물 명</Th>
              <Th>건물 정보</Th>
              <Th>건물 층 수</Th>
              <Th>편집 도구</Th>
            </Tr>
          </Thead>
          <Tbody>
            {buildingList &&
              buildingList.map((building) => (
                <Tr>
                  <Td width="25%">{building.name}</Td>
                  <Td width="45%">{building.description}</Td>
                  <Td width="15%">{building.floors} 층</Td>
                  <Td width="10%">
                    <EditIcon mr="10px" cursor={'pointer'} onClick={() => handleBuildingModifyModal(building.id)} />
                    <DeleteIcon cursor={'pointer'} onClick={handleAlertDialog} />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </RightContainer>
  );
}

export default CampusManagePage;
