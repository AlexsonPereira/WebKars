import {
  Avatar,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Link,
  useMediaQuery,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ModalUserUpdate from "../ModalUpdateUser";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import ModalAddressUpdate from "../ModalEditAddress";

const Profile = () => {
  const { user, navigate } = useContext(AuthContext);
  const [isLarger] = useMediaQuery("(max-width: 500px)");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  const handleClick = () => {
    localStorage.removeItem("@WebKars:token");
    navigate("/");
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label={"Options"}
        icon={
          <Stack
            direction={"row"}
            alignItems={"center"}
            margin={0}
            justifyContent={"space-between"}
          >
            <Avatar name={`${user.name}`} />
            {!isLarger && <Text variant={"body-1-400"}>{user.name}</Text>}
          </Stack>
        }
        display={"flex"}
        alignItems={"center"}
        background={"none"}
        _hover={{ background: "none" }}
        _focus={{ background: "none" }}
        _active={{ background: "none" }}
        border={"none"}
      />
      <MenuList>
        <MenuItem>
          <Link
            onClick={openUserModal}
            _hover={{ textDecoration: "none", background: "none" }}
            bg="none"
            w={"100%"}
          >
            <ModalUserUpdate
              isOpen={isUserModalOpen}
              onOpen={openUserModal}
              onClose={closeUserModal}
            />
            Editar Perfil
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            onClick={openAddressModal}
            _hover={{ textDecoration: "none", background: "none" }}
          >
            <ModalAddressUpdate
              isOpen={isAddressModalOpen}
              onOpen={openAddressModal}
              onClose={closeAddressModal}
            />
            Editar Endereço
          </Link>
        </MenuItem>
        {!user.buyer && (
          <MenuItem>
            <Link
              onClick={() => navigate(`/profile/${user.id}`)}
              _hover={{ textDecoration: "none" }}
            >
              Meus anuncios
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <Link
            onClick={handleClick}
            w={"100%"}
            _hover={{ textDecoration: "none", background: "none" }}
          >
            Sair
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default Profile;
