import { RiEdit2Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import useMain from '../../../../hooks/useMain';
import Loader from '../../../Loader';
import { configApiAvatarImage } from '../../../../config/configApiAvatarImage';
import Button from '../../../Button';

// CSS
import './ProfileTasker.css'

const ProfileTasker = () => {
  const { userData } = useMain();
  const { HOST, QUERY_NAME, QUERY_BG_RANDOM } = configApiAvatarImage;
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
            <div className='c-flex c-flex-items-center gap-3'>
              <h3>Mi Descripción</h3>

              <Button type='button' variant='btn btn__info' className='btn__edit cursor-pointer'>
                <RiEdit2Line />
              </Button>
            </div>
            <p className='profile__text'>{userData.description ?? 'Aún no has agregado una descripción.'}</p>
            {/* <form>
              
            </form> */}
          </section>

          {/* EXPERIENCIA */}
          <section className='c-flex c-flex-column'>
            <div className='c-flex c-flex-items-center c-flex-justify-between'>
              <h3>Mis Experiencias</h3>
              <Button type='button' variant='btn btn__success' className='btn__edit cursor-pointer'>
                <FaPlus />
              </Button>
            </div>

            <div className='w-3\/4 c-flex taskerExperiences'>
              {userData.imageExpBase64 && userData.imageExpBase64.length > 0 ? (
                userData.imageExpBase64.map((img, i) => (
                  <div key={userData.idImageExp[i]} className='w-1/2 c-flex c-flex-justify-center c-flex-items-center position-relative'>
                    <img src={img} alt={`exp-${userData.userName}`} className='w-full image__profile' />

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
export default ProfileTasker;
