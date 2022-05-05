import { createContext } from "react";
const account = {_id:"626682d43561b8c83d70acd3",surname:"john sevalien"};

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