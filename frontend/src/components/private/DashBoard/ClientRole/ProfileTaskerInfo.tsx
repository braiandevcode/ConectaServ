import type { iProfileInfoTaskerProps } from '../../../../interfaces/iProfileInfoTaskerPropos';
import { configApiAvatarImage } from '../../../../config/configApiAvatarImage';
import Button from '../../../Button';
import useMain from '../../../../hooks/useMain';
import Loader from '../../../Loader';
import { parseDbMonto } from '../../../../utils/parsedAndFormatValuesUtils';
import BtnBack from '../../../public/Forms/Register/UserTasker/Buttons/BtnBack';
import { ECategoryKey } from '../../../../types/enums';
import type { TCategoryTasker } from '../../../../types/typeCategoryTasker';
import { Link } from 'react-router';

// CSS
import './ProfileTaskerInfo.css';
import { IoSend } from 'react-icons/io5';

// PERFIL DE INFO DE TASKER
const ProfileTaskerInfo = ({ onBackToList }: iProfileInfoTaskerProps) => {
  const { selectedTaskerProfile } = useMain();
  const { HOST, QUERY_NAME, QUERY_BG_RANDOM } = configApiAvatarImage;

  //ABREVIAR
  const C: string | null | undefined = selectedTaskerProfile?.category;

  // DEPENDIENDO DE CATEGORIA PASAR A FORMATO LEGIBLE AL USUARIO FINAL
  const category: TCategoryTasker = C === ECategoryKey.REPAIR ? 'Reparación y Mantenimiento' : C === ECategoryKey.GARDEN ? 'Jardinería' : C === ECategoryKey.MOVE ? 'Mudanzas y Transportes' : undefined;

  return (
    <>
      {!selectedTaskerProfile ? (
        <Loader />
      ) : (
        <div className='profile c-flex c-flex-column mb-2 p-1 w-full'>
          <BtnBack handleBtnBack={onBackToList ? onBackToList : () => {}} />

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
                    <Link to={'/to/chats'}>
                      <Button variant='btn btn__success' className='btn__message'>
                        <IoSend />
                        Enviar Mensaje
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className='c-flex c-flex-column c-flex-items-center gap-1/2'>
                  <div className='p-1 c-flex c-flex-items-center gap-1/2'>
                    <p className='profile__categoryText text-center'>{category}</p>
                  </div>

                  <div className='profile__cityAndStart c-flex c-flex-items-center gap-1'>
                    <div className='c-flec c-flex-column gap-1'>
                      <p className='profile__cityAndStart-cityText'>{selectedTaskerProfile.city}</p>
                      <h4 className='profile__cityAndStartRole text-center'>Tasker</h4>
                    </div>
                  </div>
                  <div className='cursor-pointer profile__rating'>★★★★☆</div>
                </div>
              </div>
            </div>

            <section className='centered profile__details_budget profile__section p-2'>
              {selectedTaskerProfile.isRepair && (
                <div className='profileSection-details-budget c-flex c-flex-column gap-2'>
                  <p className='profileSection-details-budget__reinsert c-flex c-flex-column c-flex-items-center gap-1/2'>
                    <span className='profileSection-details-budget__reinsert-title'>¿Reintegro por contratación?:</span>
                    <span className='profileSection-details-budget__reinsert-option'>{selectedTaskerProfile.budget?.reinsertSelected === 'yes' ? 'Si' : 'No'}</span>
                  </p>

                  <p className='profileSection-details-budget__reinsert  c-flex c-flex-column c-flex-items-center gap-1/2'>
                    <span className='profileSection-details-budget-title'>¿Cobro Presupuesto?:</span>
                    <span className='profileSection-details-budget-option'>{selectedTaskerProfile.budget?.budgeSelected === 'yes' ? 'Si' : 'No'}</span>
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
                    <img src={img} alt={`Experiencia ${i}`} className='w-full' id={selectedTaskerProfile.idImageExp[i]}/>
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
