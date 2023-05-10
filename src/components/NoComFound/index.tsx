import { Alert, AlertIcon, Text } from "@chakra-ui/react";

const NoComFound = () => {
  return (
    <>
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        h="220px"
        backgroundColor={"transparent"}
        gap={"1rem"}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <Text variant={"Heading-1-700"}>Nenhum comentario encontrado</Text>
        <Text variant={"Heading-6-500"}>
          Parece que não há nenhum comentario no momento
        </Text>
      </Alert>
    </>
  );
};
export default NoComFound;
