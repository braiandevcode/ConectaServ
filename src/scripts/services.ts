const openFilters = document.querySelector(".filters__btn") as HTMLButtonElement;
const closeFilters = document.querySelector(".filters__back") as HTMLButtonElement;
const aplicateBtn = document.getElementById("aplicate__btn") as HTMLButtonElement;
const filtersPanel = document.querySelector(".filters__panel") as HTMLElement;

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