import {type JSX } from 'react';

// INTERFACE PARA OBJETO DE MODALES
export interface iModalsComponents {
    ModalRole: () => JSX.Element;
    ModalVerifyEmail: () =>JSX.Element;
    ModalSuccess: () => JSX.Element;
    ModalError: () => JSX.Element;
}