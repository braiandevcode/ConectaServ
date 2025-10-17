import { useLocation } from 'react-router';
import Hero from '../Hero';
import ComoFunciona from './ComoFunciona';
import ModalRole from './Modals/ModalRole';

// COMPONENTE HOME
export default function Home() {
  const location = useLocation();
  const prueba = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    console.log(e.target)
  }

  return (
    <>
      <Hero />
      <ComoFunciona />
      <button className='btn' onClick={prueba}>Prueba</button>
      {location.pathname === '/' && <ModalRole />}
    </>
  );
}
