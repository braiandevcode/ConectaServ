import { FaSpinner } from 'react-icons/fa';
import Button from './Button';
import './LoaderBtn.css';
const LoaderBtn = () => {
  return (
    <>
      <Button type='button' variant='btn btn__info'>
        <FaSpinner size={20} className="spinner-animation" />
        <span>Enviando</span>
      </Button>
    </>
  );
};

export default LoaderBtn;
