import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login() {
  const history = useHistory();

  const [username, setUsername] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const response = await api.post('/create/dev', { username });
    
    const { _id } = response.data

    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
          <img src={logo} alt="Tindev"/>
          <input 
          placeholder="Digite o seu usuário do GitHub"
          value={username}
          onChange={e => setUsername(e.target.value)}
          />
          <button type="submit">Enviar</button>
      </form>
    </div>
  );
}