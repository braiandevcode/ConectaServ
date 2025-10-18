// import { useLocation } from 'react-router';
import Hero from './Hero';
import ComoFunciona from './ComoFunciona';
// import { useEffect } from 'react';
// import useMain from '../../hooks/useMain';
// import { EModalType } from '../../types/enumModalTypes';
// import ModalRole from './Modals/ModalRole';

// COMPONENTE HOME
export default function Home() {
  return (
    <>
      <Hero />
      <ComoFunciona />
      {/* {location.pathname === '/' && <ModalRole />} */}
    </>
  );
}
