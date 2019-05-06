import Request from '../../../commons/utils/request';
import { ENDPOINT_REGISTER_DORM } from '../../../constants';

export const registerDorm = async (data) => {
  const result = await Request.post(ENDPOINT_REGISTER_DORM, data);
  return result;
};
