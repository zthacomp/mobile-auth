import { api } from "./userServices";

interface registerData {
  ip: string;
  localization: string;
}

export const registerDevice = async (
  userId: string,
  token: string,
  data: registerData,
) => {
  const response = await api.post(`/api/trusted-devices/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getUserTrustedDevices = async (userId: string, token: string) => {
  const response = await api.get(`/api/trusted-devices/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteTrustedDevice = async (deviceId: string, token: string) => {
  const response = await api.delete(`/api/trusted-devices/${deviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
