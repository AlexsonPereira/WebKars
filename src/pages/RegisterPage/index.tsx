import {
  Button,
  Card,
  CardBody,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Inputs from "../../components/Input";
import Textareas from "../../components/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../schemas/Users";
import { IUser, IUserReq } from "../../interface";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import ModalSuccessRegister from "../../components/ModalSuccessRegister";
import { VehicleContext } from "../../contexts/Vehicle/VehicleContexts";
import ModalSuccessAnnouncement from "../../components/ModalSuccessAnnouncement";
import ModalRemoveAnnouncement from "../../components/ModalRemoveAnnouncement";

const RegisterPage = () => {
  const { isOpen, onOpen } = useContext(VehicleContext);
  const { registerUser } = useContext(AuthContext);
  const [btnBuyer, setBtnBuyer] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(userSchema),
  });

  const registerData = (data: IUser) => {
    const { zipcode, city, street, state, number, complement } = data;

    const address = { zipcode, city, street, state, number, complement };

    Reflect.deleteProperty(data, "zipcode");
    Reflect.deleteProperty(data, "city");
    Reflect.deleteProperty(data, "street");
    Reflect.deleteProperty(data, "state");
    Reflect.deleteProperty(data, "number");
    Reflect.deleteProperty(data, "complement");

    const user: IUserReq = {
      ...data,
      address: address,
    };

    user.buyer = btnBuyer;

    registerUser(user);
  };

  return (
    <>
      <Card height={"100%"}>
        <Header />
        <CardBody
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          backgroundColor={"grey_scale.grey8"}
          height={"100vh"}
        >
          <FormControl
            as="form"
            display="flex"
            flexDirection={"column"}
            gap={"2rem"}
            width={"98%"}
            maxWidth={"411px"}
            padding={"44px 48px 44px 48px"}
            backgroundColor={"white"}
            height={"max-content"}
            onSubmit={handleSubmit(registerData)}
          >
            <Heading fontSize={"1.5rem"}>Cadastro</Heading>
            <Text variant={"body-2-500"}>Informações pessoais</Text>
            <Inputs
              id={"name"}
              label={"Nome"}
              placeholder="Digite seu nome"
              type={"text"}
              register={register}
              errors={errors}
            />
            <Inputs
              id={"email"}
              label={"Email"}
              placeholder="Digite seu e-mail"
              type={"email"}
              register={register}
              errors={errors}
            />

            <Inputs
              id={"cpf"}
              label={"CPF"}
              placeholder="Digite seu cpf"
              type={"number"}
              register={register}
              errors={errors}
            />
            <Inputs
              id={"phone"}
              label={"Celular"}
              placeholder="Digite o numero do seu celular com DDD"
              type={"number"}
              register={register}
              errors={errors}
            />
            <Inputs
              id={"birthday"}
              label={"Data de nascimento"}
              placeholder={"00/00/00"}
              type={"date"}
              register={register}
              errors={errors}
            />
            <Textareas
              id={"description"}
              label="Descrição"
              placeholder="Descrição do seu perfil"
              register={register}
              errors={errors}
            />
            <Text variant={"body-2-500"}>Informações de endereço</Text>
            <Inputs
              id={"zipcode"}
              label={"CEP"}
              placeholder="Digite seu cep"
              type={"number"}
              register={register}
              errors={errors}
            />
            <Stack direction={"row"}>
              <Inputs
                id={"state"}
                label={"Estado"}
                placeholder="Digite seu estado"
                type={"text"}
                register={register}
                errors={errors}
              />
              <Inputs
                id={"city"}
                label={"Cidade"}
                placeholder="Digite seu cidade"
                type={"text"}
                register={register}
                errors={errors}
              />
            </Stack>
            <Inputs
              id={"street"}
              label={"Rua"}
              type={"text"}
              placeholder="Digite seu rua"
              register={register}
              errors={errors}
            />
            <Stack direction={"row"}>
              <Inputs
                id={"number"}
                label={"Número"}
                type={"number"}
                placeholder="Digite seu numero do endereço"
                register={register}
                errors={errors}
              />
              <Inputs
                id={"complement"}
                label={"Complemento"}
                type={"text"}
                placeholder="Digite o complemento"
                register={register}
                errors={errors}
              />
            </Stack>
            <Text variant={"body-2-500"}>Tipo de conta</Text>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Button
                variant={btnBuyer ? "brand1" : "outline2"}
                padding={"12px 28px 12px 28px"}
                h={"48px"}
                w={"152px"}
                _focus={{ bg: "brand.brand1", color: "grey_scale.whiteFixed" }}
                onClick={() => setBtnBuyer(true)}
              >
                Comprador
              </Button>
              <Button
                variant={btnBuyer ? "outline2" : "brand1"}
                padding={"12px 28px 12px 28px"}
                h={"48px"}
                w={"152px"}
                _focus={{ bg: "brand.brand1", color: "grey_scale.whiteFixed" }}
                onClick={() => setBtnBuyer(false)}
              >
                Anunciante
              </Button>
            </Stack>
            <Inputs
              id={"password"}
              label={"Senha"}
              placeholder="Digite sua senha"
              type={"password"}
              register={register}
              errors={errors}
            />
            <Inputs
              id={"confirmPassword"}
              label="Confirmar senha"
              placeholder="Digite novamente sua senha"
              type="password"
              register={register}
              errors={errors}
            />
            <Button variant={"brand1"} type={"submit"}>
              Finalizar Cadastro
            </Button>
          </FormControl>
        </CardBody>
        <Footer />
      </Card>
    </>
  );
};

export default RegisterPage;
