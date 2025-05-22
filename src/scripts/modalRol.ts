// const $BTN_REGISTER = document.querySelector('.btnRegister') as HTMLButtonElement;
const $MODAL_ROLE: HTMLElement | null = document.querySelector('.modal-rol');
export default function modalRol() {

    // ESCUCHAR EL TARGET --- FALTA TERMINAR-----
    document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        // MOSTRAR MODAL DE ROLES
        if (target.matches('.btnRegister')) {
            console.log("Yes");
            $MODAL_ROLE?.classList.remove('modal-rol--hidden');
        }

        // CERRAR MODAL DE ROLES
        if (target.matches('.modal-rol__close-btn')) {
            console.log('Cerrar modal');
             $MODAL_ROLE?.classList.add('modal-rol--hidden');
        }

        // ESCUCHAR SI ELIGIÓ CLIENTE
        if (target.closest('[data-role="cliente"]')) {
            console.log('Seleccionaste cliente');
        }

        // ESCUCHAR SI ELIGIÓ PROFESIONAL
        if (target.closest('[data-role="profesional"]')) {
            console.log('Seleccionaste profesional');
        }
    });
}
