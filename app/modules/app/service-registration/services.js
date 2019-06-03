import Request from '../../../commons/utils/request';
import { ENDPOINT_SERVICE_REGISTRATIONS, ENDPOINT_ACTIVATE_SERVICE_REGISTRATIONS, ENDPOINT_REJECT_SERVICE_REGISTRATIONS } from '../../../constants';

export const getServiceRegistrations = async () => {
  const result = await Request.get(ENDPOINT_SERVICE_REGISTRATIONS);
  return result;
};

export const activateRegistration = async (regId) => {
  const result = await Request.put(ENDPOINT_ACTIVATE_SERVICE_REGISTRATIONS(regId));
  return result;
};

export const rejectRegistration = async (regId) => {
  const result = await Request.put(ENDPOINT_REJECT_SERVICE_REGISTRATIONS(regId));
  return result;
};
