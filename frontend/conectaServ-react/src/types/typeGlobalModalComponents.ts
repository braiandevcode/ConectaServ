import { type JSX } from 'react';
export type TGlobalModalComponents = {
  ModalRole: ({ oncloseModal}: { oncloseModal: (cb?: () => void) => void }) => JSX.Element;
  ModalLogin: () => JSX.Element;
  ModalIdentifyEmail: () => JSX.Element;
  ModalSuccess: () => JSX.Element;
  ModalError: ({ oncloseModal }: { oncloseModal: (cb?: () => void) => void }) => JSX.Element;
};
