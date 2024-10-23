import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";

export interface UserContextType {
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  userInfo: TokenPayload | null;
}

export const UserContext = createContext<UserContextType>({
  token: undefined,
  setToken: () => {},
  userInfo: null,
});

interface TokenPayload {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  person: {
    id: string;
    name: string;
    birth_date: string;
    cellphone: string;
    gender: string;
    profile_photo_url: string;
  };
  created_at: Date;
  updated_at: Date;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<TokenPayload | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded: TokenPayload = jwtDecode(token);
        setUserInfo(decoded);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      setUserInfo(null);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, userInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
