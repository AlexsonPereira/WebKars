import { Dispatch, ReactNode, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

export interface IAuthContext {
  token: string | null;
  registerUser: (body: IUserReq) => Promise<void>;
  login: (body: IReqLogin) => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  updateUser: (body: any) => Promise<void>;
  getMyProfile: () => Promise<void>;
  user: IUserRes;
  setUser: Dispatch<SetStateAction<IUserRes>>;
  navigate: NavigateFunction;
  deleteUser: () => Promise<void>;
  updateAddress: (body: IAddressUpdate) => Promise<void>;
  userId: string | undefined;
  date: string;
}

export interface IResetPasswordContext {
  sendEmailResetPassword: (body: IEmail) => Promise<void>;
  sendPasswordReset: (body: IPassword, token: string) => Promise<void>;
}

export interface IVehicleContext {
  adVehicle: IVehiclePost[];
  addVehicle: (body: IVehicleBody) => void;
  createVehicle: (body: IVehiclePost) => Promise<void>;
  allCars: IVehiclePost[];
  setAllCars: Dispatch<SetStateAction<IVehiclePost[]>>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  inputModal: number[];
  setInputModal: Dispatch<SetStateAction<number[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  infoPage: IPageInfo;
  dataCar: any;
  setDataCar: Dispatch<any>;
  setInfoPage: Dispatch<SetStateAction<IPageInfo>>;
  updateVehicle: (
    body: IVehiclePost,
    vehicleId: string | undefined
  ) => Promise<void>;
  deleteVehicle: (vehicleId: string | undefined) => Promise<void>;
}

export interface IkenzieApiContext {
  brand: string[];
  carsBrand: any[];
  filterCar: ICar | undefined;
  carMark: (mark: string) => void;
  carModel: (carName: string) => void;
}

export interface ICommentContext {
  createComment: (idVehicle: string, body: any) => Promise<void>;
  getComment: (id: string) => Promise<void>;
  comments: any;
  listComment: boolean;
  updateComment: (commentId: string, body: IRegisterComment) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  description: string;
}

export interface IUserReq {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  birthday: Date;
  description?: string;
  buyer?: boolean;
  address: IAddress;
}

export interface IUserRes {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthday: string;
  description?: string;
  buyer?: boolean;
  address: IAddress;
}

export interface IUser extends IAddress {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  birthday: Date;
  description?: string;
  buyer?: boolean;
  confirmPassword?: string;
}

export interface IUserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  phone?: string;
  birthday?: Date;
  description?: string;
}

export interface IAddress {
  zipcode: string;
  city: string;
  street: string;
  state: string;
  number: string;
  complement?: string;
}

export interface IAddressUpdate {
  zipcode?: string;
  city?: string;
  street?: string;
  state?: string;
  number?: string;
  complement?: string;
}

export interface IProviderProps {
  children: ReactNode;
}

export interface IReqLogin {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
  user_id: string;
}

export interface IAxiosData {
  message: string;
}

export interface IModal {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
}

export interface IModalCreateAd {
  onOpen: () => void;
}

export interface IVehicle {
  brand: string;
  model: string;
  year: string;
  fuel: string;
  mileage: string;
  color: string;
  fipe: string;
  price: string;
  description: string;
  published?: boolean;
}

export interface IVehicleBody extends IVehicle {
  images: string[];
}

export interface IUrlImg {
  id?: string | undefined;
  img_url: string;
}

export interface IVehiclePost extends IVehicle {
  id?: string | undefined;
  images: IUrlImg[];
}

export interface ICar {
  id: string;
  year: number;
  name: string;
  fuel: number;
  value: number;
  brand: string;
}

export interface IEmail {
  email: string;
}

export interface IFiltred {
  brand: string;
  color: string;
  model: string;
  year: string;
  fuel: string;
}

export interface IPassword {
  password: string;
  confirmPassword: string;
}

export interface ICarImages {
  image: IUrlImg;
  modalCarImg: (data: IUrlImg) => void;
}

export interface IPageInfo {
  nextPage: number | null;
  totalPages: number | null;
  previusPage: number | null;
}

export interface IRegisterComment {
  description: string;
}
