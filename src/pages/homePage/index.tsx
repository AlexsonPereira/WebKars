import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useMediaQuery, Box, Flex } from "@chakra-ui/react";
import ProductCard from "../../components/ProductCard";
import FilterProduct from "../../components/FilterProduct";
import Pagination from "../../components/Pagination";
import Banner from "../../components/Banner";
import { useContext } from "react";
import { VehicleContext } from "../../contexts/Vehicle/VehicleContexts";
import NoAdFound from "../../components/NoAdFound";

const Homepage = () => {
  const { adVehicle, allCars } = useContext(VehicleContext);
  const [isLarger] = useMediaQuery("(min-width: 650px)");

  return (
    <>
      <Header />
      <Box as={"main"} w={"100%"} h={"100%"}>
        <Banner />
        <Flex as={"section"} p={"52px 15px 19px 15px"} gap={"20px"}>
          {isLarger && adVehicle.length > 0 && <FilterProduct />}
          <Flex flexDir={"column"} w={"100%"}>
            <Flex
              flexWrap={isLarger ? "wrap" : "nowrap"}
              overflowY={isLarger ? "unset" : "hidden"}
              overflowX={isLarger ? "unset" : "scroll"}
              gap={"20px"}
            >
              {adVehicle.length > 0 ? (
                allCars.map((cars) => <ProductCard key={cars.id} cars={cars} />)
              ) : (
                <NoAdFound />
              )}
            </Flex>
            {!isLarger && adVehicle.length > 0 && <FilterProduct />}
          </Flex>
        </Flex>
        {adVehicle.length > 0 && <Pagination />}
      </Box>
      <Footer />
    </>
  );
};

export default Homepage;
