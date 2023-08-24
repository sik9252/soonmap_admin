import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Td, Th, TableContainer } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import RightContainer from '../../../components/layout/RightContainer';
import AlertDialogModal from '../../../components/features/AlertDialogModal';
import BuildingModifyModal from '../../../components/features/BuildingModifyModal';
import Pagination from '../../../components/features/Pagination';
import { useSelectedBuildingAtom } from '../../../store/buildingAtom';
import toast from 'react-hot-toast';
import { BuildingDataType, useGetBuildingRequest } from '../../../api/Building';

function CampusManagePage() {
  const path = useLocation();
  const [location, setLocation] = useState('');
  const { selectedBuilding, setSelectedBuilding } = useSelectedBuildingAtom();

  const [buildingList, setBuildingList] = useState<BuildingDataType[] | null>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: getBuildingResult, isError: getBuildingError } = useGetBuildingRequest({ page: currentPage - 1 });

  useEffect(() => {
    if (getBuildingResult) {
      setBuildingList(getBuildingResult?.data.buildingResponseDtoList);
      setTotalPosts(getBuildingResult?.data.totalPage);
    } else if (getBuildingError) {
      toast.error('건물 목록을 불러오는데 실패했습니다.');
    }
  }, [getBuildingResult, getBuildingError]);

  const handleAlertDialog = (building: BuildingDataType) => {
    if (path.pathname === '/campus/manage') {
      setLocation('건물');
    }

    setSelectedBuilding(building);
    setIsAlertOpen(true);
  };

  const handleBuildingModifyModal = (building: BuildingDataType) => {
    if (path.pathname === '/campus/manage') {
      setLocation('건물');
    }

    setSelectedBuilding(building);
    setIsModalOpen(true);
  };

  return (
    <RightContainer title={'건물 및 강의실 관리'}>
      <BuildingModifyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <AlertDialogModal
        location={location}
        selectedItemIndex={selectedBuilding.id}
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
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
