import React from "react";

const AuthContext = React.createContext({
  user: {},
  setUser: () => {},
  up: 0,
  forceUpdate: Function,
});

export default AuthContext;
