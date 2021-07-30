import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getFullName = () => {
    const nameString = localStorage.getItem('fullName');
    const userName = JSON.parse(nameString);
    return userName;
  };

  const [token, setToken] = useState(getToken());
  const [fullName, setFullName] = useState(getFullName());

  const saveToken = (data) => {
    localStorage.setItem('token', JSON.stringify(data.token));
    localStorage.setItem('fullName', JSON.stringify(data.fullName));
    setToken(data.token);
    setFullName(data.fullName);
  };

  return {
    setToken: saveToken,
    token,
    fullName
  };
}
