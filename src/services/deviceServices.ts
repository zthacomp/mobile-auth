import { api } from "./userServices";

interface DevicesData {}

export const getUserTrustedDevices = (userId: string, token: string) => {
  const response = api.get(`api/trusted-devices/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
