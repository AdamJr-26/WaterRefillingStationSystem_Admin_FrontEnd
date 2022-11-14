import { UserProvider } from "./auth";

const AppProvider = ({ children }) => {

  return (
    <>
      <UserProvider>{children}</UserProvider>
    </>
  );
};

export default AppProvider;
