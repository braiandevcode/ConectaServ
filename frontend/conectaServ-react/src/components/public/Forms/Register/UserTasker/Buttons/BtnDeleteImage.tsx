import { FaTrashAlt } from "react-icons/fa";
import Button from "../../../../../Button";
import type { iBtnDeleteImage } from "../../../../../../interfaces/iBtnDeleteImage";

// BOTON PARA ELIMINAR IMAGEN O IMAGENES PREVIAS
const BtnDeleteImage = ({ variant, id, onDelete}: iBtnDeleteImage) => {
  return (
    <Button variant='btn btn__close' aria-label='Eliminar imagen' className={`cursor-pointer position-absolute form-groupProfile__btn-trash ${variant}`}  data-image={id} onClick={() => onDelete(id)}>
      <FaTrashAlt size={20} color='#FFF' />
    </Button>
  );
};

export default BtnDeleteImage;
