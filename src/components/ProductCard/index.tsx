import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AvatarCard from "../AvatarCard";
import EditProduct from "../EditProduct";

const ProductCard = ({ cars }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  return (
    <Card
      minW={"300px"}
      maxW={"300px"}
      maxH={"430px"}
      padding={"1.5px"}
      role={"group"}
      cursor={"pointer"}
      display={"flex"}
      alignItems={"center"}
      paddingBottom={"1rem"}
    >
      <CardBody
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
        paddingBottom={0}
        onClick={() => navigate(`/product/${cars.id}`, { replace: true })}
      >
        <Box
          bg={"grey_scale.grey7"}
          position={"relative"}
          borderRadius={"5px"}
          border={"2px solid #00000000"}
          _groupHover={{ border: "2px solid #4529E6" }}
        >
          <Tag
            position={"absolute"}
            color={"grey_scale.whiteFixed"}
            bg={cars?.published ? "brand.brand1" : "grey_scale.grey4"}
            top={"0"}
            left={"0"}
          >
            {cars?.published ? "Ativo" : "Inativo"}
          </Tag>
          {cars?.fipe > cars?.price && (
            <Tag
              bg={"random_profile.random7"}
              color={"grey_scale.whiteFixed"}
              position={"absolute"}
              top={"0"}
              right={"0"}
              display={"flex"}
            >
              $
            </Tag>
          )}

          <Image
            alignItems={"center"}
            w={"260px"}
            h={"152px"}
            objectFit={"contain"}
            src={cars.images[0]["img_url"]}
            alt={"Green double couch with wooden legs"}
            borderRadius={"lg"}
          />
        </Box>
        <Stack mt={"4"} spacing={"3"} w={"100%"}>
          <Text variant={"Heading-7-600"} noOfLines={1}>
            {cars?.model.replace(/(^\w{1})|(\s+\w{1})/g, (letra: string) =>
              letra.toUpperCase()
            )}
          </Text>
          <Text h={"72px"} variant={"body-2-400"} noOfLines={3}>
            {cars?.description}
          </Text>
          {location.pathname !== `/profile/${id}` && (
            <AvatarCard name={cars!.user.name} />
          )}
        </Stack>
      </CardBody>
      <CardFooter
        display={"flex"}
        justifyContent={"space-between"}
        gap={"0.5rem"}
        p={"none"}
        margin={"1rem 0"}
      >
        <HStack spacing="12px">
          <Tag bg={"brand.brand4"} color={"brand.brand1"} padding={"0.3rem"}>
            {cars?.mileage} Km
          </Tag>
          <Tag bg={"brand.brand4"} color={"brand.brand1"} padding={"0.3rem"}>
            {cars?.year}
          </Tag>
        </HStack>
        <Text variant={"Heading-7-500"}> R$ {cars?.price},00 </Text>
      </CardFooter>
      {location.pathname === `/profile/${id}` && <EditProduct id={cars.id} />}
    </Card>
  );
};

export default ProductCard;
