import { FaSpinner } from 'react-icons/fa';
import Button from './Button';
import './LoaderBtn.css';
import type { iBtns } from '../interfaces/iBtns';
const LoaderBtn = ({ text }: iBtns) => {
  return (
    <>
      <Button type='button' variant='btn btn__info'>
        <FaSpinner size={20} className='spinner-animation' />
        <span>{text ? text : 'Enviando'}</span>
      </Button>
    </>
  );
};

export default LoaderBtn;
