import React from 'react';

const useToken = () => {
  const [token, setTokenInternal] = React.useState(localStorage.getItem('token') || '');

  function setToken(token: string) {
    localStorage.setItem('token', token)
    setTokenInternal(token)
  }

  return { token, setToken }
}

export default useToken