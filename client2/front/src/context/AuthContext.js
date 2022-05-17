import { createContext } from "react";
const account = {_id:"62752a3f2047424709a53c07",surname:"alex sevalien"};

export const AuthContext = createContext(account);
export const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        account:account,
        isFetching:false,
        error: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};