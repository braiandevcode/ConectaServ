import FormClient from './FormClient';

// REGISTRO DE CLIENTE
export default function RegisterClient() {
  return (
    <>
      <div className='w-full c-flex c-flex-justify-center centered register-userClient'>
        <div className='w-full register-userClient__container'>
          <div className='c-flex c-flex-column gap-1/2 register-userClient__content'>
            <div className='w-full c-flex c-flex-items-center register-userClient__header'>
              <h1 className='w-full c-flex c-flex-items-center register-userClient__title'>
                <span>Registro Cliente</span>
              </h1>
            </div>
            {<FormClient />}
          </div>
        </div>
      </div>
    </>
  );
}
