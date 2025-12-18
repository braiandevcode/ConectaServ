import type { TResource } from './typeResource';

export type TImageCloudinary = {
  public_id: string; // Identificador de Cloudinary
  url: string; // URL directa de la imagen en Cloudinary
  bytes: number;
  display_name: string;
  format: string;
  type: string;
  resource_type: TResource;
  secure_url: string;
  signature: string;
};
