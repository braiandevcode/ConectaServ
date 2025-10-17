import Modal from 'react-modal';
import useMain from '../../../hooks/useMain';
import FormLogin from '../Forms/Login';
const ModalLogin = () => {
  const { isModalOpen, closeModal } = useMain();
  return (
    <>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div id='loginModal' className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg w-full max-w-md mx-4'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-6'>
                <h3 className='text-2xl font-bold text-gray-800'>Iniciar sesión</h3>
                <button id='closeLoginModal' className='text-gray-500 hover:text-gray-700'>
                  <i className='fas fa-times'></i>
                </button>
              </div>
              {<FormLogin />}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalLogin;
