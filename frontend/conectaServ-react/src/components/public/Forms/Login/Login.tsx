// // import useMain from "../../../hooks/useMain";
// import useRegister from '../../../hooks/useRegister';
// import { renderFieldError, styleBorderFieldError } from '../../../utils/formUtils';

// const FormLogin = () => {
//   // const { } = useLogin();
//   const { interactedPassword } = useRegister();
//   return (
//     <>
//       <form id='loginForm'>
//         <div className='c-flex c-flex-column gap-1/2 form-basic__field'>
//           <label htmlFor='password' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
//             <span className='c-flex c-flex-items-center gap-1/2'>
//               <i className='fas fa-lock'></i>
//               <span>Contraseña</span>
//             </span>
//             <span className='span-required'>*</span>
//           </label>
//           <input type='password' id='password' autoComplete='password' className={`form-basic__input ${interactedPassword && styleBorderFieldError(formState, 'password')}`} aria-label='Contrasena' placeholder='***********' value={password} onInput={handlePassword} required />
//           {interactedPassword && renderFieldError(formState, 'password')}
//         </div>

//         <div className='c-flex c-flex-column gap-1/2 form-basic__field'>
//           <label htmlFor='email' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
//             <span className='c-flex c-flex-items-center gap-1/2'>
//               <i className='fas fa-envelope'></i>
//               <span>Correo electronico</span>
//             </span>
//             <span className='span-required'>*</span>
//           </label>
//           <input type='text' id='email' className={`form-basic__input ${styleBorderFieldError(formState, 'email')}`} aria-label='Correo electronico' placeholder='Nombre de Usuario o Correo' value={formState.email.value as string} onInput={handleEmail} required />
//           {renderFieldError(formState, 'email')}
//         </div>

//         <div className='flex justify-end mt-1'>
//           <a href='#' className='text-sm text-blue-500 hover:text-blue-700'>
//             ¿Olvidaste tu contraseña?
//           </a>
//         </div>
//         <div className='mb-6'>
//           <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition'>
//             Iniciar sesión
//           </button>
//         </div>

//         <div className='text-center text-sm text-gray-600'>
//           ¿No tienes una cuenta?{' '}
//           <button id='switchToRegister' className='text-blue-500 hover:text-blue-700 font-medium'>
//             Regístrate
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default FormLogin;
