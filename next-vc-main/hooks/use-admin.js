import { redirect } from 'next/dist/server/api-utils';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {

  const [token, setToken] = useState();
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken' || null)
    setToken(adminToken)
  }, [token])


  const adminlogin = (newToken) => {
    // 這個函數負責儲存 token
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
    console.log(newToken);
    redirect('/admin')
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  // const isLoggedIn = !!token;

  return (
    <AdminAuthContext.Provider value={{token,adminlogin,logout}}>
      {children}
    </AdminAuthContext.Provider>

  );
}

export const useAdminAuth = () => useContext(AdminAuthContext)
