// src/components/Login.js

import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Welcome, ${username}!`);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
