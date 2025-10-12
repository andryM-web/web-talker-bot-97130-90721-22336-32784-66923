import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserMovie, MovieStatus } from '@/types/movie';
import { mockUserMovies } from '@/data/mockMovies';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userMovies: UserMovie[];
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserMovie: (movieId: number, status: MovieStatus, rating?: number) => void;
  getUserMovieStatus: (movieId: number) => UserMovie | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userMovies, setUserMovies] = useState<UserMovie[]>([]);

  useEffect(() => {
    // Проверяем сохраненную сессию
    const savedUser = localStorage.getItem('user');
    const savedUserMovies = localStorage.getItem('userMovies');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setUserMovies(savedUserMovies ? JSON.parse(savedUserMovies) : []);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - в реальном приложении здесь будет API запрос
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Проверка на администратора
    if (email === 'admin@kinoclone.ru' && password === 'admin123') {
      const adminUser: User = {
        id: 999,
        username: 'Admin',
        email: 'admin@kinoclone.ru',
        role: 'admin',
      };
      setUser(adminUser);
      setUserMovies([]);
      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('userMovies', JSON.stringify([]));
      return;
    }
    
    // Обычный пользователь
    const mockUser: User = {
      id: 1,
      username: email.split('@')[0],
      email,
      role: 'user',
    };
    
    setUser(mockUser);
    setUserMovies(mockUserMovies);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('userMovies', JSON.stringify(mockUserMovies));
  };

  const register = async (username: string, email: string, password: string) => {
    // Mock registration - в реальном приложении здесь будет API запрос
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: Date.now(), // Уникальный ID
      username,
      email,
      role: 'user',
    };
    
    setUser(mockUser);
    setUserMovies([]);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('userMovies', JSON.stringify([]));
  };

  const logout = () => {
    setUser(null);
    setUserMovies([]);
    localStorage.removeItem('user');
    localStorage.removeItem('userMovies');
  };

  const updateUserMovie = (movieId: number, status: MovieStatus, rating?: number) => {
    if (!user) return;

    const existingIndex = userMovies.findIndex(
      um => um.userId === user.id && um.movieId === movieId
    );

    let newUserMovies: UserMovie[];

    if (existingIndex >= 0) {
      newUserMovies = [...userMovies];
      newUserMovies[existingIndex] = {
        userId: user.id,
        movieId,
        status,
        rating,
      };
    } else {
      newUserMovies = [
        ...userMovies,
        {
          userId: user.id,
          movieId,
          status,
          rating,
        },
      ];
    }

    setUserMovies(newUserMovies);
    localStorage.setItem('userMovies', JSON.stringify(newUserMovies));
  };

  const getUserMovieStatus = (movieId: number): UserMovie | undefined => {
    if (!user) return undefined;
    return userMovies.find(um => um.userId === user.id && um.movieId === movieId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        userMovies,
        login,
        register,
        logout,
        updateUserMovie,
        getUserMovieStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
