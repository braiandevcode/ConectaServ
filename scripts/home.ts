
const toggle = document.querySelector('.menu-toggle') as HTMLElement;
const nav = document.querySelector('.nav-links') as HTMLElement;

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});
