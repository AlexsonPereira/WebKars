import {
  Modal,
  Flex,
  FormControl,
  Text,
  Button,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  Select,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import Inputs from "../Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUrlImg, IVehicleBody, IVehiclePost } from "../../interface";
import { IVehicleSchema } from "../../schemas/Vehicle";
import { useContext, useEffect, useState } from "react";
import { VehicleContext } from "../../contexts/Vehicle/VehicleContexts";
import Textareas from "../Textarea";
import { kenzieApiContext } from "../../contexts/kenzieApi/kenzieApiContext";
import foto from "../../assets/naoDisponivel.jpg";

interface IEditVehicle {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditVehicle = ({ id, isOpen, onClose }: IEditVehicle) => {
  const { allCars, updateVehicle, deleteVehicle } = useContext(VehicleContext);
  const { brand, filterCar, carsBrand, carMark, carModel } =
    useContext(kenzieApiContext);
  const [inputModal, setInputModal] = useState<number[]>([]);
  const [isPublished, setIsPublished] = useState(true);
  let imagesFixed: number = 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVehicleBody>({
    resolver: yupResolver(IVehicleSchema),
  });

  const car = allCars.find((item) => item.id === id);

  useEffect(() => {
    if (!!car) {
      carMark(car?.brand);
      const imgs: number[] = [];
      imagesFixed = car?.images.length;
      car?.images.map((i, index) => {
        imgs.push(index);
      });
      setInputModal(imgs);
    }
    console.log(imagesFixed);
  }, []);

  const editVehicle = (body: IVehicleBody) => {
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

    data.published = isPublished;

    updateVehicle(data, car?.id);
    onClose();
  };

  const delVehicle = (id: string | undefined) => {
    if (!!car) {
      deleteVehicle(id);
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <ModalHeader>Editar anúncio</ModalHeader>
        <ModalCloseButton />

        <ModalBody
          as={"form"}
          p={{ base: "0px 14px 0px 20px", md: "0px 24px 0px 30px" }}
          display={"flex"}
          flexDir={"column"}
          gap={"24px"}
          onSubmit={handleSubmit(editVehicle)}
        >
          <Text
            variant={"body-2-500"}
            color={"grey_scale.grey0"}
            pb={"24px"}
            p="0"
          >
            Informações do veículo
          </Text>

          <FormControl>
            <FormLabel>Marca</FormLabel>
            <Select
              opacity={
                carsBrand.length === 0 && car?.brand === undefined ? 0.5 : 1
              }
              placeholder="Selecione a Marca"
              {...register("brand")}
              defaultValue={car?.brand}
              onChange={(e) => carMark(e.target.value)}
            >
              {brand.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Modelo</FormLabel>
            <Select
              opacity={
                carsBrand.length === 0 && car?.brand === undefined ? 0.5 : 1
              }
              placeholder={"Selecione o Modelo"}
              {...register("model")}
              defaultValue={car?.model}
              onChange={(e) => carModel(e.target.value)}
            >
              {carsBrand.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <Flex gap={3}>
            <FormControl>
              <FormLabel>Ano</FormLabel>
              <Select
                opacity={filterCar === undefined ? 0.5 : 1}
                defaultValue={car?.year}
                variant="outline"
                {...register("year")}
              >
                <option disabled hidden>
                  Selecione o Ano
                </option>
                <option key={filterCar?.id} value={filterCar?.year}>
                  {filterCar?.year}
                </option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Combustível</FormLabel>
              <Select
                defaultValue={car?.fuel}
                opacity={filterCar === undefined ? 0.5 : 1}
                {...register("fuel")}
              >
                <option disabled hidden>
                  Selecionar Combustível
                </option>
                <option key={filterCar?.id} value={filterCar?.fuel}>
                  {filterCar?.fuel}
                </option>
              </Select>
            </FormControl>
          </Flex>

          <Flex gap={3}>
            <Inputs
              id={"mileage"}
              label={"Quilometragem"}
              type={"text"}
              placeholder={"30.000 km"}
              register={register}
              errors={errors}
              defaultValue={car?.mileage}
            />
            <Inputs
              id={"color"}
              label={"Cor"}
              type={"text"}
              placeholder={"Branco"}
              register={register}
              errors={errors}
              defaultValue={car?.color}
            />
          </Flex>

          <Flex gap={3}>
            <FormControl>
              <FormLabel>Preço tabela FIPE</FormLabel>
              <Select
                opacity={filterCar === undefined ? 0.5 : 1}
                {...register("fipe")}
                defaultValue={car?.fipe}
              >
                <option disabled hidden>
                  Selecione o Preço
                </option>
                {filterCar !== undefined && (
                  <option value={filterCar?.value}>
                    R$ {filterCar?.value},00
                  </option>
                )}
              </Select>
            </FormControl>

            <Inputs
              id={"price"}
              label={"Preço"}
              type={"text"}
              placeholder={"R$ 50.000,00"}
              register={register}
              errors={errors}
              defaultValue={car?.price}
            />
          </Flex>

          <Textareas
            id={"description"}
            label="Descrição"
            placeholder="Digitar descrição"
            register={register}
            errors={errors}
            defaultValue={car?.description}
          />
          <Stack direction={"column"}>
            <FormLabel>Publicado</FormLabel>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Button
                variant={isPublished ? "brand1" : "outline2"}
                padding={"12px 28px 12px 28px"}
                h={"48px"}
                w={"100%"}
                _focus={{ bg: "brand.brand1", color: "grey_scale.whiteFixed" }}
                onClick={() => setIsPublished(true)}
              >
                Sim
              </Button>
              <Button
                variant={isPublished ? "outline2" : "brand1"}
                padding={"12px 28px 12px 28px"}
                h={"48px"}
                w={"100%"}
                _focus={{ bg: "brand.brand1", color: "grey_scale.whiteFixed" }}
                onClick={() => setIsPublished(false)}
              >
                Não
              </Button>
            </Stack>
          </Stack>

          {inputModal.map((item, index) => {
            return (
              <Inputs
                key={index}
                id={`images[${String(index)}]`}
                label={index !== 0 ? index + " " + "Imagem" : "Imagem da capa"}
                type={"text"}
                placeholder={"Informe a URL"}
                defaultValue={
                  imagesFixed < index ? "" : car!.images[index].img_url
                }
                register={register}
                errors={errors}
              />
            );
          })}

          <Button
            variant={"brand_opacity"}
            alignSelf={"start"}
            fontSize={{ base: ".75rem", md: "0.875rem" }}
            maxW={"315px"}
            onClick={() => setInputModal([...inputModal, inputModal.length++])}
          >
            Adicionar campo para imagem da galeria
          </Button>
          <Stack
            spacing={4}
            direction="row"
            p={"0px 0px 18px 0px"}
            justifyContent={"space-between"}
          >
            <Button
              variant={"brand_opacity"}
              color={"grey_scale.grey2"}
              colorScheme="blue"
              onClick={onClose}
              width={"100%"}
            >
              Cancelar
            </Button>
            <Button
              variant={"alert"}
              onClick={() => delVehicle(car!.id)}
              width={"100%"}
            >
              Excluir
            </Button>
            <Button type={"submit"} variant={"outline2"} width={"100%"}>
              Salvar
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditVehicle;
