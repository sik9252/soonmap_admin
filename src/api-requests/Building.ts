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

export function useGetBuildingRequest(params: IBuildingListRequest, isEnabled?: boolean) {
  return useQuery(
    [`/admin/building?page=${params.page}`, params],
    () =>
      httpClient<IBuildingListResponse>({
        method: 'GET',
        url: `/admin/building?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );
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
  return useMutation((data: IBuildingData) =>
    httpClient<IEditBuildingResponse>({
      method: 'POST',
      url: '/admin/building',
      data,
    }),
  );
}

export function useCreateFloorImageRequest() {
  return useMutation((data: IFloorImage) => {
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
