import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useMain from '../../../hooks/useMain';
import { configApiAvatarImage } from '../../../config/configApiAvatarImage';
import Button from '../../Button';
import useTaskerApi from '../../../hooks/useTaskerApi';
import Loader from '../../Loader';
import type { TActiveTaskerUser } from '../../../types/typeActiveTaskUser';
import type { TDataPayloadTaskerSingle } from '../../../types/typeDataPayloadTaskerSingle';
import LoaderBtn from '../../LoaderBtn';
import { ECategoryKey, EYesOrNo } from '../../../types/enums';

// CSS
import './AllServices.css';
import { valueCategoryUI } from '../../../utils/valueCategoryUI';

// TODOS LOS SERVICIOS
const AllSevices = () => {
  const { HOST, QUERY_NAME, QUERY_BG_RANDOM } = configApiAvatarImage;

  // ESTADOS LOCALES
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [loadingTaskerId, setLoadingTaskerId] = useState<string | null>(null);

  // HOOKS DE REACT
  const selectedService = searchParams.get('service');

  // USEREF
  const fetchedRef = useRef<boolean>(false);
  const navigate = useNavigate();

  // CUSTOM HOOKS
  const { taskerData, accessToken, setSelectedTaskerProfile } = useMain();
  const { getDetailsTasker, getTaskers } = useTaskerApi();

  // EFECTO PARA TRAER DATOS DE TASKERS AL MONTARSE
  useEffect(() => {
    if (!accessToken || fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      await getTaskers({ accessToken });
    };

    fetchData();
  }, [accessToken]); // ==> DEPENDEN DEL ACCESSTOKEN

  // FILTRAR TASKERS SEGUN LO SELECCIONADO
  let filteredTaskers: TActiveTaskerUser[] = taskerData;

  // FILTRAR POR SERVICIO
  if (selectedService) {
    filteredTaskers = filteredTaskers.filter((tasker) => tasker.services.some((service) => service.includes(selectedService)));
  }

  // FILTRAR POR DIAS
  if (selectedDays.length > 0) {
    filteredTaskers = filteredTaskers.filter((tasker) => selectedDays.some((day) => tasker.days.includes(day)));
  }

  // FILTRAR POR HORARIOS
  if (selectedHours.length > 0) {
    filteredTaskers = filteredTaskers.filter((tasker) => selectedHours.some((hour) => tasker.hours.includes(hour)));
  }

  //-------------------------------- FUNCIONES--------------------------------//

  // FUNCION PARA VER TASKER ESPECIFICO
  const onSelectTasker = async (idTasker: string): Promise<void> => {
    if (!accessToken) return; //NO SEGUIR
    setLoadingTaskerId(idTasker);
    const tasker: TDataPayloadTaskerSingle | null = await getDetailsTasker({ accessToken, idTasker });
   
    console.log('TASKER: ',  tasker);
    
    setLoadingTaskerId(null);
    if (!tasker) return;
    setSelectedTaskerProfile(tasker);
    navigate(`/client/services/tasker/${tasker.taskerId}`);
  };

  return (
    <>
      {taskerData.length === 0 ? (
        <Loader />
      ) : (
        <div className='main-content c-flex c-flex-column'>
          <div>
            <button className='filters__btn' onClick={() => setFiltersOpen(true)}>
              Filtros
            </button>
            <aside className={`filters__panel ${filtersOpen ? '' : 'hidden'}`}>
              <button className='filters__back' onClick={() => setFiltersOpen(false)}>
                <i className='fas fa-arrow-left'></i>
              </button>
              <h3>Filtros</h3>
              <div className='filter__group'>
                <h4>Ordenar por</h4>
                <label>
                  <input type='checkbox' /> Mejor calificación
                </label>
              </div>
              <div className='filter__group'>
                <h4>Días</h4>
                {['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'].map((day) => (
                  <label key={day}>
                    <input
                      type='checkbox'
                      checked={selectedDays.includes(day)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedDays([...selectedDays, day]);
                        else setSelectedDays(selectedDays.filter((d) => d !== day));
                      }}
                    />{' '}
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                ))}
              </div>
              <div className='filter__group'>
                <h4>Horarios</h4>
                {['mañana', 'tarde', 'noche', '24hs'].map((h) => (
                  <label key={h}>
                    <input
                      type='checkbox'
                      checked={selectedHours.includes(h)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedHours([...selectedHours, h]);
                        else setSelectedHours(selectedHours.filter((s) => s !== h));
                      }}
                    />{' '}
                    {h.charAt(0).toUpperCase() + h.slice(1)}
                  </label>
                ))}
              </div>
              <div className='aplicate__container'>
                <button id='aplicate__btn' className='btn' onClick={() => setFiltersOpen(false)}>
                  Aplicar
                </button>
              </div>
            </aside>
          </div>
          <section className='cards w-full'>
            <h2>{selectedService ? `Resultados para: ${selectedService}` : 'Todos los profesionales'}</h2>
            {filteredTaskers.length === 0 ? (
              <p>No se encontraron profesionales para este servicio.</p>
            ) : (
              filteredTaskers.map((service) => (
                <div key={service.idUser} className='card w-full'>
                  <div className='card__content'>
                    <div className='card__info-container'>
                      <img src={service.imageProfileBase64 ?? `${HOST}${QUERY_NAME}=${service.fullName}&${QUERY_BG_RANDOM}`} className='card__img' alt={`Imagen de perfil de ${service.fullName}`} />
                      <div className='card__info'>
                        <h3>{service.fullName}</h3>
                        {service.category === ECategoryKey.REPAIR ? (
                          <div className='c-flex c-flex-items-center c-flex-column gap-1/2'>
                            <div className='c-flex c-flex-items-center gap-1/2'>
                            <p>Tasker</p>
                            <small>-</small>
                            <p className='card__text-budget'>{`${service.budget?.budgeSelected === EYesOrNo.YES ? 'Con Presupuesto' : 'Sin Presupuesto'}`}</p>
                            </div>
                            <div>
                              <p className='card__text-category'>{service.category ? valueCategoryUI(service.category) : 'Sin categoría' }</p>
                            </div>
                          </div>
                        ) : (
                          <div className='c-flex c-flex-items-center gap-1/2'>
                            <p>Tasker</p>
                            <small>-</small>
                            <div>
                              <p className='card__text-category'>{service.category ? valueCategoryUI(service.category) : 'Sin categoría' }</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='card__description'>
                      <p>{service.tasker.description || 'Sin descripción'}</p>
                    </div>
                    <div className='card__button--container' id={`${service.tasker.idTasker}`}>
                      {loadingTaskerId === service.tasker.idTasker ? (
                        <LoaderBtn text='Cargando...' />
                      ) : (
                        <Button type='button' variant='btn btn__info' onClick={() => onSelectTasker(service.tasker.idTasker)}>
                          Ver perfil
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default AllSevices;
