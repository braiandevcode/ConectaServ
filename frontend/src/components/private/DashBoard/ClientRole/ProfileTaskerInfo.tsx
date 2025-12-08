import { configApiAvatarImage } from '../../../../config/configApiAvatarImage';
import Button from '../../../Button';
import useMain from '../../../../hooks/useMain';
import Loader from '../../../Loader';
import { parseDbMonto } from '../../../../utils/parsedAndFormatValuesUtils';
import BtnBack from '../../../public/Forms/Register/UserTasker/Buttons/BtnBack';
import { Link, useParams, useNavigate } from 'react-router';
import { IoSend } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import useTaskerApi from '../../../../hooks/useTaskerApi';

// CSS
import './ProfileTaskerInfo.css';
import { valueCategoryUI } from '../../../../utils/valueCategoryUI';
import { EYesOrNo } from '../../../../types/enums';

// PERFIL DE INFO DE TASKER
const ProfileTaskerInfo = () => {
  const { selectedTaskerProfile, onBackToList, accessToken, setSelectedTaskerProfile } = useMain();
  const { getDetailsTasker } = useTaskerApi();
  const { HOST, QUERY_NAME, QUERY_BG_RANDOM } = configApiAvatarImage;

  // ESTADO DE LOADING LOCAL
  const [loadingProfileTasker, setLoadingProfileTasker] = useState<boolean>(false);

  //ABREVIAR
  const C: string | null | undefined = selectedTaskerProfile?.category;

  
  // USEREF
  const fetchedRef = useRef<boolean>(false);

  const navigate = useNavigate(); //==> NAVIGATE DE REACT
  const { idTasker } = useParams(); //LEER ID EN LA URL SI RECARGA EN MISMA RUTA

  // EFECTO PARA TRAER DATOS UN TASKER ESPECIFICO AL MONTARSE COMPONENTE
  useEffect(() => {
    if (!accessToken || fetchedRef.current || !idTasker) return;
    fetchedRef.current = true; //SI YA HIZO FETCH
    const fetchData = async () => {
      setLoadingProfileTasker(true); //MOSTAR LOADER LOCAL
      const tasker = await getDetailsTasker({ accessToken, idTasker });
      setLoadingProfileTasker(false); // QUITAR LOADER LOCAL
      if (!tasker) return;
      setSelectedTaskerProfile(tasker);
      navigate(`/client/services/tasker/${idTasker}`);
    };

    fetchData();
  }, [accessToken, idTasker]); // ==> DEPENDEN DEL ACCESSTOKEN

  // CLASES SECCION RESEÑAS Y DETALLES PRESUPUESTO
  const CLASSES_STARS_BUDGET: string = `${
    selectedTaskerProfile && selectedTaskerProfile.isRepair ? 'w-3/4 profile__section profile__section-starstAndBudget c-flex-justify-center centered c-flex gap-2 p-2' : selectedTaskerProfile && !selectedTaskerProfile.isRepair ? 'profile__section profile__section-starsAndBudget centered c-flex p-2' : 'profile__section profile__section-starsAndBudget centered c-flex p-2'
  }`;

  // SI EXISTE PERFIL Y ES REPARACION HAY DATOS DE PRESUPUESTO
  const isBudget:boolean= Boolean(selectedTaskerProfile && selectedTaskerProfile.isRepair);

  return (
    <>
      {!selectedTaskerProfile || loadingProfileTasker ? (
        <Loader />
      ) : (
        <div className='profile c-flex c-flex-column mb-2 p-1 w-full'>
          <BtnBack handleBtnBack={onBackToList} />

          <div className='profile__header c-flex c-flex-justify-between c-flex-items-center c-flex-wrap gap-1'>
            <div className='profile__info w-full c-flex c-flex-items-center c-flex-column'>
              <div className='w-full profile__imageProfile c-flex c-flex c-flex-column c-flex-items-center gap-1'>
                <div className='w-full c-flex c-flex-column c-flex-items-center gap-1 '>
                  <div className='profile__avatar'>
                    <img src={selectedTaskerProfile.imageProfileBase64 ?? `${HOST}${QUERY_NAME}=${selectedTaskerProfile.fullName}&${QUERY_BG_RANDOM}`} alt='avatar' id={selectedTaskerProfile.idImageProfile} />
                  </div>

                  <div className='profile__userNameAndMsg w-3/4 c-flex  c-flex-items-center c-flex-column gap-1/2'>
                    <h2 className='profile__userNameAndMsg-userName text-center w-1/2'>{selectedTaskerProfile.fullName}</h2>
                    {/* ACA PODRIA SER ENDPOIN DE api/v1/to/chast/:idTasker */}
                    <Link to={'/client/to/chats'}>
                      <Button variant='btn btn__success' className='btn__message'>
                        <IoSend />
                        Enviar Mensaje
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <section className={CLASSES_STARS_BUDGET}>
              <div className='c-flex c-flex-column c-flex-items-center gap-1/2'>
                <div className='p-1 c-flex c-flex-items-center gap-1/2'>
                  <p className='profile__categoryText text-center'>{C ? valueCategoryUI(C) : 'Sin Categoría'}</p>
                </div>

                <div className='profile__cityAndStart c-flex c-flex-items-center gap-1'>
                  <div className='c-flec c-flex-column gap-1'>
                    <p className='profile__cityAndStart-cityText'>{selectedTaskerProfile.city}</p>
                    <h4 className='profile__cityAndStartRole text-center'>Tasker</h4>
                  </div>
                </div>
                <div className='cursor-pointer profile__rating'>★★★★☆</div>
              </div>
              {isBudget && (
                <div className='profileSection-details-budget c-flex c-flex-column gap-2'>
                  <p className='profileSection-details-budget__reinsert c-flex c-flex-column c-flex-items-center gap-1/2'>
                    <span className='profileSection-details-budget__reinsert-title'>¿Reintegro por contratación?:</span>
                    <span className='profileSection-details-budget__reinsert-option'>{selectedTaskerProfile.budget?.reinsertSelected === EYesOrNo.YES ? 'Si' : 'No'}</span>
                  </p>

                  <p className='profileSection-details-budget__reinsert  c-flex c-flex-column c-flex-items-center gap-1/2'>
                    <span className='profileSection-details-budget-title'>¿Cobro Presupuesto?:</span>
                    <span className='profileSection-details-budget-option'>{selectedTaskerProfile.budget?.budgeSelected === EYesOrNo.YES ? 'Si' : 'No'}</span>
                  </p>
                  <p className='profileSection-details-budget__price  c-flex c-flex-column c-flex-items-center gap-1/2'>
                    <span className='profileSection-details-budget__price-title'>Costo de visita para presupuesto:</span>
                    <span className='profileSection-details-budget__price-amount'>{`$${parseDbMonto(String(selectedTaskerProfile.budget?.amount))}`}</span>
                  </p>
                </div>
              )}
            </section>
          </div>

          <section className='p-2 profile__section'>
            <h3 className='profile__description-header'>¿Por qué Elegirme?</h3>
            <p className='profile__description-body'>{selectedTaskerProfile.description || 'El Tasker aún no tiene una descripción.'}</p>
          </section>

          <section className='p-2 profile__section'>
            <h3 className='profile__imagesExperience__header'>Mis experiencias</h3>
            <div className='gallery profile__imagesExperience-gallery'>
              {selectedTaskerProfile.imageExpBase64 && selectedTaskerProfile.imageExpBase64.length > 0 ? (
                selectedTaskerProfile.imageExpBase64.map((img, i) => (
                  <div key={selectedTaskerProfile.idImageExp[i]} className='gallery__item  w-full'>
                    <img src={img} alt={`Experiencia ${i}`} className='w-full' id={selectedTaskerProfile.idImageExp[i]} />
                  </div>
                ))
              ) : (
                <p className='profile__text'>No hay fotos de experiencia.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProfileTaskerInfo;
