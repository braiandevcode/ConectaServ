const toggle = document.querySelector('.menu-toggle') as HTMLElement;
const nav = document.querySelector('.nav-links') as HTMLElement;

// FUNCION HOME QUE SE EJECUTA EN MAIN PRINCIPAL
const home = () => {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
export default home;
