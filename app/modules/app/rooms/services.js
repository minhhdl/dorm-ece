import Request from '../../../commons/utils/request';
import { ENDPOINT_ROOMS } from '../../../constants';

export const getRooms = async () => {
  const result = await Request.get(ENDPOINT_ROOMS);
  return result;
};

export const addRoom = async (data) => {
  const result = await Request.post(ENDPOINT_ROOMS, data);
  return result;
};

export const updateRoom = async (id, data) => {
  const result = await Request.patch(`${ENDPOINT_ROOMS}/${id}`, data);
  return result;
};
