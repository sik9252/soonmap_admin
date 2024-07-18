interface IBuildingData {
  id?: number;
  name?: string;
  floorsUp?: number;
  floorsDown?: number;
  description?: string;
  latitude?: number;
  longitude?: number;
  uniqueNumber?: string;
}

interface IEditBuildingResponse extends IBuildingData {
  success: boolean;
}

interface IFloorImage {
  buildingId?: number;
  description?: string;
  floorValue?: number;
  image?: Blob;
  floorId?: number;
}

interface FloorImageResponse extends IFloorImage {
  dir: string;
  uniqueNumber: string;
}

interface IBuildingListRequest {
  page: number;
}

interface IBuildingListResponse {
  totalPage: number;
  buildingResponseDtoList: [];
}

interface IFloorQueryRequest {
  buildingId: number;
}

interface IFloorQueryResponse {
  id?: number;
  description?: string;
  dir?: string;
  floorValue?: number;
  uniqueNumber?: string;
}

export type {
  IBuildingData,
  IEditBuildingResponse,
  IFloorImage,
  FloorImageResponse,
  IBuildingListRequest,
  IBuildingListResponse,
  IFloorQueryRequest,
  IFloorQueryResponse,
};
