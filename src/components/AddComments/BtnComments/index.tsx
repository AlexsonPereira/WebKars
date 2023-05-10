import { Button } from "@chakra-ui/react";
import { commentContext } from "../../../contexts/Comment/commentContext";
import { useContext } from "react";
interface IBtnCommentsProps {
  text: string;
  isLarger: boolean;
}

const BtnComments = ({ text, isLarger }: IBtnCommentsProps) => {
  const { setDescription } = useContext(commentContext);

  return (
    <Button
      variant={"brand2"}
      h={"24px"}
      fontWeight={"500"}
      fontSize={"12px"}
      lineHeight={"24px"}
      onClick={() => setDescription(text)}
    >
      {text}
    </Button>
  );
};

export default BtnComments;
