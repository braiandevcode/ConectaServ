import { useLocation } from 'react-router';
import ComoFunciona from '../components/ComoFunciona';
import Hero from '../components/Hero';
import ModalRole from '../components/ModalRole';
import useMain from '../hooks/useMain';

// COMPONENTE HOME
export default function Home() {
  const {  hasSelectedRole } = useMain();
  const location = useLocation();
  return (
    <>
      <Hero />
      <ComoFunciona />
      {location.pathname === '/' && !hasSelectedRole && <ModalRole />}
    </>
  );
}
