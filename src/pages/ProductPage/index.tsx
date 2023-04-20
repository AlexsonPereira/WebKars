import {
  Avatar,
  Box,
  Button,
  Container,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import car from "../../assets/EXTERIOR-frontSidePilotNear-1653845164710-removebg-preview 1.png";
import ImageCar from "../../components/ImageCar";
import AddComments from "../../components/AddComments";
import Comments from "../../components/Comments";
import Description from "../../components/Description";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";

const ProductPage = () => {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box height={"100%"} bg={"grey_scale.grey8"}>
      <Header />
      <Box bg="brand.brand1" w="full" h="544px" pos="absolute" />
      <Container pos={"relative"} maxWidth={"container.xl"} mb={"73px"}>
        <Box
          id="main"
          display={"flex"}
          justifyContent={["center", "center", "center", "normal"]}
          flexWrap={"wrap"}
          marginTop={"40px"}
          columnGap="40px"
        >
          <Box
            w={["100%", "80%", "100%", "60%"]}
            display={"flex"}
            borderRadius={"4px"}
            justifyContent={"center"}
            padding={"40px"}
            bg="grey_scale.grey10"
          >
            <Image src={car} />
          </Box>
          <Box
            w={["100%", "80%", "100%", "35%"]}
            mt={["18px", "18px", "18px", "0px"]}
            p={"40px"}
            display={"flex"}
            flexDirection={"column"}
            flexWrap={"wrap"}
            bg="grey_scale.grey10"
            borderRadius={"4px"}
          >
            <Text
              variant="Heading-3-500"
              fontSize={"1.2rem"}
              fontWeight={"600"}
              mb={"30px"}
            >
              Fotos
            </Text>
            <Box
              justifyContent={"center"}
              display={"flex"}
              flexWrap={"wrap"}
              gap={"30px"}
            >
              <ImageCar onOpen={onOpen} />
            </Box>
          </Box>
          <Box
            w={["100%", "80%", "100%", "60%"]}
            h={"max-content"}
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"4px"}
            justifyContent={"center"}
            padding={"40px"}
            marginTop={"40px"}
            bg="grey_scale.grey10"
          >
            <Text fontWeight={600}>
              Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200{" "}
            </Text>
            <Box
              marginTop={"40px"}
              marginBottom={"20px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box display={"flex"} gap={"12px"}>
                <Tag bg={"brand.brand4"} color={"brand.brand1"}>
                  2013
                </Tag>
                <Tag bg={"brand.brand4"} color={"brand.brand1"}>
                  0 KM
                </Tag>
              </Box>
              <Text fontWeight={"bold"}>R$ 00.000,00</Text>
            </Box>
            <Button w={"32"} variant={"brand1"}>
              Comprar
            </Button>
          </Box>
          <Box
            w={["100%", "80%", "100%", "35%"]}
            gap={"32px"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            p={"40px"}
            mt={"34px"}
            bg="grey_scale.grey10"
            borderRadius={"4px"}
          >
            <Avatar
              size={"lg"}
              name={user.name}
              src="https://bit.ly/tioluwani-kolawole"
            />
            <Text fontSize={"20px"} fontWeight={"bold"}>
              {user.name}
            </Text>
            <Text textAlign={"center"}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's
            </Text>
            <Button
              variant={"grey1"}
              onClick={() => navigate(`/profile`, { replace: true })}
            >
              Ver todos anuncios
            </Button>
          </Box>
          <Description />
          <Comments />
          <AddComments />
        </Box>
      </Container>
      <Footer />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Imagem Veiculos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box bg={"grey_scale.grey7"}>
              <Image src={car} />
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductPage;
