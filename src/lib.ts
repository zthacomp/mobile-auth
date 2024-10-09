import axios from "axios";

const baseURL = "http://10.0.2.2:3333";

interface Data {
  cpf: string;
  password: string;
}

export const signin = (data: Data) => {
  const response = axios.post(`${baseURL}/api/users/login`, data);
  return response;
};
