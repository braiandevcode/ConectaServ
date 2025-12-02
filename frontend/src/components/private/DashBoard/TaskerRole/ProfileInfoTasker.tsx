import useMain from '../../../../hooks/useMain';
import { configApiAvatarImage } from '../../../../config/configApiAvatarImage';
import { RiEdit2Line } from 'react-icons/ri';
import Button from '../../../Button';
import Loader from '../../../Loader';

import './ProfileInfoTasker.css';
import { FaPlus } from 'react-icons/fa';

// PERFIL PRINCIPAL PARA TASKER
const ProfileInfoTasker = () => {
  const { HOST, QUERY_NAME, QUERY_BG_RANDOM } = configApiAvatarImage; //DESESTRUCTURO CONFIGURACION
  const { userData } = useMain();
  
  return (
    <>
      {!userData ? (
        <Loader />
      ) : (
        <div className='profile'>
          {/* HEADER + DATOS PERSONALES */}
          <div className='profile__header'>
            <div className='profile__info c-flex c-flex-items-center gap-1'>
              <div className='profile__avatar position-relative'>
                <img src={userData.imageProfileBase64 ?? `${HOST}${QUERY_NAME}=${userData.fullName}&${QUERY_BG_RANDOM}`} alt='avatar' />
              </div>

              <div className='c-flex c-flex-items-center gap-1'>
                <h2>{userData.userName}</h2>

                {/* ICONO EDITAR USERNAME */}
                <Button type='button' variant='btn btn__info' className='cursor-pointer'>
                  <RiEdit2Line />
                </Button>
              </div>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <section className='profile__section'>
            <div className='c-flex c-flex-items-center c-flex-justify-between'>
              <h3>Mi Descripción</h3>

              {/* ICONO EDITAR DESCRIPCIÓN */}
              <Button type='button' variant='btn btn__info' className='btn__edit cursor-pointer'>
                <RiEdit2Line />
              </Button>
            </div>

            <p className='profile__text'>{userData.description ?? 'Aún no has agregado una descripción.'}</p>
          </section>

          {/* EXPERIENCIA */}
          <section className='profile__section'>
            <div className='c-flex c-flex-items-center c-flex-justify-between'>
              <h3>Fotos experiencias</h3>

              {/* ICONO EDITAR O AGREGAR MÁS FOTOS */}
              <Button type='button' variant='btn btn__success' className='btn__edit cursor-pointer'>
                <FaPlus />
              </Button>
            </div>

            <div className='w-full c-flex'>
              {userData.imageExpBase64 && userData.imageExpBase64.length > 0 ? (
                userData.imageExpBase64.map((img) => (
                  <div key={userData.sub} className='w-1/2 c-flex c-flex-items-center gap-1 position-relative'>
                    <img src={img} alt={`exp-${userData.userName}`} className='w-full image__profile' />

                    {/* EDITAR FOTO INDIVIDUAL */}
                    <Button type='button' variant='btn btn__info' className='btn__edit position-absolute cursor-pointer'>
                      <RiEdit2Line />
                    </Button>
                  </div>
                ))
              ) : (
                <p className='profile__text'>Aún no agregaste imágenes.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProfileInfoTasker;
