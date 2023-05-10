import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { IAxiosData, IModalCreateAd } from "../../interface";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useParams } from "react-router-dom";
import { Instance } from "../../services/axios";
import ProductCard from "../ProductCard";
import axios from "axios";
import { toast } from "react-toastify";

const CreateAd = ({ onOpen }: IModalCreateAd) => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState<any | null>(null);
  const { id } = useParams<{ id: string }>();

  const userVerify = () => {
    return dataUser.id === user.id;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Instance.get<any>(`/users/${id}`);
        setDataUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, user]);

  if (!dataUser) {
    return <p></p>;
  }

  return (
    <Flex>
      <Flex
        w={"60vw"}
        h={"406px"}
        maxW={"1240px"}
        top={"75px"}
        m={{ base: "0px 0px", sm: "0px 30px", md: "0px 60px", lg: "0px 100px" }}
        position={"relative"}
        bg={"grey_scale.grey10"}
        zIndex={"10px"}
        borderRadius={"8px"}
        p={{ base: "20px 29px", sm: "44px 29px", md: "44px 70px 42px 41px" }}
      >
        <Flex w={"100%"} h={"100%"} flexDir={"column"}>
          <Avatar size={"lg"} name={dataUser.name} />
          <Flex w={"100%"} alignItems={"center"} p={"24px 0px"} gap={"9px"}>
            <Text variant={"Heading-6-600"}>{dataUser.name}</Text>
            <Text
              variant={"body-2-500"}
              color={"brand.brand1"}
              p={"4px 8px"}
              bg={"brand.brand4"}
              textAlign={"center"}
              borderRadius={"4px"}
            >
              {dataUser.buyer ? "Comprador" : "Anunciante"}
            </Text>
          </Flex>
          <Text
            variant={"body-1-400"}
            h={"110px"}
            noOfLines={6}
            overflowY="auto"
          >
            {dataUser.description ? dataUser.description : "Nada informado"}
          </Text>
          {!dataUser.buyer && userVerify() && (
            <Button
              w={"160px"}
              p={"12px 28px"}
              variant={"outline_brand"}
              mt={{ base: "16px", sm: "36px" }}
              onClick={onOpen}
            >
              Criar anuncio
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateAd;
