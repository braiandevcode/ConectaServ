import scrolledTop from "../../../../utils/scrollTop";
import Button from "../../../Button";

const NavInfoTasker = () => {
    return(
        <>
            <Button type="button" variant="btn btn__info" onClick={() => scrolledTop()}>Ver Información</Button>
        </>
    )
}

export default NavInfoTasker;