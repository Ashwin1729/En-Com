import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import Router from "next/router";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const remainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const expTime = new Date(expirationTime).getTime();

  const remainingDuration = expTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("token");
    const storedExpirationTime = localStorage.getItem("expirationTime");

    const calcRemainingTime = remainingTime(storedExpirationTime);

    if (calcRemainingTime <= 60000) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      return null;
    }

    return {
      token: storedToken,
      duration: calcRemainingTime,
    };
  }
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
    }

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    Router.replace("./");
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);
    }
    const remTime = remainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
