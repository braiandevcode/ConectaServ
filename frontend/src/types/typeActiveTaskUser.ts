export type TActiveTaskerUser = {
  idUser: string;
  fullName: string;
  userName: string;

  roles: {
    idRole: string;     
    nameRole: string;
  }[];

  tasker: {
    idTasker: string;
    description: string;
    idCategory: string;
  };

  profileImageUrl: string | null;
  experienceImagesUrl: string[];

  imageProfileBase64:string | null;
  imageExpBase64:string[];
};
