import { useEffect, useState } from 'react';
import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  IBuildingData,
  IBuildingListRequest,
  IBuildingListResponse,
  IEditBuildingResponse,
  IFloorImage,
  IFloorQueryRequest,
  IFloorQueryResponse,
} from '../@types/Building';
import toast from 'react-hot-toast';
import { useSelectedBuildingAtom } from '../store/buildingAtom';

export function useGetBuildingRequest(params: IBuildingListRequest, isEnabled?: boolean) {
  const [buildingList, setBuildingList] = useState<IBuildingData[] | null>([]);
  const [totalPosts, setTotalPosts] = useState(1);

  const {
    data,
    error,
    refetch: getBuildingRefetch,
  } = useQuery(
    [`/admin/building?page=${params.page}`, params],
    () =>
      httpClient<IBuildingListResponse>({
        method: 'GET',
        url: `/admin/building?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );

  useEffect(() => {
    if (data) {
      setBuildingList(data?.data.buildingResponseDtoList);
      setTotalPosts(data?.data.totalPage);
    } else if (error) {
      toast.error('건물 목록을 불러오는데 실패했습니다.');
    }
  }, [data, error]);

  return { buildingList, totalPosts, getBuildingRefetch };
}

export function useGetFloorRequest(params: IFloorQueryRequest, isEnabled?: boolean) {
  const [floorImages, setFloorImages] = useState<IFloorQueryResponse[] | null>([]);

  const {
    data,
    error,
    refetch: getFloorRefetch,
  } = useQuery(
    [`/admin/floor?buildingId=${params.buildingId}`, params.buildingId],
    () =>
      httpClient<IFloorQueryResponse>({
        method: 'GET',
        url: `/admin/floor?buildingId=${params.buildingId}`,
      }),
    { enabled: isEnabled },
  );

  useEffect(() => {
    if (data) {
      setFloorImages(data?.data as IFloorQueryResponse[] | null);
    } else if (error) {
      toast.error('건물 목록을 불러오는데 실패했습니다.');
    }
  }, [data, error]);

  return {
    floorImages,
    getFloorRefetch,
  };
}

export function useCreateBuildingRequest() {
  const [uploadedBuildingId, setUploadedBuildingId] = useState<number>(0);

  const {
    mutate: createBuildingRequest,
    data,
    error,
    isLoading: isCreateBuildingLoading,
  } = useMutation((data: IBuildingData) =>
    httpClient<IEditBuildingResponse>({
      method: 'POST',
      url: '/admin/building',
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('건물 등록이 완료되었습니다.');
      setUploadedBuildingId(data.data.id!);
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return {
    createBuildingRequest,
    isCreateBuildingLoading,
    uploadedBuildingId,
  };
}

export function useCreateFloorImageRequest(floorIndex: number) {
  const {
    mutate: createFloorImageRequest,
    data,
    error,
  } = useMutation((data: IFloorImage) => {
    const formData = new FormData();
    formData.append('image', data.image ? data.image : '');
    return httpClient<string>(
      {
        method: 'POST',
        url: `/admin/floor/${data.buildingId ? data.buildingId : ''}?floorValue=${
          data.floorValue ? data.floorValue : ''
        }`,
        data: formData,
      },
      {
        'content-': 'multipart/form-data',
      },
    );
  });

  useEffect(() => {
    if (data) {
      toast.success(`${floorIndex}층 도면 등록이 완료되었습니다.`);
    } else if (error) {
      toast.error('건물 정보를 먼저 등록해주세요.');
    }
  }, [data, error]);

  return { createFloorImageRequest };
}

export function useUpdateBuildingRequest(
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
) {
  const { getBuildingRefetch } = useGetBuildingRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const {
    mutate: updateBuildingInfoRequest,
    data,
    error,
    isLoading: updateBuildingInfoLoading,
  } = useMutation((data: IBuildingData) =>
    httpClient<IEditBuildingResponse>({
      method: 'PATCH',
      url: `/admin/building/${data.id ? data.id : ''}`,
      data,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('건물 정보 수정이 완료되었습니다.');
      void getBuildingRefetch();
      setCurrentPage(1);
    } else if (error) {
      toast.error((error as Error).message);
    }
  }, [data, error]);

  return {
    updateBuildingInfoRequest,
    updateBuildingInfoLoading,
  };
}

export function useUpdateFloorImageRequest(setCurrentPage: React.Dispatch<React.SetStateAction<number>>) {
  const {
    mutate: updateFloorImageRequest,
    data,
    error,
  } = useMutation((data: IFloorImage) => {
    const formData = new FormData();
    formData.append('image', data.image ? data.image : '');

    return httpClient<string>(
      {
        method: 'PATCH',
        url: `/admin/floor/${data.floorId ? data.floorId : ''}`,
        data: formData,
      },
      {
        'content-': 'multipart/form-data',
      },
    );
  });

  useEffect(() => {
    if (data) {
      toast.success('도면 수정이 완료되었습니다.');
      setCurrentPage(1);
    } else if (error) {
      toast.error('수정할 이미지가 등록되지 않았습니다.');
    }
  }, [data, error]);

  return {
    updateFloorImageRequest,
  };
}

export function useDeleteBuildingRequest(
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { resetBuildingAtom } = useSelectedBuildingAtom();
  const { getBuildingRefetch } = useGetBuildingRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  const {
    mutate: deleteBuildingRequest,
    data,
    error,
  } = useMutation((data: IBuildingData) =>
    httpClient<IEditBuildingResponse>({
      method: 'DELETE',
      url: `/admin/building/${data.id ? data.id : ''}`,
    }),
  );

  useEffect(() => {
    if (data) {
      toast.success('건물이 삭제되었습니다.');
      void getBuildingRefetch();
      setCurrentPage(1);
      resetBuildingAtom();
    } else if (error) {
      toast.error((error as Error).message);
    }
    setIsAlertOpen(false);
  }, [data, error]);

  return {
    deleteBuildingRequest,
  };
}
