import { api } from "./userServices";

interface disconnectData {
  user_id: string;
  service_id: string;
}

export const disconnectUserService = async (
  data: disconnectData,
  token: string,
) => {
  const response = await api.patch("/api/services/disconnect", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getServiceUsersInfo = async (
  userId: string,
  serviceId: string,
  token: string,
) => {
  const response = await api.post(
    `/api/services/user/service`,
    { user_id: userId, service_id: serviceId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};
