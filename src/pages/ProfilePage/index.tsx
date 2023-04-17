import { Box, Flex } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreateAd from "../../components/CreateAd";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";

const ProfilePage = () => {
  return (
    <>
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
            <CreateAd />
          </Flex>
        </Flex>
        <Box
          as={"section"}
          h={"100%"}
          w={{ base: "100%", md: "unset" }}
          maxWidth={"1600px"}
          p={{
            base: "280px 25px 20px 10px",
            sm: "280px 25px 20px 10px",
            md: "280px 0px 20px 0px",
          }}
          m={"0px 30px"}
        >
          <Flex
            flexWrap={{ base: "unset", md: "wrap" }}
            justifyContent={"space-between"}
            h={"100%"}
            w={"100%"}
            gap={"30px"}
            pb={{ base: "10px", md: "0px" }}
            overflowY={{ base: "hidden", md: "unset" }}
            overflowX={{ base: "scroll", md: "unset" }}
          >
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Flex>
        </Box>
      </Flex>
      <Pagination />
      <Footer />
    </>
  );
};

export default ProfilePage;
