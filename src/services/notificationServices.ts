import { api } from "./userServices";

export const getUserNotifications = async (userId: string, token: string) => {
  const response = await api.get(`/api/notifications/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteUserNotifications = async (
  notificationId: string,
  token: string,
) => {
  const response = await api.delete(`/api/notifications/${notificationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateNotificationsStatus = async (
  notificationId: string,
  token: string,
) => {
  const response = await api.patch(
    `/api/notifications/${notificationId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(response.data);
  return response;
};
