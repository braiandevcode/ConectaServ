import { FaTrashAlt } from "react-icons/fa";
import Button from "../../../../../Button";
import type { iBtnDeleteImage } from "../../../../../../interfaces/iBtnDeleteImage";

// CSS
import './BtnDeleteImage.css'

// BOTON PARA ELIMINAR IMAGEN O IMAGENES PREVIAS
const BtnDeleteImage = ({ variant, id, onDelete}: iBtnDeleteImage) => {
  return (
    <Button variant='btn btn__close' aria-label='Eliminar imagen' className={`btnCloseImage position-absolute form-groupProfile__btn-trash ${variant}`}  data-image={id} onClick={() => onDelete(id)}>
      <FaTrashAlt size={15} color='#FFF' />
    </Button>
  );
};

export default BtnDeleteImage;
