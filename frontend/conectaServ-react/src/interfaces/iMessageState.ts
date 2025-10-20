// INTERFACE PARA MENSAJES AL USUARIO DE EXITO O ERROR
export interface iMessageState{
  type: 'success' | 'error' | null,
  title: string | null;
  text: string | null
}