import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateBuildingRequest, useCreateFloorImageRequest } from '../../../api-requests/Building';
import toast from 'react-hot-toast';

const useCreateCampus = () => {
  const navigate = useNavigate();

  const [floorIndex, setFloorIndex] = useState(0);

  const { createBuildingRequest, isCreateBuildingLoading, uploadedBuildingId } = useCreateBuildingRequest();
  const { createFloorImageRequest } = useCreateFloorImageRequest(floorIndex);

  // 기본 정보
  const [buildingNumber, setBuildingNumber] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [buildingDescription, setBuildingDescription] = useState('');
  const [buildingUpFloorsCount, setBuildingUpFloorsCount] = useState(0);
  const [buildingDownFloorsCount, setBuildingDownFloorsCount] = useState(0);
  const [buildingXpos, setBuildingXpos] = useState(0);
  const [buildingYpos, setBuildingYpos] = useState(0);
  const [imgPreview, setImgPreview] = useState<string[]>(Array(0).fill(''));

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
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setBuildingUpFloorsCount(Number(onlyNumber));
  };

  const handleBuildingDownFloorsCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setBuildingDownFloorsCount(Number(onlyNumber));
  };

  const handleBuildingXpos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingXpos(Number(e.target.value));
  };

  const handleBuildingYpos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingYpos(Number(e.target.value));
  };

  useEffect(() => {
    setImgPreview(Array(buildingUpFloorsCount + buildingDownFloorsCount).fill(''));
  }, [buildingUpFloorsCount, buildingDownFloorsCount]);

  const handleImageChange = (defaultIndex: number, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

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

      // 도면 삽입시 바로 api 요청
      createFloorImageRequest({
        buildingId: uploadedBuildingId,
        floorValue: index,
        description: '',
        image: e.target.files[0],
      });

      console.log(index);
      setFloorIndex(index);
    }
  };

  const handleBuildingInfoUploadButton = () => {
    // 건물 정보 등록 요청 api
    const data = {
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
      createBuildingRequest({ ...data });
    }
  };

  const handleBuildingAndFloorUpload = () => {
    toast.success(`건물 정보 및 도면 업로드에 성공하였습니다.`);
    navigate('/campus/manage');
  };

  return {
    floorIndex,
    setFloorIndex,
    isCreateBuildingLoading,
    buildingUpFloorsCount,
    buildingDownFloorsCount,
    imgPreview,
    handleBuildingNumber,
    handleBuildingName,
    handleBuildingDescription,
    handleBuildingUpFloorsCount,
    handleBuildingDownFloorsCount,
    handleBuildingXpos,
    handleBuildingYpos,
    handleImageChange,
    handleBuildingInfoUploadButton,
    handleBuildingAndFloorUpload,
  };
};

export default useCreateCampus;
