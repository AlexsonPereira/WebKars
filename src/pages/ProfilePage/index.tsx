import { Box, Flex } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreateAd from "../../components/CreateAd";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { useContext, useEffect, useState } from "react";
import { VehicleContext } from "../../contexts/Vehicle/VehicleContexts";
import VehicleModal from "../../components/AddVehicle";
import { useParams } from "react-router-dom";
import { Instance } from "../../services/axios";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import NoAdFound from "../../components/NoAdFound";

const ProfilePage = () => {
  const { isOpen, onOpen, page, setPage, infoPage, setInfoPage } =
    useContext(VehicleContext);
  const { setLoading, loading, navigate } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState<any | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Instance.get<any>(
          `/vehicle/user/${id}?page=${page}`
        );
        const { vehicles, nextPage, totalPages, previusPage } = data.pagination;
        setInfoPage({
          nextPage,
          totalPages,
          previusPage,
        });
        setDataUser(vehicles);
      } catch (error) {
        navigate("/notFound");
        console.log(error);
      }
    };

    fetchData();
  }, [id, page, loading]);

  if (!dataUser) {
    return <p></p>;
  }

  return (
    <>
      {isOpen && <VehicleModal />}
      <Header />
      <Flex
        as={"main"}
        flexDir={"column"}
        alignItems={"center"}
        width={"100vw"}
        minH={"calc(100vh - 80px - 80px - 60px - 30px)"}
        bg={"grey_scale.grey6"}
      >
        <Flex
          as={"section"}
          justifyContent={"center"}
          w={"100%"}
          h={"277px"}
          bg={"brand.brand1"}
        >
          <Flex
            justifyContent={"center"}
            h={"100%"}
            w={"100%"}
            maxW={"1600px"}
            m={{ base: "0px 25px 0px 10px", md: "0px 30px" }}
          >
            <CreateAd onOpen={onOpen} />
          </Flex>
        </Flex>
        <Box
          as={"section"}
          h={"100%"}
          w={{ base: "100%", md: "unset" }}
          maxWidth={"1392px"}
          p={{
            base: "280px 25px 20px 10px",
            sm: "280px 25px 20px 10px",
            md: "280px 0px 20px 0px",
          }}
          m={"0px 30px"}
        >
          <Flex
            flexWrap={{ base: "unset", md: "wrap" }}
            justify={"space-between"}
            h={"100%"}
            w={"100%"}
            gap={{ base: "38px", md: "64px" }}
            pb={{ base: "10px", md: "0px" }}
            overflowY={{ base: "hidden", md: "unset" }}
            overflowX={{ base: "scroll", md: "unset" }}
          >
            {dataUser.length !== 0 ? (
              dataUser.map((cars: { id: any }) => (
                <ProductCard key={cars.id} cars={cars} />
              ))
            ) : (
              <NoAdFound />
            )}
          </Flex>
        </Box>
      </Flex>
      {dataUser.length !== 0 && <Pagination />}
      <Footer />
    </>
  );
};

export default ProfilePage;
