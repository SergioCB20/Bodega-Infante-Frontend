import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='w-full h-full flex flex-col items-center overflow-x-hidden'> 
      {/* Mostrar el Navbar */}
      <Navbar />
      {/* Mostrar el contenido de las rutas anidadas */}
      <Outlet/>
        {/* Mostrar el Footer */}
      <Footer /> 
    </div>
  );
};

export default Layout;

