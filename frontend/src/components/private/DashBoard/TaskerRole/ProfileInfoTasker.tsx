import useMain from '../../../../hooks/useMain';
import { configApiAvatarImage } from '../../../../config/configApiAvatarImage';
import { RiEdit2Line } from 'react-icons/ri';
import Button from '../../../Button';

const ProfileInfoTasker = () => {
  const { HOST, QUERY_NAME, QUERY_BG_RANDOM } = configApiAvatarImage; //DESESTRUCTURO CONFIGURACION
  const { userData } = useMain();
  return (
    <>
      {!userData ? (
        <div>
          <h2>No hay datos de perfil</h2>
        </div>
      ) : (
        <div className='profile'>
          {/* HEADER + DATOS PERSONALES */}
          <div className='profile__header'>
            <div className='profile__info c-flex c-flex-items-center gap-1'>
              <div className='profile__avatar position-relative'>
                <img src={userData.profileImageId ?? `${HOST}${QUERY_NAME}=${userData.fullName}&${QUERY_BG_RANDOM}`} alt='avatar' />

                {/* ICONO EDITAR AVATAR */}
                <Button type='button' variant='btn btn__success' className='profile_image position-absolute to-right c-flex c-flex-items-center cursor-pointer' style={{ top: '0.5rem', right: '0.5rem' }}>
                  <RiEdit2Line />
                </Button>
              </div>

              <div className='c-flex c-flex-items-center gap-1'>
                <h2>{userData.userName}</h2>

                {/* ICONO EDITAR USERNAME */}
                <Button type='button' variant='btn btn__success' className='cursor-pointer'>
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
              <Button type='button' variant='btn btn__success' className='cursor-pointer'>
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
              <Button type='button' variant='btn btn__success' className='cursor-pointer'>
                <RiEdit2Line />
              </Button>
            </div>

            <div className='w-full gallery'>
              {userData.experienceImageIds && userData.experienceImageIds.length > 0 ? (
                userData.experienceImageIds.map((img, index) => (
                  <div key={index} className='gallery__item w-full c-flex c-flex-items-center gap-2 position-relative'>
                    <img src={img} alt={`exp-${index}`} className='w-full' />

                    {/* EDITAR FOTO INDIVIDUAL */}
                    <Button type='button' variant='btn btn__success' className='position-absolute cursor-pointer' style={{ top: '0.5rem', right: '0.5rem' }}>
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
