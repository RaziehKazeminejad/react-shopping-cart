import { createContext, useContext, useState, version } from 'react';

const AuthProviderContext = createContext();
const AuthProviderContextDispatcher = createContext();

export default function AuthProvider({ children }) {
  const [state, setState] = useState(false);
  return (
    <AuthProviderContext.Provider value={state}>
      <AuthProviderContextDispatcher.Provider value={setState}>
        {children}
      </AuthProviderContextDispatcher.Provider>
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => useContext(AuthProviderContext);
export const useAuthActions = () => useContext(AuthProviderContextDispatcher);
