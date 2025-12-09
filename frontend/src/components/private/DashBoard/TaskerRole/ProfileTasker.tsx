import { RiEdit2Line } from 'react-icons/ri';
import { FaCheckCircle, FaPlus, FaTrash } from 'react-icons/fa';
import useMain from '../../../../hooks/useMain';
import Loader from '../../../Loader';
import { configApiAvatarImage } from '../../../../config/configApiAvatarImage';
import Button from '../../../Button';

// CSS
import './ProfileTasker.css';
import Description from '../../../public/Forms/Description';
import BtnSubmit from '../../../BtnSubmit';
import useTasker from '../../../../hooks/useTasker';
import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { MdCancel } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import useTaskerApi from '../../../../hooks/useTaskerApi';
import useUserApi from '../../../../hooks/useUserApi';
import type { TDataPayloadUser } from '../../../../types/typeDataPayloadUser';
import SectionLoader from '../../../SectionLoader';

// PERFIL PANEL DE TASKER
const ProfileTasker = () => {
  // ESTADOS GLOBALES
  const [editImage, setEditImage] = useState<boolean>(false);
  const { userData, accessToken, setUserData, setLoading, loading } = useMain();
  const { edit, setEdit } = useTasker();
  const [idImgExp, setIdImgExp] = useState<string | null>(null);
  const { deleteImageExpById } = useTaskerApi();
  const { getDataUser } = useUserApi();
  const { HOST, QUERY_NAME, QUERY_BG_RANDOM } = configApiAvatarImage;

  // MOSTRAR U OCULTAR EDICION DE DESCRIPCION
  const toggleEditDescription = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEdit(!edit);
  };

  // MOSTRAR UI DE EDICION/ELIMINACION DE IMAGENES
  const toggleEditImagesExp = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditImage(!editImage);
  };

  // TRAER DATOS DEL USER
  const fechedData = useCallback(async (): Promise<void> => {
    if (!accessToken) return;
    const data: TDataPayloadUser = await getDataUser({ accessToken });
    setUserData(data);
  }, [accessToken]);

  // ELIMINAR IMAGEN
  const deleteImage = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (!accessToken) return;

    const id = e.currentTarget.id;
    setIdImgExp(id);
    setLoading(true);

    await deleteImageExpById({ accessToken, idImage: id });
    await fechedData(); //REFREZCAR DESPUES DE ELIMINAR

    setIdImgExp(null);
    setLoading(false);
  };

  // FETCH INICIAL
  useEffect(() => {
    if(!accessToken) return;
    setLoading(true);
    fechedData().finally(() => setLoading(false))
  }, [accessToken,fechedData]);

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
                <img
                  src={
                    userData.imageProfileBase64 ??
                    `${HOST}${QUERY_NAME}=${userData.fullName}&${QUERY_BG_RANDOM}`
                  }
                  alt='avatar'
                />
              </div>

              <div className='c-flex c-flex-items-center gap-1'>
                <h2>{userData.userName}</h2>
                <Button type='button' variant='btn btn__success' className='btn__edit cursor-pointer'>
                  <RiEdit2Line />
                  Editar
                </Button>
              </div>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <section className='profile__section'>
            {!edit ? (
              <>
                <div className='c-flex c-flex-items-center gap-3'>
                  <h3>Mi Descripción</h3>
                  <Button
                    type='button'
                    variant='btn btn__success'
                    className='btn__edit cursor-pointer'
                    onClick={toggleEditDescription}
                  >
                    <RiEdit2Line />
                    Editar
                  </Button>
                </div>
                <p className='profile__text'>
                  {userData.description ?? 'Aún no has agregado una descripción.'}
                </p>
              </>
            ) : (
              <form className='c-flex c-flex-column c-flex-items-center gap-3'>
                <Description />
                <div className='c-flex c-flex-items-center gap-1/2'>
                  <BtnSubmit variant='btn btn__success' text='Confirmar' IconReact={FaCheckCircle} />
                  <Button type='button' variant='btn btn__close' onClick={toggleEditDescription}>
                    <MdCancel /> Cancelar
                  </Button>
                </div>
              </form>
            )}
          </section>

          {/* EXPERIENCIA */}
          <section className='c-flex c-flex-column'>
            {!editImage ? (
              <div
                className={
                  !editImage
                    ? 'c-flex c-flex-items-center p-3 c-flex-justify-between'
                    : 'c-flex c-flex-items-center p-3 c-flex-justify-start'
                }
              >
                <h3>Mis Experiencias</h3>
                <div className='c-flex c-flex-items-center gap-1'>
                  <Button type='button' variant='btn btn__success' className='btn__edit cursor-pointer'>
                    <label htmlFor='edit-file' className='cursor-pointer'>
                      <input type='file' hidden id='edit-file' />
                      <FaPlus size={30} />
                    </label>
                  </Button>

                  {userData.imageExpBase64.length > 0 && (
                    <Button
                      type='button'
                      variant='btn btn__close'
                      className='btn__edit cursor-pointer'
                      onClick={toggleEditImagesExp}
                    >
                      <FaTrash size={30} />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              userData.imageExpBase64.length > 0 && (
                <Button
                  type='button'
                  variant='btn btn__ghost'
                  className='to-right btn__deteleteImageCancel cursor-pointer mb-2'
                  onClick={toggleEditImagesExp}
                >
                  <AiOutlineClose size={30} />
                </Button>
              )
            )}

            <div className={editImage ? 'w-full c-flex taskerExperiences taskerExperiences--edit' : 'w-full c-flex taskerExperiences'}>
              {userData.imageExpBase64 && userData.imageExpBase64.length > 0 ? (
                userData.imageExpBase64.map((img, i) => (
                  <div
                    key={userData.idImageExp[i]}
                    className='w-1/2 c-flex c-flex-justify-center c-flex-items-center position-relative'
                  >
                    {editImage && (
                      <Button
                        type='button'
                        variant='btn btn__ghost'
                        className='w-full btn__deleteImage cursor-pointer position-absolute'
                        id={userData.idImageExp[i]}
                        onClick={deleteImage}
                      >
                        <FaTrash size={120} className='btn__deleteImage-icon w-full' />
                      </Button>
                    )}

                    {loading && userData.idImageExp[i] === idImgExp ? (
                      <SectionLoader />
                    ) : (
                      <img
                        src={img}
                        alt={`exp-${userData.userName}`}
                        className={editImage ? 'w-full image__profile cursor-pointer' : 'w-full image__profile'}
                      />
                    )}
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

