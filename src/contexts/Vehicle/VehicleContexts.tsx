import { createContext, useState, useContext, useEffect } from "react";
import {
  IAxiosData,
  IPageInfo,
  IProviderProps,
  IUrlImg,
  IVehicleBody,
  IVehicleContext,
  IVehiclePost,
} from "../../interface";
import { Instance } from "../../services/axios";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import foto from "../../assets/naoDisponivel.jpg";
import { useDisclosure } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const VehicleContext = createContext<IVehicleContext>(
  {} as IVehicleContext
);

const VehicleProvider = ({ children }: IProviderProps) => {
  const [adVehicle, setAdVehicle] = useState([] as IVehiclePost[]);
  const [allCars, setAllCars] = useState([] as IVehiclePost[]);
  const [inputModal, setInputModal] = useState<number[]>([1]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setLoading, loading } = useContext(AuthContext);
  const [page, setPage] = useState<number>(1);
  const [infoPage, setInfoPage] = useState<IPageInfo>({} as IPageInfo);
  const [dataCar, setDataCar] = useState<any | null>(null);

  useEffect(() => {
    const getVehicle = async () => {
      try {
        const { data } = await Instance.get(`/vehicle?page=${page}`);
        const { nextPage, totalPages, previusPage } = data.pagination;
        setInfoPage({
          nextPage,
          totalPages,
          previusPage,
        });
        setAdVehicle(data.pagination.vehicles);
        setAllCars(data.pagination.vehicles);
        return data.pagination.vehicles;
      } catch (error) {
        console.log(error);
      }
    };
    getVehicle();
  }, [page, loading]);

  const createVehicle = async (body: IVehiclePost) => {
    setLoading(true);
    try {
      await Instance.post("/vehicle", body);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as IAxiosData;
        toast.error(`${data.message}❗❗`);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (
    body: IVehiclePost,
    vehicleId: string | undefined
  ) => {
    setLoading(true);
    try {
      await Instance.patch(`/vehicle/${vehicleId}`, body);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as IAxiosData;
        toast.error(`${data.message}❗❗`);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (vehicleId: string | undefined) => {
    setLoading(true);
    try {
      await Instance.delete(`/vehicle/${vehicleId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as IAxiosData;
        toast.error(`${data.message}❗❗`);
      }
    } finally {
      setLoading(false);
    }
  };

  const addVehicle = (body: IVehicleBody) => {
    const newImages: IUrlImg[] = [];

    body.images.map((imgs) => {
      {
        imgs.length !== 0 && newImages.push({ img_url: imgs });
      }
    });

    {
      newImages.length === 0 &&
        newImages.push({
          img_url: foto,
        });
    }

    Reflect.deleteProperty(body, "images");

    const data: IVehiclePost = {
      ...body,
      images: newImages,
      published: true,
    };

    createVehicle(data);
    onClose();
  };

  return (
    <VehicleContext.Provider
      value={{
        createVehicle,
        adVehicle,
        addVehicle,
        isOpen,
        onOpen,
        onClose,
        inputModal,
        setInputModal,
        allCars,
        setAllCars,
        page,
        setPage,
        infoPage,
        dataCar,
        setDataCar,
        setInfoPage,
        updateVehicle,
        deleteVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleProvider;
