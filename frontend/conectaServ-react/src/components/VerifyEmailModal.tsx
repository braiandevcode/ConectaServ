import { useState } from 'react';
import Modal from 'react-modal';
import apiRequest from '../utils/apiRequestUtils';
import useMain from '../hooks/useMain';
import { EKeyDataByStep } from '../types/enums';

import type { TAplanar } from '../types/types';
import useRegisterPro from '../hooks/useRegisterPro';
import useRegister from '../hooks/useRegister';

Modal.setAppElement('#root'); // SOLO UNA VEZ EN TODO EL PROYECTO

// MODAL PARA VERIFICAR EMAIL ANTES DE REGISTRARSE
const VerifyEmailModal = () => {
  // HOOK PERSONALIZADOS TODOS CONVIVEN EN MISMO CONTEXTO DEL MAIN PRINCIPAL
  const { setLoading, setIsModalOpen, isModalOpen } = useMain();
  const { stepData } = useRegisterPro();
  const { password, setIsSending } = useRegister();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
    setCode('');
    setError('');
    setSuccess('');
  };

  // IGNORO EL valueSelected INNECESARIO PARA BACKEND
  // EN ESTE PUNTO REFERENCIO EL PASO 1 QUE VA A SER IGUAL AL OBJETO DESESTRUCTURADO MENOS PISANDO valueSelected
  // CON ALIAS PARA NO CHOCAR CON VARIABLE DE ESTADO
  const { valueSelected: valueSelectedAlias, ...res } = stepData[EKeyDataByStep.ONE];

  //   CREA NUEVO OBJETO APLANADO
  const aplanarObjeto = {
    // SE PROPAGAN TODAS LAS PROPIEDADES DE CADA PASO
    ...res,
    ...stepData[EKeyDataByStep.TWO],
    ...(stepData[EKeyDataByStep.THREE] ?? {}), //PUEDE NO ESTAR
    ...stepData[EKeyDataByStep.FOUR],
    password, //SE AGREGA EL PASSWORD
  } as TAplanar;

  // ENVIAR LUEGO DE VERIFICAR CODIGO
  const handleCodeVerified = async () => {
    try {
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND

      await apiRequest('http://localhost:3000/professional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aplanarObjeto),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // DESACTIVAR LOADER
      setIsModalOpen(false); // CERRAR MODAL
      setIsSending(false); // PERMITIR NUEVO ENVÍO
    }
  };

  // EJEMPLO DE ENVIO DEL CODIGO
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // EJEMPLO SIMPLE DE VALIDACIÓN
    if (code.trim() === '123456') {
      setSuccess('✅ Código verificado correctamente');
      setError('');
      await handleCodeVerified();
    } else {
      setError('❌ Código incorrecto');
      setSuccess('');
    }
  };

  //RENDERIZA MODAL DE VERIFICACION
  return (
    <>
      {isModalOpen && (
        <div>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            <h2>Verificación de Email</h2>
            <p>Ingresa el código que te enviamos por correo.</p>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Código de verificación'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                  padding: '8px',
                  width: '100%',
                  marginBottom: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />

              <button type='submit'>Verificar</button>
            </form>

            {/* MENSAJES DE ESTADO */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <button onClick={closeModal} style={{ marginTop: '10px' }}>
              Cerrar
            </button>
          </Modal>
        </div>
      )}
    </>
  );
};

export default VerifyEmailModal;
