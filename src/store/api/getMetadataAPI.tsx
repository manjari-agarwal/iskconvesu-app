import { axiosInstance } from '../axiosInstance';

export interface MetadataResponse {
  data: any;
  message: string;
}

export const fetchMetadata = async (): Promise<MetadataResponse> => {
  const response = await axiosInstance.get('/app/getMetadata/preLogin');
  return response.data;
};
