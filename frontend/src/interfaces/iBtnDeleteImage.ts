import type { iBtns } from './iBtns';
export interface iBtnDeleteImage extends iBtns {
  onDelete: (id:string) => void;
  id: string
}
