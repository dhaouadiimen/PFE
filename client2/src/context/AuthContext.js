import { createContext } from "react";
const account = {_id:"624c1a8705cb50cb26441301",surname:"John sevalien"};

export const AuthContext = createContext(account);
export const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        account:account ,
        isFetching:false,
        error: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};