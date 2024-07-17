import React, { useEffect, useState } from 'react';
import { useSelectedBuildingAtom } from '../../../store/buildingAtom';
import { useGetFloorRequest, useUpdateBuildingRequest, useUpdateFloorImageRequest } from '../../../api-hooks/Building';
import { ModalProps } from '../../../@types/Modal';
import toast from 'react-hot-toast';

const useBuildingModifyModal = ({ isModalOpen, setIsModalOpen, currentPage, setCurrentPage }: ModalProps) => {
  const { selectedBuilding } = useSelectedBuildingAtom();

  const [buildingNumber, setBuildingNumber] = useState<string | undefined>('');
  const [buildingName, setBuildingName] = useState<string | undefined>('');
  const [buildingDescription, setBuildingDescription] = useState<string | undefined>('');
  const [buildingUpFloorsCount, setBuildingUpFloorsCount] = useState<number | undefined>(0);
  const [buildingDownFloorsCount, setBuildingDownFloorsCount] = useState<number | undefined>(0);
  const [buildingXpos, setBuildingXpos] = useState<number | undefined>(0);
  const [buildingYpos, setBuildingYpos] = useState<number | undefined>(0);
  const [imgPreview, setImgPreview] = useState<string[]>(Array(0).fill(''));
  const [updatedImgList, setUpdatedImgList] = useState<Blob[] | null>(Array(0).fill(null));

  useEffect(() => {
    setBuildingNumber(selectedBuilding.uniqueNumber);
    setBuildingName(selectedBuilding.name);
    setBuildingDescription(selectedBuilding.description);
    setBuildingUpFloorsCount(selectedBuilding.floorsUp);
    setBuildingDownFloorsCount(selectedBuilding.floorsDown);
    setBuildingXpos(selectedBuilding.latitude);
    setBuildingYpos(selectedBuilding.longitude);
  }, [selectedBuilding]);

  useEffect(() => {
    setImgPreview(Array((buildingUpFloorsCount || 0) + (buildingDownFloorsCount || 0)).fill(''));
    setUpdatedImgList(Array((buildingUpFloorsCount || 0) + (buildingDownFloorsCount || 0)).fill(''));
  }, [buildingUpFloorsCount, buildingDownFloorsCount]);

  const { floorImages, getFloorRefetch } = useGetFloorRequest(
    {
      buildingId: selectedBuilding.id ? selectedBuilding.id : 0,
    },
    false,
  );

  const { updateBuildingInfoRequest, updateBuildingInfoLoading } = useUpdateBuildingRequest(
    currentPage,
    setCurrentPage,
  );

  const { updateFloorImageRequest } = useUpdateFloorImageRequest(setCurrentPage);

  useEffect(() => {
    if (isModalOpen) void getFloorRefetch();
  }, [isModalOpen]);

  useEffect(() => {
    const floorImageList: string[] = [];

    floorImages?.forEach((image) => {
      if (image) {
        floorImageList.push(image.dir || '');
      }
    });

    setImgPreview(floorImageList);
  }, [floorImages]);

  const handleBuildingModifyModal = () => {
    setIsModalOpen(false);
  };

  const handleBuildingNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingNumber(e.target.value);
  };

  const handleBuildingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingName(e.target.value);
  };

  const handleBuildingDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingDescription(e.target.value);
  };

  const handleBuildingUpFloorsCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingUpFloorsCount(Number(e.target.value));
  };

  const handleBuildingDownFloorsCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingDownFloorsCount(Number(e.target.value));
  };

  const handleBuildingXpos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingXpos(Number(e.target.value));
  };

  const handleBuildingYpos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingYpos(Number(e.target.value));
  };

  const handleImageChange = (defaultIndex: number, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(index);
    e.preventDefault();

    const updatedImageList: Blob[] = [];

    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview((prevImgPreview) => [
          ...prevImgPreview.slice(0, defaultIndex),
          reader.result as string,
          ...prevImgPreview.slice(defaultIndex + 1),
        ]);
      };
      reader.readAsDataURL(e.target.files[0]);

      updatedImageList[defaultIndex] = e.target.files[0];
      setUpdatedImgList(updatedImageList);
    }
  };

  const handleBuildingInfoUpdateButton = () => {
    const data = {
      id: selectedBuilding.id,
      name: buildingName,
      floorsUp: buildingUpFloorsCount,
      floorsDown: buildingDownFloorsCount,
      description: buildingDescription,
      latitude: buildingXpos,
      longitude: buildingYpos,
      uniqueNumber: buildingNumber,
    };

    if (
      !buildingName ||
      !buildingUpFloorsCount ||
      !buildingDescription ||
      !buildingXpos ||
      !buildingYpos ||
      !buildingNumber
    ) {
      toast.error('모든 항목은 필수값입니다.');
    } else {
      updateBuildingInfoRequest({ ...data });
    }
  };

  const handleFloorImageUpdate = (floorId?: number, image?: Blob) => {
    updateFloorImageRequest({
      floorId: floorId,
      image: image,
    });
  };

  return {
    selectedBuilding,
    imgPreview,
    updatedImgList,
    handleBuildingModifyModal,
    handleBuildingNumber,
    handleBuildingName,
    handleBuildingDescription,
    handleBuildingUpFloorsCount,
    handleBuildingDownFloorsCount,
    handleBuildingXpos,
    handleBuildingYpos,
    handleImageChange,
    handleBuildingInfoUpdateButton,
    handleFloorImageUpdate,
    floorImages,
    updateBuildingInfoLoading,
  };
};

export default useBuildingModifyModal;
