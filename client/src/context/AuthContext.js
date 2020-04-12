import React from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';

const GoogleAuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
  const googleAuth = useGoogleLogin({
    clientId: REACT_APP_GOOGLE_CLIENT_ID || ' ',
  });

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(GoogleAuthContext);
