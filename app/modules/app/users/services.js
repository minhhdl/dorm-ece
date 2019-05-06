import Request from '../../../commons/utils/request';
import { ENDPOINT_USERS, ENDPOINT_ACTIVATE_USER, ENDPOINT_DEACTIVATE_USER } from '../../../constants';

export const getUsers = async () => {
  const result = await Request.get(ENDPOINT_USERS);
  return result;
};

export const getUser = async (id) => {
  const result = await Request.get(`${ENDPOINT_USERS}/${id}`);
  return result;
};

export const updateUser = async (id, data) => {
  const result = await Request.patch(`${ENDPOINT_USERS}/${id}`, data);
  return result;
};

export const addUser = async (data) => {
  const result = await Request.post(ENDPOINT_USERS, data);
  return result;
};

export const deleteUser = async (id) => {
  const result = await Request.delete(`${ENDPOINT_USERS}/${id}`);
  return result;
};

export const activateUser = async (userId) => {
  try {
    const result = await Request.put(ENDPOINT_ACTIVATE_USER(userId));
    return result;
  }catch(e){
    return null;
  }
}

export const deactivateUser = async (userId) => {
  try {
    const result = await Request.put(ENDPOINT_DEACTIVATE_USER(userId));
    return result;
  }catch(e){
    return null;
  }
}
