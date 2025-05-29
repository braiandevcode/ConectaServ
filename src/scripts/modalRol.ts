// const $BTN_REGISTER = document.querySelector('.btnRegister') as HTMLButtonElement;
const $MODAL_ROLE: HTMLElement | null = document.querySelector('.modal-rol');
export default function modalRol() {

    // ESCUCHAR EL TARGET --- FALTA TERMINAR-----
    document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        // MOSTRAR MODAL DE ROLES
        if (target.matches('.btnRegister')) {
            $MODAL_ROLE?.classList.remove('modal-rol--hidden');
        }

        // CERRAR MODAL DE ROLES
        if (target.matches('.modal-rol__close-btn')) {
            $MODAL_ROLE?.classList.add('modal-rol--hidden');
        }
    });
}
