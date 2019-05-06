import Request from '../../../commons/utils/request';
import { ENDPOINT_DORM_REGISTRATIONS, ENDPOINT_ACTIVATE_DORM_REGISTRATIONS } from '../../../constants';

export const getDormRegistrations = async () => {
  const result = await Request.get(ENDPOINT_DORM_REGISTRATIONS);
  return result;
};

export const activateRegistration = async (regId) => {
  const result = await Request.put(ENDPOINT_ACTIVATE_DORM_REGISTRATIONS(regId));
  return result;
};
