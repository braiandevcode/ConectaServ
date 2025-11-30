import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useMain from '../../../../hooks/useMain';
import { configApiAvatarImage } from '../../../../config/configApiAvatarImage';
import Button from '../../../Button';
import useTaskerApi from '../../../../hooks/useTaskerApi';

const AllSevices = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  // const [services] = useState<ServiceCard[]>([]);
  const [searchParams] = useSearchParams();

  const selectedService = searchParams.get('service');
  //Estado de filtros (guarda los dias seleccionados, y los horarios seleccionados)
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const fetchedRef = useRef(false); //REF PARA EVITAR LLAMADAD DUPLICADAS

  const navigate = useNavigate();
  const { taskerData, accessToken } = useMain();
  const { getTaskers } = useTaskerApi();

  const { HOST, QUERY_BG_RANDOM, QUERY_NAME } = configApiAvatarImage;

  // TRAER DATOS DE TODOS LOS TASKERS
  useEffect(() => {
    if (!accessToken || fetchedRef.current) return; // SI NO HAY TOKEN Y SI EL REF YA ES TRUE
    fetchedRef.current = true; //PASAR A TRUE EN ESTE INSTANTE

    const fetchData = async () => {
      await getTaskers({ accessToken });
    };
    
    fetchData();
  }, [accessToken]);

  return (
    <>
        <div className='main-content c-flex c-flex-column'>
          <div>
            <button className='filters__btn' onClick={() => setFiltersOpen(true)}>
              Filtros
            </button>

            {/* Panel de filtros */}
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
              {'Dias'}
              <div className='filter__group'>
                <h4>Días</h4>
                {/* <label>
                <input type="checkbox" /> Lunes
              </label>
              */}
                {['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'].map((day) => (
                  <label key={day}>
                    <input
                      type='checkbox'
                      checked={selectedDays.includes(day)} //Si incluye el dia es true, sino false.
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

          {/* Tarjetas de servicios */}
          <section className='cards w-full'>
            <h2> {selectedService ? `Resultados para: ${selectedService}` : 'Todos los profesionales'}</h2>
            {taskerData.length === 0 ? (
              <p>No se encontraron profesionales para este servicio.</p>
            ) : (
              taskerData.map((service) => (
                <div key={service.sub} className='card w-full'>
                  <div className='card__content'>
                    <div className='card__info-container'>
                      <img src={service.profileImage ?? `${HOST}${QUERY_NAME}=${service.fullName}&${QUERY_BG_RANDOM}`} className='card__img' alt={`Imagen de perfil de ${service.fullName}`} />
                      <div className='card__info'>
                        <h3>{service.fullName}</h3>
                        <p>{service.services}</p>
                        {/* <p>{service.stars} estrellas</p> */}
                      </div>
                    </div>
                    <div className='card__description'>
                      <p>{service.description || 'Sin descripción'}</p>
                    </div>
                    <div className='card__button--container'>
                      <Button type='button' variant='btn btn__info' onClick={() => navigate(`infoTasker`)}>
                        Ver perfil
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
    </>
  );
};

export default AllSevices;
