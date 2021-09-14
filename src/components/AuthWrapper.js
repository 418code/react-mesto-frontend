import { AuthContext } from '../contexts/AuthContext';
import { useState } from 'react';

export default function AuthWrapper({children}) {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function toggle (value) {
    setIsLoggedIn(value);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setupIsLoggedIn: toggle }}>
      {/* <button onClick={() => toggle(!isLoggedIn)}>Toggle {isLoggedIn? 'ON' : 'OFF'}</button> */}
      {children}
    </AuthContext.Provider>
  );
}
