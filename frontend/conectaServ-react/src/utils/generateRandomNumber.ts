const generateRandomNumber = () => {
  // Genera un número aleatorio entre 100000 y 999999
  return Math.floor(100000 + Math.random() * 900000);
};

export default generateRandomNumber;
