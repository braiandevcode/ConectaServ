const toggle = document.querySelector('.menu-toggle') as HTMLElement;
const nav = document.querySelector('.nav-links') as HTMLElement;
const dropdownToggle = document.querySelector('.dropdown-toggle') as HTMLButtonElement;
const dropdown = document.querySelector('.dropdown') as HTMLElement;

// FUNCION HOME QUE SE EJECUTA EN MAIN PRINCIPAL
const home = () => {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  dropdownToggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
  });
};
export default home;
