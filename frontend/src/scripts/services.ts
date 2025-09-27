
const openFilters = document.querySelector(".filters__btn") as HTMLButtonElement;
const closeFilters = document.querySelector(".filters__back") as HTMLButtonElement;
const aplicateBtn = document.getElementById("aplicate__btn") as HTMLButtonElement;
const filtersPanel = document.querySelector(".filters__panel") as HTMLElement;

// (window as any).loadProfessionalsByService = loadProfessionalsByService;

//Lectura de profesionales en la base de datos

export function loadTaskersByService(serviceName: string){
  fetch("http://localhost:3000/services/${serviceName}/taskers")
  .then(response => response.json())
  .then(data => {
    createServices(data);
  })
  .catch(error => {
    console.error("Error cargando los profesionales:", error);
  });
};

//Funcion para crear las cards de profesionales dinamicamente
  function createServices(services: any[]) {
  const cardsContainer = document.querySelector(".cards") as HTMLElement;

  services.forEach(service => {
    const card = document.createElement("div");
    card.classList.add("card", "w-full");

    card.innerHTML = `
      <div class="card__content">
        <div class="card__info-container">
          <img src="${service.imageProfile}" class="card__img">
          <div class="card__info">
            <h3>${service.fullName}</h3>
            <p>${service.stars} estrellas</p>
          </div>
        </div>
        <div class="card__description">
          <p>"${service.description}"</p>
        </div>
        <div class="card__button--container">
          <button class="viewProfile__btn btn">Ver perfil</button>
        </div>
      </div>
    `;

    cardsContainer.appendChild(card);

    // Agrego el evento al botón recién creado
    const btn = card.querySelector(".viewProfile__btn") as HTMLButtonElement;
    btn.addEventListener("click", () => {
      window.location.href = `infoProvider.html`;
    });
    
  });
}

//Funcion para mostrar el panel de filtros (mobile)
const services = () => {
    // Mostrar el panel
    openFilters.addEventListener("click", () => {
      filtersPanel.classList.remove("hidden");
    });
    
    // Ocultar con flechita
    closeFilters.addEventListener("click", () => {
      filtersPanel.classList.add("hidden");
    });
    
    // Ocultar y aplicar filtros
    aplicateBtn.addEventListener("click", () => {
      filtersPanel.classList.add("hidden");
      // Lógica para aplicar los filtros
    });
}
export default services;