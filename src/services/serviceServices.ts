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
