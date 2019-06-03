import Request from '../../../commons/utils/request';
import { ENDPOINT_ROOMS, ENDPOINT_REGISTER_DORM } from '../../../constants';

export const getRooms = async (params) => {
  const result = await Request.get(ENDPOINT_ROOMS, { ...params });
  return result;
};

export const registerDorm = async (data) => {
  const result = await Request.post(ENDPOINT_REGISTER_DORM, data);
  return result;
};
