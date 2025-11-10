import { useState } from "react";
import { FaHandsHelping, FaList, FaAngleDown } from "react-icons/fa";
import { FiUserPlus } from 'react-icons/fi';
import { Link, useLocation } from "react-router";
import Button from '../Button';
import useHeader from '../../hooks/useHeader';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { pathname } = useLocation(); // Para saber en qué ruta estamos
    const { openRole, openLogin } = useHeader(); // Hook para abrir los modales

    // Función para cerrar el desplegable
    const closeDropdown = () => setDropdownOpen(false);

    return (
        <header className="header">
            <div className="header__container">
                {/* Logo */}
                <div className="card-logo">
                    <Link to="/" className="card-logo__logo">
                        <div className="card-logo__icon">
                            <FaHandsHelping />
                        </div>
                        <span className="card-logo__text">ConectaServ</span>
                    </Link>
                </div>

                {/* Botón menú */}
                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FaList />
                </button>

                {/* Navegación */}
                <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
                    {/* Dropdown Categorías */}
                    <div className={`dropdown ${dropdownOpen ? "open" : ""}`}>
                        <Link
                            to={'/category'}
                            className="nav-item dropdown-toggle nav__link"
                            onClick={(e) => {
                                e.preventDefault();
                                setDropdownOpen(!dropdownOpen);
                            }}
                        >
                            Categorías <FaAngleDown />
                        </Link>

                        <div className="dropdown__menu">
                            <div className="dropdown__group">
                                <p className="dropdown__title">Reparaciones</p>
                                <Link to="/services?service=plomeria" className="dropdown__item" onClick={closeDropdown}>Plomería</Link>
                                <Link to="/services?service=electricidad" className="dropdown__item" onClick={closeDropdown}>Electricidad</Link>
                                <Link to="/services?service=pintura" className="dropdown__item" onClick={closeDropdown}>Pintura</Link>
                                <Link to="/services?service=carpinteria" className="dropdown__item" onClick={closeDropdown}>Carpintería</Link>
                                <Link to="/services?service=electrodomesticos" className="dropdown__item" onClick={closeDropdown}>Electrodomésticos</Link>
                                <Link to="/services?service=aire-acondicionado" className="dropdown__item" onClick={closeDropdown}>Aire acondicionado</Link>
                                <Link to="/services?service=herreria" className="dropdown__item" onClick={closeDropdown}>Herrería</Link>
                                <Link to="/services?service=construccion-en-seco" className="dropdown__item" onClick={closeDropdown}>Construcción en seco</Link>
                            </div>

                            <div className="dropdown__group">
                                <p className="dropdown__title">Jardinería</p>
                                <Link to="/services?service=corte-pasto" className="dropdown__item" onClick={closeDropdown}>Corte de pasto</Link>
                                <Link to="/services?service=poda-arboles" className="dropdown__item" onClick={closeDropdown}>Poda de árboles</Link>
                                <Link to="/services?service=poda-arbustos" className="dropdown__item" onClick={closeDropdown}>Poda de arbustos</Link>
                                <Link to="/services?service=desmalezado" className="dropdown__item" onClick={closeDropdown}>Desmalezado</Link>
                                <Link to="/services?service=limpieza-jardin" className="dropdown__item" onClick={closeDropdown}>Limpieza de jardín</Link>
                                <Link to="/services?service=fertilizacion-mantenimiento" className="dropdown__item" onClick={closeDropdown}>Fertilización/mantenimiento césped</Link>
                                <Link to="/services?service=plantacion" className="dropdown__item" onClick={closeDropdown}>Plantación</Link>
                            </div>

                            <div className="dropdown__group">
                                <p className="dropdown__title">Mudanzas y transporte</p>
                                <Link to="/services?service=mudanzas-particulares" className="dropdown__item" onClick={closeDropdown}>Mudanzas particulares</Link>
                                <Link to="/services?service=mudanzas-comerciales" className="dropdown__item" onClick={closeDropdown}>Mudanzas comerciales</Link>
                                <Link to="/services?service=mudanzas-locales" className="dropdown__item" onClick={closeDropdown}>Mudanzas locales</Link>
                                <Link to="/services?service=mudanzas-larga-distancia" className="dropdown__item" onClick={closeDropdown}>Mudanzas larga distancia</Link>
                                <Link to="/services?service=fletes-hora" className="dropdown__item" onClick={closeDropdown}>Fletes por hora/viaje</Link>
                                <Link to="/services?service=transporte-muebles" className="dropdown__item" onClick={closeDropdown}>Transporte de muebles</Link>
                                <Link to="/services?service=transporte-electrodomesticos" className="dropdown__item" onClick={closeDropdown}>Transporte de electrodomésticos</Link>
                                <Link to="/services?service=traslado-fragil" className="dropdown__item" onClick={closeDropdown}>Traslado de objetos frágiles</Link>
                            </div>
                        </div>
                    </div>
                    {/* <div className="nav__link cursor-pointer" role="button">Iniciar Sesión</div>
                    <button className="color btnRegister">Registrarse</button> */}
                </nav>

                <div className='c-flex c-flex-items-center gap-1 auth-wrapper'>
                    {pathname === '/' && (
                        <>
                            <div className='w-full auth-wrapper__login cursor-pointer' onClick={openLogin}>
                                Iniciar sesión
                            </div>
                            <Button type='button' className='btn color btnRegister c-flex c-flex-items-center gap-1/2 auth-wrapper__register' onClick={openRole}>
                                <span>Registrarse</span>
                                <FiUserPlus />
                            </Button>
                        </>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Header;