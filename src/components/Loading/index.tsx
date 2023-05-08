import Header from "../Header";
import Footer from "../Footer";
import { Box, Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <>
      <Header />
      <Box
        height="calc(100vh - 80px - 80px)"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"1rem"}
      >
        <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          h={"10rem"}
          w={"10rem"}
        />
        <Text variant={"Heading-1-700"}>Carrregando</Text>
      </Box>
      <Footer />
    </>
  );
};
export default Loading;
