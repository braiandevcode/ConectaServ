const scrolledTop = () => {
  // SCROLLEAMOS SUAVE HACIA ARRIBA EN CADA EVENTO
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export default scrolledTop;
