import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { IModal } from "../../interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userUpdateSchema } from "../../schemas/Users";
import Inputs from "../Input";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ModalUserUpdate = ({ isOpen, onOpen, onClose }: IModal) => {
  const { updateUser, deleteUser, user, date } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(userUpdateSchema),
  });

  const handleClick = async () => {
    await deleteUser();
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(updateUser)}>
              <FormLabel>Nome</FormLabel>
              <Inputs
                placeholder="Digite seu nome"
                id={"name"}
                type={"text"}
                register={register}
                errors={errors}
                defaultValue={user.name}
              ></Inputs>
              <FormLabel>Email</FormLabel>
              <Inputs
                placeholder="Digite seu e-mail"
                id={"email"}
                type={"email"}
                register={register}
                errors={errors}
                defaultValue={user.email}
              ></Inputs>

              <FormLabel>Celular</FormLabel>
              <Inputs
                placeholder="Digite o numero do seu celular"
                id={"phone"}
                type={"tel"}
                register={register}
                errors={errors}
                defaultValue={user.phone}
              ></Inputs>

              <FormLabel>Data de nascimento</FormLabel>
              <Inputs
                placeholder="Data de nascimento"
                id={"birthday"}
                type={"date"}
                register={register}
                errors={errors}
                defaultValue={date}
              ></Inputs>

              <FormLabel>Descrição</FormLabel>
              <Inputs
                placeholder="Descrição do seu perfil"
                id={"description"}
                type={"text"}
                register={register}
                errors={errors}
                defaultValue={user.description}
              ></Inputs>

              <ModalFooter gap="20px">
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  bg="feedback.alert2"
                  color="feedback.alert1"
                  onClick={handleClick}
                  p="0 1.5rem  0 1.5rem"
                >
                  Excluir Perfil
                </Button>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type={"submit"}
                  onClick={onClose}
                  p="0 2rem  0 2rem"
                >
                  Salvar alterações
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUserUpdate;
