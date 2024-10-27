import { api } from "./userServices";

interface desconnectData {
  user_id: string;
  service_id: string;
}

export const desconnectUserService = async (
  data: desconnectData,
  token: string,
) => {
  const response = await api.patch("/api/services/disconnect", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
