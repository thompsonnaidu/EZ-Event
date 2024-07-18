import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    userId: null,
    token: null,
    tokenExpiration: null,
    isAuthenticated:false,
    email:null,
  });

const login = (data) => {
    console.log('login data', data);
    setAuthData({
        ...authData,
      userId: data.userId,
      token: data.token,
      tokenExpiration: data.tokenExpiration,
      isAuthenticated:true,
      email:data.email
    });
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setAuthData({
      userId: null,
      token: null,
      tokenExpiration: null,
      isAuthenticated:false,
      email:null,
    });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
