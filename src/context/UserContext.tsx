import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { CustomerInfoDTO, AdminInfoDTO } from '../interfaces/dtos';
import { getMyUser } from '../api/userServices';
import { jwtDecode } from 'jwt-decode';

// Interfaz que describe el contexto de usuario
interface UserContextType {
  userInfo: CustomerInfoDTO | AdminInfoDTO | null;
  setUserInfo: React.Dispatch<React.SetStateAction<CustomerInfoDTO | AdminInfoDTO | null>>;
  role: string;
  isLoading: boolean;  // Añadimos el estado de carga
}

// Valor inicial del estado
const initialUserInfo: CustomerInfoDTO | AdminInfoDTO | null = null;
const initialUserRole: string = '';
const initialLoadingState: boolean = true;  // El estado de carga comienza en true

// Contexto global para el usuario
export const UserContext = createContext<UserContextType>({
  userInfo: initialUserInfo,
  setUserInfo: () => {},
  role: initialUserRole,
  isLoading: initialLoadingState,  // Inicializamos con true
});

// Hook para usar el contexto de usuario
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

// Componente Provider del contexto
interface UserProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserProviderProps) => {
  const [userInfo, setUserInfo] = useState<CustomerInfoDTO | AdminInfoDTO | null>(initialUserInfo);
  const [role, setRole] = useState<string>(initialUserRole);
  const [isLoading, setIsLoading] = useState<boolean>(initialLoadingState);  // Estado de carga

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwtDecode(token);
      setRole(decodedToken.roles[0]);
        getMyUser()
          .then((response) => {
            if (response) {
              setUserInfo(response);
              localStorage.setItem('userInfo', JSON.stringify(response));  // Guardar en localStorage
            } else {
              setUserInfo(null);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            setUserInfo(null);
            setIsLoading(false);
          });
    } else {
      setIsLoading(false); 
    }
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, role, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

