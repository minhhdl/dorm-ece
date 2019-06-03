import Request from '../../../commons/utils/request';
import { ENDPOINT_DORM_REGISTRATIONS, ENDPOINT_SPEC_DORM_REGISTRATION, ENDPOINT_ACTIVATE_DORM_REGISTRATIONS, ENDPOINT_REJECT_DORM_REGISTRATIONS } from '../../../constants';

export const getDormRegistrations = async () => {
  const result = await Request.get(ENDPOINT_DORM_REGISTRATIONS);
  return result;
};

export const deleteRegistration = async (regId) => {
  const result = await Request.delete(ENDPOINT_SPEC_DORM_REGISTRATION(regId));
  return result;
};

export const activateRegistration = async (regId) => {
  const result = await Request.put(ENDPOINT_ACTIVATE_DORM_REGISTRATIONS(regId));
  return result;
};

export const rejectRegistration = async (regId) => {
  const result = await Request.put(ENDPOINT_REJECT_DORM_REGISTRATIONS(regId));
  return result;
};

