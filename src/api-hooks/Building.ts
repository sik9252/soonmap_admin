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
  return useQuery(
    [`/admin/floor?buildingId=${params.buildingId}`, params.buildingId],
    () =>
      httpClient<IFloorQueryResponse>({
        method: 'GET',
        url: `/admin/floor?buildingId=${params.buildingId}`,
      }),
    { enabled: isEnabled },
  );
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

export function useUpdateBuildingRequest() {
  return useMutation((data: IBuildingData) =>
    httpClient<IEditBuildingResponse>({
      method: 'PATCH',
      url: `/admin/building/${data.id ? data.id : ''}`,
      data,
    }),
  );
}

export function useUpdateFloorImageRequest() {
  return useMutation((data: IFloorImage) => {
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
}

export function useDeleteBuildingRequest() {
  return useMutation((data: IBuildingData) =>
    httpClient<IEditBuildingResponse>({
      method: 'DELETE',
      url: `/admin/building/${data.id ? data.id : ''}`,
    }),
  );
}
