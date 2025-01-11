import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Registration from "./pages/RegistrationPage/Registration";
import ShopLayout from "./components/ShopLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Profile from "./pages/ProfilePage/Profile";
import Orders from "./pages/OrdersPage/Orders";
import AdminProducts from "./pages/AdminProductsPage/AdminProducts";
import AdminPackages from "./pages/AdminPackagesPage/AdminPackages";
import AdminCostumers from "./pages/AdminCostumersPage/AdminCostumers";
import AdminCategories from "./pages/AdminCategoriesPage/AdminCategories";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas donde se muestra el Navbar */}
        <Route element={<ShopLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Rutas públicas */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/registration" element={<Registration />} />

        {/* Rutas protegidas para Admin */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
          <Route path="/dashboard/:adminId" element={<AdminLayout/>}>
            <Route path="" element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="costumers" element={<AdminCostumers />} />
            <Route path="categories" element={<AdminCategories />} />
          </Route>
        </Route>

        {/* Rutas protegidas para Usuario (ADMIN o CUSTOMER) */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_CUSTOMER']} />}>
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>

        {/* Rutas protegidas para Cliente */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_CUSTOMER']} />}>
          <Route path="/orders/:customerId" element={<Orders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

