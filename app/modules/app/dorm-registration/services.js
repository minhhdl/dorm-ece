import Request from '../../../commons/utils/request';
import { ENDPOINT_DORM_REGISTRATIONS } from '../../../constants';

export const getDormRegistrations = async () => {
  const result = await Request.get(ENDPOINT_DORM_REGISTRATIONS);
  return result;
};

