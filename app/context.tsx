import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Token {
  token?: string;
}

export interface UserContextType {
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
}

export const UserContext = createContext<UserContextType>({
  token: undefined,
  setToken: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(undefined);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
