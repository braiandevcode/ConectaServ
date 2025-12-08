import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router';

import './NavCategory.css'
const NavCategory = ({ menuChildOpen }: { menuChildOpen: boolean }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Función para cerrar el desplegable
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    console.log('DESPLEGADO? ', dropdownOpen);
  }, [dropdownOpen]);
  return (
    <>
      {/* Navegación */}
      <nav className={`nav-links ${menuChildOpen ? 'active' : ''} nav-bg-link-2`}>
        {/* Dropdown Categorías */}
        <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
          <Link
            to={'/category'}
            className='nav-item dropdown-toggle nav__link'
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen(!dropdownOpen);
            }}>
            Categorías <FaAngleDown />
          </Link>

          <div className='dropdown__menu'>
            <div className='dropdown__group'>
              <p className='dropdown__title'>Reparaciones</p>
              <Link to='/services?service=plomeria' className='dropdown__item' onClick={closeDropdown}>
                Plomería
              </Link>
              <Link to='/services?service=electricidad' className='dropdown__item' onClick={closeDropdown}>
                Electricidad
              </Link>
              <Link to='/services?service=pintura' className='dropdown__item' onClick={closeDropdown}>
                Pintura
              </Link>
              <Link to='/services?service=carpinteria' className='dropdown__item' onClick={closeDropdown}>
                Carpintería
              </Link>
              <Link to='/services?service=electrodomesticos' className='dropdown__item' onClick={closeDropdown}>
                Electrodomésticos
              </Link>
              <Link to='/services?service=aire acondicionado' className='dropdown__item' onClick={closeDropdown}>
                Aire acondicionado
              </Link>
              <Link to='/services?service=herreria' className='dropdown__item' onClick={closeDropdown}>
                Herrería
              </Link>
              <Link to='/services?service=construccion en seco' className='dropdown__item' onClick={closeDropdown}>
                Construcción en seco
              </Link>
            </div>

            <div className='dropdown__group'>
              <p className='dropdown__title'>Jardinería</p>
              <Link to='/services?service=corte de pasto' className='dropdown__item' onClick={closeDropdown}>
                Corte de pasto
              </Link>
              <Link to='/services?service=poda de arboles' className='dropdown__item' onClick={closeDropdown}>
                Poda de árboles
              </Link>
              <Link to='/services?service=poda de arbustos' className='dropdown__item' onClick={closeDropdown}>
                Poda de arbustos
              </Link>
              <Link to='/services?service=desmalezado' className='dropdown__item' onClick={closeDropdown}>
                Desmalezado
              </Link>
              <Link to='/services?service=limpieza de jardin' className='dropdown__item' onClick={closeDropdown}>
                Limpieza de jardín
              </Link>
              <Link to='/services?service=fertilizacion mantenimiento' className='dropdown__item' onClick={closeDropdown}>
                Fertilización/mantenimiento césped
              </Link>
              <Link to='/services?service=plantacion' className='dropdown__item' onClick={closeDropdown}>
                Plantación
              </Link>
            </div>

            <div className='dropdown__group'>
              <p className='dropdown__title'>Mudanzas y transporte</p>
              <Link to='/services?service=mudanzas particulares' className='dropdown__item' onClick={closeDropdown}>
                Mudanzas particulares
              </Link>
              <Link to='/services?service=mudanzas comerciales' className='dropdown__item' onClick={closeDropdown}>
                Mudanzas comerciales
              </Link>
              <Link to='/services?service=mudanzas locales' className='dropdown__item' onClick={closeDropdown}>
                Mudanzas locales
              </Link>
              <Link to='/services?service=mudanzas larga distancia' className='dropdown__item' onClick={closeDropdown}>
                Mudanzas larga distancia
              </Link>
              <Link to='/services?service=fletes hora' className='dropdown__item' onClick={closeDropdown}>
                Fletes por hora/viaje
              </Link>
              <Link to='/services?service=transporte de muebles' className='dropdown__item' onClick={closeDropdown}>
                Transporte de muebles
              </Link>
              <Link to='/services?service=transporte de electrodomesticos' className='dropdown__item' onClick={closeDropdown}>
                Transporte de electrodomésticos
              </Link>
              <Link to='/services?service=traslado fragil' className='dropdown__item' onClick={closeDropdown}>
                Traslado de objetos frágiles
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavCategory;
