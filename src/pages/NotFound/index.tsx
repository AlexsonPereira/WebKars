import { Alert, AlertIcon, Link, Text } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";

const NotFound = () => {
  const { navigate } = useContext(AuthContext);
  return (
    <>
      <Header />
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="calc(100vh - 80px - 80px)"
        backgroundColor={"transparent"}
        gap={"1rem"}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <Text variant={"Heading-1-700"}>Not Found</Text>
        <Text variant={"Heading-6-500"}>
          Não foi possivel encontra a pagina no momento
        </Text>
        <Link variant={"outline1"} onClick={() => navigate("/")}>
          Volta para inicio
        </Link>
      </Alert>
      <Footer />
    </>
  );
};
export default NotFound;
