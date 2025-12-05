import type { TDataPayloadTaskerSingle } from '../types/typeDataPayloadTaskerSingle';
export interface iProfileInfoTaskerProps {
  onBackToList?: () => void;
  profileData: TDataPayloadTaskerSingle;
  isEditable: boolean; // ==> BANDERA PARA SABER SI EL PERFIL ES DEL USUARIO LOGEADO O NO
}
