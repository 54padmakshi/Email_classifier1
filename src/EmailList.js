import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/emails`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('googleToken')}`,
          },
        });
        setEmails(response.data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchEmails();

    const storedApiKey = localStorage.getItem('openai_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const classifyEmails = async () => {
    if (!apiKey) {
      alert('Please enter and submit your OpenAI API key.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/classify`,
        { emails },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log('Classification results:', response.data);
    } catch (error) {
      console.error('Error classifying emails:', error);
    }
  };

  return (
    <div>
      <h1>Email List</h1>
      <button onClick={classifyEmails}>Classify Emails</button>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email.subject}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
