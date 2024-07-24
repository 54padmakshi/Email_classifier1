import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import EmailList from './EmailList';

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (response) => {
    if (response.credential) {
      setLoggedIn(true);
      // Redirect to the email list page
      window.location.href = '/emails';
    }
  };

  const handleApiKeySubmit = () => {
    localStorage.setItem('openai_api_key', apiKey);
  };

  useEffect(() => {
    const storedApiKey = localStorage.getItem('openai_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div>
        {!loggedIn ? (
          <div>
            <GoogleLogin
              onSuccess={handleLogin}
              onError={(error) => console.error('Google Login Error:', error)}
            />
            <input
              type="text"
              placeholder="Enter OpenAI API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button onClick={handleApiKeySubmit}>Submit API Key</button>
          </div>
        ) : (
          <Routes>
            <Route path="/emails" element={<EmailList />} />
            <Route path="*" element={<Navigate to="/emails" />} />
          </Routes>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
