import { httpClient } from '.';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface BuildingDataType {
  id?: number;
  name?: string;
  floors?: number;
  description?: string;
  latitude?: number;
  longitude?: number;
  uniqueNumber?: string;
}

export interface BuildingResponseType extends BuildingDataType {
  success: boolean;
}

export interface FloorImageType {
  buildingId?: number;
  description?: string;
  floorValue?: number;
  image?: Blob;
  floorId?: number;
}

export interface FloorImageResponseType extends FloorImageType {
  dir: string;
  uniqueNumber: string;
}

export interface BuildingQueryRequestType {
  page: number;
}

export interface BuildingQueryResponseType {
  totalPage: number;
  buildingResponseDtoList: [];
}

export interface FloorQueryRequestType {
  buildingId: number;
}

export interface FloorQueryResponseType {
  id?: number;
  description?: string;
  dir?: string;
  floorValue?: number;
  uniqueNumber?: string;
}

export function useGetBuildingRequest(params: BuildingQueryRequestType, isEnabled?: boolean) {
  return useQuery(
    [`/admin/building?page=${params.page}`, params],
    () =>
      httpClient<BuildingQueryResponseType>({
        method: 'GET',
        url: `/admin/building?page=${params.page}`,
      }),
    { enabled: isEnabled },
  );
}

export function useGetFloorRequest(params: FloorQueryRequestType, isEnabled?: boolean) {
  return useQuery(
    [`/admin/floor?buildingId=${params.buildingId}`, params.buildingId],
    () =>
      httpClient<FloorQueryResponseType>({
        method: 'GET',
        url: `/admin/floor?buildingId=${params.buildingId}`,
      }),
    { enabled: isEnabled },
  );
}

export function useCreateBuildingRequest() {
  return useMutation((data: BuildingDataType) =>
    httpClient<BuildingResponseType>({
      method: 'POST',
      url: '/admin/building',
      data,
    }),
  );
}

export function useCreateFloorImageRequest() {
  return useMutation((data: FloorImageType) => {
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
        'content-type': 'multipart/form-data',
      },
    );
  });
}

export function useUpdateBuildingRequest() {
  return useMutation((data: BuildingDataType) =>
    httpClient<BuildingResponseType>({
      method: 'PATCH',
      url: `/admin/building/${data.id ? data.id : ''}`,
      data,
    }),
  );
}

export function useUpdateFloorImageRequest() {
  return useMutation((data: FloorImageType) => {
    const formData = new FormData();
    formData.append('image', data.image ? data.image : '');

    return httpClient<string>(
      {
        method: 'PATCH',
        url: `/admin/floor/${data.floorId ? data.floorId : ''}`,
        data: formData,
      },
      {
        'content-type': 'multipart/form-data',
      },
    );
  });
}

export function useDeleteBuildingRequest() {
  return useMutation((data: BuildingDataType) =>
    httpClient<BuildingResponseType>({
      method: 'DELETE',
      url: `/admin/building/${data.id ? data.id : ''}`,
    }),
  );
}
