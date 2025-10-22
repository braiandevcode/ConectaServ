import { MdOutlineMailLock } from 'react-icons/md';
import { useEffect, useRef, type FC } from 'react';
import useFormVerifyEmailCode from '../../../../hooks/useFormVerifyEmailCode';
import BtnSubmit from '../../../BtnSubmit';
import { renderFieldError, styleBorderFieldError } from '../../../../utils/formUtils';

// CSS
import './FormVerifyCode.css';
import { validateWithRegex } from '../../../../utils/validateFieldUtils';

const NUM_DIGITS: number = 6; //VALOR DE DIGITOS
// FORMULARIO DE VERIFICACION
const FormVerifyCode: FC = () => {
  // HOOK DE contexto DEL FORMULARIO DE VERIFICACION CON PROPS DEL PROVIDER
  const { otp, setOtp, handleSubmit, isSendingCode, formState, updatedFormState } = useFormVerifyEmailCode();

  // DEFINIR UN ARRAY DE REFERENCIAS DE TIPO HTMLInputElement O null
  // AEGURAR QUE ESOS ELEMENTOS TENFRAN LA FUNCION FOCUS PARA EJECUTAR
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  //HANDLER DE MANEJO DE DIGITO ==> MANEJO DE LOGICA opt
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const value: string = e.currentTarget.value; //VALOR INGRESADO

    // PERMITIR UN SOLO DIGITO O VACIO SI SE BORRA
    if (!validateWithRegex({ pattern: /^[0-9]$/, text: value }) && value !== '') return; //==> SI NO ES VALIDO NO SEGUIR

    // ACTUALIZAR EL ARREGLO DE ESTADO opt
    const newOtp: string[] = [...otp]; //COPIAR TODO LO PREVIO
    newOtp[index] = value; // ==>AGREGAR EL NUEVO VALOR AL ARRAY SEGUN INDICE
    setOtp(newOtp); // ==> SETEAR EL ARRAY ACTUALIZADO

    // UNIR TODO Y VALIDAR CON join();
    const fullCode: string = newOtp.join('');
    updatedFormState(fullCode);

    // LOGICA DE FOCO AUTOMATICO ==> MOVERSE HACIA ADELANTE
    const length: number = NUM_DIGITS - 1; //ALMACENO LONGITUD REFERENTE AL INDEX QUE EMPIEZA EN CERO
    // SI EL VALOR ES DIFERENTE DE VACIO Y EL INDEX ES MENOR A LA CANTIDAD DE DIGITOS RESTADO
    if (value !== '' && index < length) {
      // GUARDAR EN MEMORIA EL CAMPO SIGUIENTE Y VERIFICAR SI EXISTE
      const nextInput: HTMLInputElement | null = inputRefs.current[index + 1];

      // SI EXISTE ELEMENTO INPUT
      if (nextInput) {
        nextInput.focus(); //HACER FOCO AUTOMATICO LLEVANDOTE AL SIGUIENTE INPUT
      }
    }
  };

  // HANDLER PARA BORRAR Y MOVER FOCO HACIA ATRAS
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    //MOVER FOCO HACIA ATRAS AL PRECIONAR 'Backspace'(TECLA DE BORRAR) EN UN CAMPO VACIO
    // SI SE PRESIONABOTON DE BORRAR Y EL INDICE ES MAYOR A CERO Y EL CAMPO DEL INDICE ESTA VACIO
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      // GUARDAR REFERENCIA DE ELEMENTO PREVIO MEDIANTE LA REF DEL INICE RESTANDO 1
      const prevInput: HTMLInputElement | null = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // EFECTO PARA ENFOCAR EL PRIMER INPUT AL MONTRASE/REABRIR
  useEffect(() => {
    // ENFOCAR EL PRIMER INPUT SI ESTA DISPONIBLE
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus(); //FOCO EN EL PRIMER CAMPO
    }
  }, [otp[0] === '']); //SI EL PRIMER INPUT ESTA VACIO REENFOCAR

  return (
    <form className='c-flex c-flex-column c-flex-items-center c-flex-justify-center gap-2' onSubmit={handleSubmit}>
      <div className='container-fields c-flex c-flex-column gap-1 form-basic__field'>
        <label htmlFor='emailCode' className='c-flex c-flex-column c-flex-items-center gap-1/2 form-basic__label'>
          <span className='c-flex c-flex-items-center gap-1/2'>
            <MdOutlineMailLock size={25} color='black' />
            <span>Verificación de Email</span>
          </span>
          <span className='span-required'>Ingresa el código que te enviamos por correo.</span>
        </label>

        <div className='otp-container c-flex c-flex-justify-center gap-1/2'>
          {[...Array(NUM_DIGITS)].map((_, index) => (
            <input
              key={index}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
              id={`code-input-${index}`}
              name={`code-input-${index}`} // AGREGAR EL NAME DE CADA CAMPO
              type='text'
              maxLength={1} //ACEPTAR SOLO  1 DIGITO
              pattern='[0-9]' // ASEGURA PATRON NUMERICO
              // USAR EL VALOR DEL ARRAY "opt"
              value={otp[index] ?? ''}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`Dígito ${index + 1} del código de verificación`}
              //  ESTILO DE VALIDACION (ESTADO GENERAL DE 'emailCode')
              className={`${styleBorderFieldError(formState, 'emailCode')} otp-input`}
              disabled={!isSendingCode} // DESHABILITAR SI EL CODIGO
              autoComplete='off' //EVITAR AUTOCOMPLETADOS
            />
          ))}
        </div>

        {/*MOSTRAR MENSAJE DE ERROR DEL CAMPO*/}
        {renderFieldError(formState, 'emailCode')}
      </div>

      <div className='c-flex c-flex-items-center c-flex-justify-center'>
        <BtnSubmit type='submit' text='Verificar' variant='btn btn__submit' disabled={!formState.emailCode.isValid} />
      </div>
    </form>
  );
};

export default FormVerifyCode;
