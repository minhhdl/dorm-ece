import Request from '../../../commons/utils/request';
import { ENDPOINT_REGISTER_SERVICES } from '../../../constants';

export const registerServices = async (data) => {
  const result = await Request.post(ENDPOINT_REGISTER_SERVICES, data);
  return result;
};
