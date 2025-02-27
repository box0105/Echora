import React, { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    sex: '',
    phone: '',
    postcode: '',
    address: '',
  })

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
