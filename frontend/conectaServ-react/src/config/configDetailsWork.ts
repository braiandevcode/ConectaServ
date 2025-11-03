import type { TOptionItem } from '../types/typeOptionItem';

// HABITOS/CONTEXTOS DE TRABAJOS
export const CONTEXTS: TOptionItem[] = [
  { label: 'Hogar', value: 'hogar' },
  { label: 'Comercios', value: 'comercios' },
  { label: 'Oficina', value: 'oficina' },
  { label: 'Industria', value: 'industria' },
];

// DIAS DE TRABAJOS
export const DATE_DAYS: TOptionItem[] = [
  { label: 'Lunes', value: 'lunes' },
  { label: 'Martes', value: 'martes' },
  { label: 'Miércoles', value: 'miércoles' },
  { label: 'Jueves', value: 'jueves' },
  { label: 'Viernes', value: 'viernes' },
  { label: 'Sabado', value: 'sabado' },
  { label: 'Domingo', value: 'domingo' },
];

// HORARIOS DE TRABAJOS
export const DATE_HOUR: TOptionItem[] = [
  { label: 'Mañana', value: 'mañana' },
  { label: 'Tarde', value: 'tarde' },
  { label: 'Noche', value: 'noche' },
  { label: 'Las 24hs', value: 'las 24hs' },
];

//CONFIGURACION DE VALORES REALES SEGUN CADA CADA TYPE
export const TITLES_GROUP_CHECKS_MAP: Record<string, string> = {
  service: 'Tus servicios',
  context: 'Área de servicio',
  day: 'Días',
  hour: 'Horarios',
};
