import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelectedBuildingAtom } from '../../../store/buildingAtom';
import { useGetBuildingRequest } from '../../../api-requests/Building';
import { IBuildingData } from '../../../@types/Building';

const useCampusManage = () => {
  const path = useLocation();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [location, setLocation] = useState('');

  const { selectedBuilding, setSelectedBuilding } = useSelectedBuildingAtom();

  const { buildingList, totalPosts } = useGetBuildingRequest({ page: currentPage - 1 });

  const handleAlertDialog = (building: IBuildingData) => {
    if (path.pathname === '/campus/manage') {
      setLocation('건물');
    }

    setSelectedBuilding(building);
    setIsAlertOpen(true);
  };

  const handleBuildingModifyModal = (building: IBuildingData) => {
    if (path.pathname === '/campus/manage') {
      setLocation('건물');
    }

    setSelectedBuilding(building);
    setIsModalOpen(true);
  };

  return {
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
  };
};

export default useCampusManage;
