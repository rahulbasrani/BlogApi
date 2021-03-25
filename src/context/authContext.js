import { createContext, useEffect, useState } from 'react';
import { API_URL } from '../App';

export const JWT_KEY = 'access-token'

export const AuthContext = createContext({
  loading: true,
  me: null,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);

  const fetchMe = async () => {
    const res = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`}
    })
    if (res.ok) {
      const json = await res.json()
      setMe(json.data.me)
    }
    setLoading(false)
  }

  const signIn = async (userValues) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/auth/access-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(userValues),
    });
    if (res.ok) {
      const json = await res.json();
      localStorage.setItem(JWT_KEY, json.data.token);
      fetchMe();
    }
    setLoading(false);
  };

  const signUp = async (newUserValues) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserValues),
    });
    if (res.ok) {
      const json = await res.json();
      localStorage.setItem(JWT_KEY, json.data.token);
      fetchMe();
    }
    setLoading(false);
  };

  const signOut = () => {
    setLoading(true);
    localStorage.removeItem(JWT_KEY);
    setMe(null);
    setLoading(false);
  }

  useEffect(() => {
    if (localStorage.getItem(JWT_KEY)) {
      fetchMe();
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ loading, me, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
