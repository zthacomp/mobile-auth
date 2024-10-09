import axios from "axios";
import password from "../app/screens/user/password";

// export const api = axios.create({
//   baseURL: "http://localhost:3333",
// });

const baseURL = "http://localhost:3333";

interface Data {
  cpf: string;
  password: string;
}

export const signin = (data: Data) => {
  console.log(data);
  const response = axios.post(`${baseURL}/api/users/login`, data);
  return response;
};
