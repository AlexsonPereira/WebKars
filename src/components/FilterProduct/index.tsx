import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { VehicleContext } from "../../contexts/Vehicle/VehicleContexts";

const FilterProduct = () => {
  const [isLarger] = useMediaQuery("(min-width: 650px)");
  const { adVehicle, allCars, setAllCars } = useContext(VehicleContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [valor, setValor] = useState([] as any[]);
  const [valorKm, setValorKm] = useState([] as any[]);
  const [km, setKm] = useState([] as any[]);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const inputs: NodeListOf<HTMLInputElement> =
    document.querySelectorAll(".chakra-input");

  const limpar = () => {
    setAllCars(adVehicle);

    {
      inputs.forEach((item) => {
        item.value = "";
      });
    }

    setKm([]);
    setValor([]);
    setValorKm([]);
  };

  const test = (e: any, name: string) => {
    const brand = e.target.innerHTML;
    const tBrand: any = adVehicle.filter((item: any) => item[name] === brand);
    setAllCars(tBrand);
  };

  const minimo = (min: number, name: string) => {
    if (
      name === "mileage" ||
      (name === "price" && inputs[0].value === "" && inputs[1].value === "")
    ) {
      const newMin: any = adVehicle.filter((item: any) => item[name] >= min);
      setAllCars(newMin);
      setKm(newMin);
    } else {
      const newMin: any = valor.filter((item: any) => item[name] >= min);
      setAllCars(newMin);
      setValorKm(newMin);
    }
  };

  const maximo = (max: number, name: string) => {
    if (
      name === "mileage" ||
      (name === "price" && inputs[0].value === "" && inputs[1].value === "")
    ) {
      const newMax: any = km.filter((item: any) => item[name] <= max);
      setAllCars(newMax);
      setValor(newMax);
    } else {
      const newMin: any = valorKm.filter((item: any) => item[name] <= max);
      setAllCars(newMin);
    }
  };

  return (
    <>
      {isLarger ? (
        <Flex
          width={"25%"}
          display={"flex"}
          flexDirection={"column"}
          fontFamily={"Lexend"}
        >
          <Flex display={"flex"} flexDirection={"column"} position={"relative"}>
            <Button
              p={"0 10px"}
              h={"30px"}
              fontSize={"12px"}
              position={"absolute"}
              right={"0"}
              onClick={limpar}
            >
              Limpar
            </Button>
            <Stack>
              <Heading fontWeight={"bold"} fontSize={"28px"}>
                Marca
              </Heading>
            </Stack>
            <Stack padding={"10px"} color={"#868E96"} fontSize={"16px"}>
              {[...new Set(allCars.map((cars) => cars.brand))].map((item) => (
                <Text
                  cursor={"pointer"}
                  key={item}
                  onClick={(e) => test(e, "brand")}
                >
                  {item}
                </Text>
              ))}
            </Stack>
          </Flex>

          <Flex display={"flex"} flexDirection={"column"}>
            <Stack>
              <Heading fontWeight={"bold"} fontSize={"28px"}>
                Modelo
              </Heading>
            </Stack>
            <Stack p="10px 10px 0 10px" color={"#868E96"} fontSize={"16px"}>
              {[...new Set(allCars.map((e) => e.model))].map((item) => (
                <Text
                  cursor={"pointer"}
                  key={item}
                  onClick={(e) => test(e, "model")}
                >
                  {item}
                </Text>
              ))}
            </Stack>
          </Flex>

          <Flex display={"flex"} flexDirection={"column"}>
            <Stack>
              <Heading fontWeight={"bold"} fontSize={"28px"}>
                Cor
              </Heading>
            </Stack>
            <Stack p="10px 10px 0 10px" color={"#868E96"} fontSize={"16px"}>
              {[...new Set(allCars.map((e) => e.color))].map((item) => (
                <Text
                  cursor={"pointer"}
                  key={item}
                  onClick={(e) => test(e, "color")}
                >
                  {item}
                </Text>
              ))}
            </Stack>
          </Flex>

          <Flex display={"flex"} flexDirection={"column"}>
            <Stack>
              <Heading fontWeight={"bold"} fontSize={"28px"}>
                Ano
              </Heading>
            </Stack>
            <Stack p="10px 10px 0 10px" color={"#868E96"} fontSize={"16px"}>
              {[...new Set(allCars.map((e) => e.year))].map((item) => (
                <Text
                  cursor={"pointer"}
                  key={item}
                  onClick={(e) => test(e, "year")}
                >
                  {item}
                </Text>
              ))}
            </Stack>
          </Flex>

          <Flex display={"flex"} flexDirection={"column"}>
            <Stack>
              <Heading fontWeight={"bold"} fontSize={"28px"}>
                Combustível
              </Heading>
            </Stack>
            <Stack p="10px 10px 0 10px" color={"#868E96"} fontSize={"16px"}>
              {[...new Set(allCars.map((e) => e.fuel))].map((item) => (
                <Text
                  cursor={"pointer"}
                  key={item}
                  onClick={(e) => test(e, "fuel")}
                >
                  {item}
                </Text>
              ))}
            </Stack>
          </Flex>

          <Flex display={"flex"} flexDirection={"column"}>
            <Stack>
              <Heading fontWeight={"bold"} fontSize={"28px"}>
                Km
              </Heading>
            </Stack>

            <Flex
              as={"form"}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              gap={"20px"}
              paddingBottom={"17px"}
              paddingTop={"17px"}
            >
              <Input
                w={"125px"}
                bg={"#CED4DA"}
                placeholder={"Mínimo"}
                type="number"
                onChange={(e) => minimo(+e.target.value, "mileage")}
              />
              <Input
                w={"125px"}
                bg={"#CED4DA"}
                placeholder={"Máximo"}
                type="number"
                onChange={(e) => maximo(+e.target.value, "mileage")}
              />
            </Flex>
          </Flex>

          <Flex display={"flex"} flexDirection={"column"}>
            <Stack>
              <Heading fontWeight={"bold"} fontSize={"28px"}>
                Preço
              </Heading>
            </Stack>
            <Flex
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              gap={"20px"}
              paddingBottom={"17px"}
              paddingTop={"17px"}
            >
              <Input
                w={"125px"}
                bg={"#CED4DA"}
                placeholder={"Mínimo"}
                type="number"
                onChange={(e) => minimo(+e.target.value, "price")}
              />
              <Input
                w={"125px"}
                bg={"#CED4DA"}
                placeholder={"Máximo"}
                type="number"
                onChange={(e) => maximo(+e.target.value, "price")}
              />
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Box display={"flex"} flexDirection={"column"}>
          <Flex flexDirection={"column"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              marginBottom={"15px"}
              gap={"10px"}
            >
              <Button
                bg={"#5126EA"}
                border={"1.5px solid #5126EA"}
                borderRadius={"4px"}
                color={"white"}
                onClick={onOpen}
                width={"60%"}
                mt="20px"
              >
                Filtros
              </Button>
            </Box>
          </Flex>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Filtros</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={8}>
                <FormControl>
                  <FormLabel
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    padding={"5px"}
                  >
                    Marca
                  </FormLabel>
                  <Stack
                    color={"#868E96"}
                    fontSize={"16px"}
                    marginLeft={"15px"}
                  >
                    {[...new Set(adVehicle.map((e) => e.brand))].map((item) => (
                      <Text key={item}>{item}</Text>
                    ))}
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    padding={"5px"}
                  >
                    Modelo
                  </FormLabel>
                  <Stack
                    color={"#868E96"}
                    fontSize={"16px"}
                    marginLeft={"20px"}
                  >
                    {[
                      ...new Set(
                        adVehicle.map((e) => {
                          return e.model.split(" ")[0];
                        })
                      ),
                    ].map((item) => (
                      <Text key={item}>{item}</Text>
                    ))}
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    padding={"5px"}
                  >
                    Cor
                  </FormLabel>
                  <Stack
                    color={"#868E96"}
                    fontSize={"16px"}
                    marginLeft={"20px"}
                  >
                    {[...new Set(adVehicle.map((e) => e.color))].map((item) => (
                      <Text key={item}>{item}</Text>
                    ))}
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    padding={"5px"}
                  >
                    Ano
                  </FormLabel>
                  <Stack
                    color={"#868E96"}
                    fontSize={"16px"}
                    marginLeft={"20px"}
                  >
                    {[...new Set(adVehicle.map((e) => e.year))].map((item) => (
                      <Text key={item}>{item}</Text>
                    ))}
                  </Stack>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    padding={"5px"}
                  >
                    Combustível
                  </FormLabel>
                  <Stack
                    color={"#868E96"}
                    fontSize={"16px"}
                    marginLeft={"20px"}
                  >
                    {[...new Set(adVehicle.map((e) => e.fuel))].map((item) => (
                      <Text key={item}>{item}</Text>
                    ))}
                  </Stack>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    padding={"5px"}
                  >
                    Km
                  </FormLabel>
                  <Flex
                    color={"#868E96"}
                    fontSize={"16px"}
                    marginLeft={"20px"}
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={"1rem"}
                    paddingBottom={"17px"}
                    paddingTop={"17px"}
                  >
                    <Input bg={"#CED4DA"} placeholder={"Mínimo"} />
                    <Input bg={"#CED4DA"} placeholder={"Máximo"} />
                  </Flex>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    padding={"5px"}
                  >
                    Preço
                  </FormLabel>
                  <Flex
                    color={"#868E96"}
                    fontSize={"16px"}
                    marginLeft={"20px"}
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={"1rem"}
                    paddingBottom={"17px"}
                    paddingTop={"17px"}
                  >
                    <Input bg={"#CED4DA"} placeholder={"Mínimo"} />
                    <Input bg={"#CED4DA"} placeholder={"Máximo"} />
                  </Flex>
                </FormControl>
              </ModalBody>

              <ModalFooter display={"flex"} justifyContent={"center"}>
                <Button
                  bg={"#5126EA"}
                  border={"1.5px solid #5126EA"}
                  borderRadius={"4px"}
                  onClick={onClose}
                  color={"white"}
                >
                  Ver anúncios
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
};
export default FilterProduct;
