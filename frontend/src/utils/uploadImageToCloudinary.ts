import { endpointCloud } from "../config/configEnpointCloud";
import type { TImageCloudinary } from "../types/typeImageCloudinary";
import type { TUploadPreset } from "../types/typeUploadPressets";


// SUBIDA DE IMAGEN A CLOUDINARY
export const uploadImageToCloudinary = async (file: File, uploadPreset: TUploadPreset): Promise<TImageCloudinary> => {
  const { HOST, VERSION, CLOUD_NAME, PATH_FOLDER } = endpointCloud; //DESESTRUCTURACION OBJETO DE DATOS PARA ENDPOINT DE CLOUD
  try {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const res: Response = await fetch(`${HOST}/${VERSION}/${CLOUD_NAME}/${PATH_FOLDER}`, {
      method: 'POST',
      body: formData,
    });

    // SI ESTA TODO OK
    if (!res.ok) {
      throw new Error('Fallo la subida a Cloudinary');
    }

    const data = await res.json(); //CONVERTIR A JSON  
    return data; //RETORNA LA DATA 

  } catch (error) {
    throw error;
  }
};
