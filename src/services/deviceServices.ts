import { api } from "./userServices";

interface DevicesData {}

export const getUserTrustedDevices = async (userId: string, token: string) => {
  const response = await api.get(`/api/trusted-devices/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteTrustedDevice = async (deviceId: string, token: string) => {
  console.log(deviceId, token);
  const response = await api.delete(`/api/trusted-devices/${deviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);

  return response;
};
