import type { TImage } from "../types/typeImage";

// COMPONENTE IMAGEN
const Image = ({ src, className, alt, attribute }: TImage) => {
  const attr = attribute ? {...attribute} : {} // ==> SI TIENE ATRIBUTOS DE IMAGEN AÑADIR SINO VACIO
  return <img src={src} alt={alt} className={className} {...attr}></img>;
};
export default Image;
