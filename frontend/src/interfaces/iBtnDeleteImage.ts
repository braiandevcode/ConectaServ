import type { TIdString } from '../types/typeUUID';
import type { iBtns } from './iBtns';

export interface iBtnDeleteImage extends iBtns {
  onDelete: (id:TIdString) => void;
  id: TIdString;
}
