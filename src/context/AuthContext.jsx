// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUsers = localStorage.getItem('miraUsers');
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (e) {
        setUsers([]);
      }
    }

    const savedUser = localStorage.getItem('miraUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        setCurrentUser(null);
      }
    }
    setLoading(false);
  }, []);

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('miraUsers', JSON.stringify(updatedUsers));
  };

  const signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        reject({ message: 'Email already registered' });
        return;
      }

      const newUser = {
        id: uuidv4(),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
        orders: [],
      };

      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
      localStorage.setItem('miraUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      resolve(newUser);
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        reject({ message: 'Invalid email or password' });
        return;
      }
      localStorage.setItem('miraUser', JSON.stringify(user));
      setCurrentUser(user);
      resolve(user);
    });
  };

  const logout = () => {
    localStorage.removeItem('miraUser');
    setCurrentUser(null);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    saveUsers(updatedUsers);
    localStorage.setItem('miraUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        signup,
        login,
        logout,
        updateUser,
        loading,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}