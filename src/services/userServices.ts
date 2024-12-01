import axios from "axios";
import dayjs from "dayjs";

export const api = axios.create({
  baseURL: "http://172.16.251.130:3333",
  withCredentials: true,
});

interface signinData {
  cpf: string;
  password: string;
}

interface signupData {
  password: string;
  confirmPassword?: string;
  name: string;
  birth_date: string;
  cellphone: string;
  gender: string;
  email: string;
  cpf: string;
  role: string;
}

interface updateUserStatusData {
  email: string;
  password: string | null;
  name: string;
  birth_date: string;
  cellphone: string;
  gender: string;
}

export const signin = async (data: signinData) => {
  const response = await api.post("/api/users/login", data);
  return response;
};

export const signup = (data: signupData) => {
  const signupDataCopy = { ...data };
  delete signupDataCopy.confirmPassword;

  const formattedBirthDate = dayjs(data.birth_date, "DDMMYYYY").format(
    "YYYY-MM-DD",
  );

  const body = {
    ...signupDataCopy,
    birth_date: formattedBirthDate,
  };

  const response = api.post("/api/users/register", body);
  return response;
};

export const updateUserAndPerson = (
  data: updateUserStatusData,
  userId: string,
  token: string,
) => {
  const response = api.put(`/api/users/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getServiceUsers = async (userId: string, token: string) => {
  const response = await api.get(`/api/users/${userId}/services`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const generate2FAHandler = (userId: string, token: string) => {
  const response = api.post(
    `/api/users/2fa/generate`,
    { user_id: userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};

export const updateImage = async (
  userId: string,
  token: string,
  imageFile: any,
) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await api.post(`/api/people/${userId}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    console.error("Erro no upload:", error.response?.data || error.message);
    throw error;
  }
};
