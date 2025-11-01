import Form from '../UserClient/Form'; // FORM CLIENTES

// CSS BASE FORMULARIO
// import '../../FormBase.css'; // ==> FROM BASE
import '../RegisterBase.css'; // ESTILOS BASE DE REGISTRO
// REGISTRO DE CLIENTE
export default function RegisterClient() {
  return (
    <>
      <div className='w-full c-flex c-flex-justify-center centered register'>
        <div className='w-full register__container'>
          <div className='c-flex c-flex-column gap-1/2 register__content'>
            <div className='w-full c-flex c-flex-items-center register__header'>
              <h1 className='w-full c-flex c-flex-items-center register__title'>
                <span>Registro Cliente</span>
              </h1>
            </div>
            {<Form/>}
          </div>
        </div>
      </div>
    </>
  );
}
