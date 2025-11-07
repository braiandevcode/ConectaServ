import "./../styles/services.css";

import { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useSearchParams } from "react-router";
import Header1 from "../components/Header1";


interface ServiceCard {
  id: string;
  fullName: string;
  imageProfile: string;
  services: string[];
  // stars: number;
  description: string;
}

const Services = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [searchParams] = useSearchParams();

  const selectedService = searchParams.get("service");
  //Estado de filtros (guarda los dias seleccionados, y los horarios seleccionados)
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);

  useEffect(() => {
    console.log("selectedService:", selectedService);
    setServices([]); // Reinicia el estado antes de la nueva carga
    // Llamada al JSON Server
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        //Filtramos a los usuarios que son taskers
        let taskers = data.filter((u: any) => u.roles.includes("tasker"));

        //Si hay servicio filtramos por ese servicio
        if (selectedService) {
          taskers = taskers.filter((u: any) =>
            u["service[]"].includes(selectedService)
          );
        }

        if (selectedDays.length > 0) {
          taskers = taskers.filter((u: any) =>
            u["day[]"]?.some((day: string) =>
              selectedDays.includes(day.toLowerCase())
            )
          );
        }

        // 🔹 Filtro por horarios
        if (selectedHours.length > 0) {
          taskers = taskers.filter((u: any) =>
            u["hour[]"]?.some((hour: string) =>
              selectedHours.includes(hour.toLowerCase())
            )
          );
        }
        console.log("Profesionales despues del filtro:", taskers);
        setServices(taskers);
        // 🔹 Filtro por días

      })

      .catch((err) => console.error("Error al cargar profesionales:", err));
  }, [selectedService, selectedDays, selectedHours]
  );

  return (
    <>
      <Header1 />
      <main className="main-content c-flex c-flex-column">
        {/* Botón de filtros */}
        <div>
          <button
            className="filters__btn"
            onClick={() => setFiltersOpen(true)}
          >
            Filtros
          </button>

          {/* Panel de filtros */}
          <aside className={`filters__panel ${filtersOpen ? "" : "hidden"}`}>
            <button
              className="filters__back"
              onClick={() => setFiltersOpen(false)}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <h3>Filtros</h3>

            <div className="filter__group">
              <h4>Ordenar por</h4>
              <label>
                <input type="checkbox" /> Mejor calificación
              </label>
            </div>
            {"Dias"}
            <div className="filter__group">
              <h4>Días</h4>
              {/* <label>
                <input type="checkbox" /> Lunes
              </label>
              */}
              {["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"].map(
                (day) => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      checked={selectedDays.includes(day)} //Si incluye el dia es true, sino false.
                      onChange={(e) => {
                        if (e.target.checked)
                          setSelectedDays([...selectedDays, day]);
                        else
                          setSelectedDays(
                            selectedDays.filter((d) => d !== day)
                          );
                      }}
                    />{" "}
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                )
              )}
            </div>

            <div className="filter__group">
              <h4>Horarios</h4>
              {["mañana", "tarde", "noche", "24hs"].map((h) => (
                <label key={h}>
                  <input
                    type="checkbox"
                    checked={selectedHours.includes(h)}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedHours([...selectedHours, h]);
                      else
                        setSelectedHours(
                          selectedHours.filter((s) => s !== h)
                        );
                    }}
                  />{" "}
                  {h.charAt(0).toUpperCase() + h.slice(1)}
                </label>
              ))}
            </div>

            <div className="aplicate__container">
              <button
                id="aplicate__btn"
                className="btn"
                onClick={() => setFiltersOpen(false)}
              >
                Aplicar
              </button>
            </div>
          </aside>
        </div>

        {/* Tarjetas de servicios */}
        <section className="cards w-full">
          <h2>            {selectedService
            ? `Resultados para: ${selectedService}`
            : "Todos los profesionales"}</h2>
          {services.length === 0 ? (
            <p>No se encontraron profesionales para este servicio.</p>
          ) : (
            services.map((service) => (
              <div key={service.id} className="card w-full">
                <div className="card__content">
                  <div className="card__info-container">
                    <img
                      src={service.imageProfile}
                      className="card__img"
                      alt={service.fullName}
                    />
                    <div className="card__info">
                      <h3>{service.fullName}</h3>
                      <p>{service.services}</p>
                      {/* <p>{service.stars} estrellas</p> */}
                    </div>
                  </div>
                  <div className="card__description">
                    <p>{service.description || "Sin descripción"}</p>
                  </div>
                  <div className="card__button--container">
                    <button
                      className="viewProfile__btn btn"
                      onClick={() =>
                        (window.location.href = "/infoProvider.html")
                      }
                    >
                      Ver perfil
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Services;

