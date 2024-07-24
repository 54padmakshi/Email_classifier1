import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const Login = ({ setToken }) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      setToken(accessToken);
      // Redirect to the email list page or perform additional logic
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
    <div>
      <button onClick={() => login()}>Sign in with Google</button>
    </div>
  );
};

export default Login;
