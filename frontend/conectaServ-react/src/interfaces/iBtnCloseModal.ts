import type { TVariantBtn } from "../types/typeVariantBtn";

export interface iBtnCloseModal{
    variant:TVariantBtn;
    className:string;
    onCloseModal: () => void;
}