import { createContext } from "react";
const account = {_id:"624aecb3975cf8f5dfeb5e13",surname:"imen dhaouadi"};

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