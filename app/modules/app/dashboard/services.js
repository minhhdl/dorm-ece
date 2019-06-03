import Request from '../../../commons/utils/request';
import { ENDPOINT_NOTIFICATIONS } from '../../../constants';

export const getNotifications = async (params) => {
  const result = await Request.get(ENDPOINT_NOTIFICATIONS, params);
  return result;
};

export const addNotication = async (data) => {
  const result = await Request.post(ENDPOINT_NOTIFICATIONS, data);
  return result;
};
