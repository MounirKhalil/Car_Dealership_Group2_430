import { createContext } from "react";

const UserContext = createContext({
  user: null,
  handleSignIn: () => {},
  handleSignOut: () => {},
});

export default UserContext;
