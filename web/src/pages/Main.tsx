import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

interface User {
  _id: string;
  name: string;
  user: string;
  bio: string;
  avatar: string;
}

export default function Main() {
  const route = useRouteMatch<{id: string}>();
  const [users, setUsers] = useState<User[]>([]);
  const [match, setMatch] = useState(false);
  const [matchDev, setMatchDev] = useState<User>();

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {  
          user: route.params.id
        }
      });

      setUsers(response.data);
    }
    
    const socket = io('YOU_LOCALHOST:3333', {
      query: {
        user: route.params.id
      }
    });

    socket.on('match', (dev: User) => {
      setMatchDev(dev);
      setMatch(true);
    });

    loadUsers();

    return () => { socket.disconnect() }
  }, [route.params.id]);

  async function handleLike(id: string) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: route.params.id }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id: string) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: route.params.id }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
          <img src={logo} alt="Tindev"/>
      </Link>
      {users.length > 0 ? (
        <ul>
            {users.map(user => (
              <li key={user._id}>
                <img src={user.avatar} alt={user.name}/>
                <footer>
                  <strong>{user.name}</strong>
                  <p>{user.bio}</p>
                </footer>

                <div className="buttons">
                  <button type="button" onClick={() => handleDislike(user._id)}>
                    <img src={dislike} alt="Dislike" />
                  </button>
                  <button type="button" onClick={() => handleLike(user._id)}>
                    <img src={like} alt="Like" />
                  </button>
                </div>
              </li>                        
            ))}
        </ul>
      ) : (
        <div className="empty">Sem devs no momento!</div>
      )}

      {match && matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="Deu match" />

          <img className="avatar" src={matchDev.avatar} alt={matchDev.name} />                    
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatch(false)}>Fechar</button>
        </div>
      )}             
    </div>
  );
}
