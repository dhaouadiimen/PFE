import { createContext } from "react";
const account = {_id:"626682963561b8c83d70accf",surname:"imen dhaouadi"};

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