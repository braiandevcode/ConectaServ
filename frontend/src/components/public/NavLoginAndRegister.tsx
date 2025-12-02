import { FiUserPlus } from "react-icons/fi"
import Button from "../Button"
import useHeader from "../../hooks/useHeader";
import LinkSigIn from "./LinkSigIn";
// NAVEGACION DE LOGIN O REGISTRO
const NavLoginAndRegister = () => {
    const { openRole } = useHeader(); // CUSTOM HOOK QUE USA CONTEXT LOGIN
    return(
        <>
            <LinkSigIn />
            <Button type='button' className='c-flex-self-center btn color btnRegister c-flex c-flex-items-center gap-1/2 auth-wrapper__register' onClick={openRole}>
                <span>Registrarse</span>
                <FiUserPlus />
            </Button>
        </>
    )
}

export default NavLoginAndRegister;