import type { TImage } from '../types/types';
// COMPONENTE IMAGEN
const Image = ({ src, className, alt, attribute }: TImage) => {
  console.log(attribute);

  return <img src={src} alt={alt} className={className} {...(attribute ? attribute : {} )}></img>;
};
export default Image;
