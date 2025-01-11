import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

interface ProtectedRouteProps {
  allowedRoles: string[]; // Los roles permitidos para acceder a la ruta
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { userInfo, role, isLoading } = useUserContext();

  // Si estamos cargando la información del usuario, no hacer nada todavía
  if (isLoading) {
    return <div>Loading...</div>;  // O algún spinner o placeholder
  }

  // Si no hay userInfo, redirigir al login
  if (!userInfo) {
    return <Navigate to="/auth/login" />;
  }

  // Si el rol del usuario no está en los roles permitidos, redirigir a home
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  // Si pasa las validaciones, renderiza la ruta
  return <Outlet />;
};

export default ProtectedRoute;

