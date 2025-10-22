import { type JSX } from 'react';
export type TGlobalModalComponents = {
  ModalRole: () => JSX.Element;
  // ModalVerifyEmail: () =>JSX.Element;
  ModalSuccess: () => JSX.Element;
  ModalError: () => JSX.Element;
};
