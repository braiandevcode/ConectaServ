import type { ButtonHTMLAttributes } from 'react';
import type { TVariantBtn } from '../types/typeVariantBtn';

// INTERFACE PARA VARIANTES DE ESTILOS EN BOTON UNIVERSAL
export interface iBtns extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TVariantBtn; // ==> TIPADO PERSONAL PARA VARIANTES DE ESTILOS DE BOTONES
  className?: string;
  disabled?: boolean;
  text?:string;
}
