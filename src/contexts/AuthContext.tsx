import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AuthService, {User} from '../services/AuthService';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    loadStoredUser();
  }, []);

  async function loadStoredUser() {
    try {
      const authData = await AuthService.getCurrentUser();

      if (authData) {
        setUser(authData.user);
      }
    } catch (error) {
      console.log('Error loading stored user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const authData = await AuthService.login(email, password);
      setUser(authData.user);
    } catch (error) {
      throw error;
    }
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      const user = await AuthService.register(name, email, password);
      // Auto login after registration
      await signIn(email, password);
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      await AuthService.logout();
      setUser(null);
    } catch (error) {
      console.log('Error signing out:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
