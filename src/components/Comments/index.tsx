import { Box, Text, UnorderedList } from "@chakra-ui/react";
import CardLi from "./Cards";
import { VehicleContext } from "../../contexts/Vehicle/VehicleContexts";
import { useContext } from "react";
import NoComFound from "../NoComFound";

const Comments = () => {
  const { dataCar } = useContext(VehicleContext);
  return (
    <UnorderedList
      display={"flex"}
      borderRadius={"4px"}
      flexDirection={"column"}
      m={0}
      w={["100%", "80%", "100%", "60%"]}
      mb={"33px"}
      p={"36px 44px"}
      bg={"grey_scale.grey10"}
    >
      <Text variant={"Heading-6-600"} mb={"24px"}>
        Comentários
      </Text>
      <Box key={dataCar.comments.id}>
        {dataCar.comments.length === 0 && <NoComFound />}
        {dataCar.comments.map((cars: any) => (
          <CardLi key={cars.id} cars={cars} />
        ))}
      </Box>
    </UnorderedList>
  );
};

export default Comments;
