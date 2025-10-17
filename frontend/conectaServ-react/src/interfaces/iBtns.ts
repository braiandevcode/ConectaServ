import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
// import type { TTypeBtn } from '../types/types';
import type { TVariantBtn } from '../types/typeVariantBtn';

// INTERFACE PARA VARIANTES DE ESTILOS EN BOTON UNIVERSAL
export interface iBtns extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: TVariantBtn; // ==> TIPADO PERSONAL PARA VARIANTES DE ESTILOS DE BOTONES
  handler?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
