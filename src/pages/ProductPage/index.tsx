import {
  Avatar,
  Box,
  Button,
  Container,
  Image,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Header from '../../components/Header';
import ImageCar from '../../components/ImageCar';
import AddComments from '../../components/AddComments';
import Comments from '../../components/Comments';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Instance } from '../../services/axios';
import { IAxiosData, IUrlImg } from '../../interface';
import { VehicleContext } from '../../contexts/Vehicle/VehicleContexts';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { commentContext } from '../../contexts/Comment/commentContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { dataCar, setDataCar } = useContext(VehicleContext);
  const { listComment } = useContext(commentContext);
  const { token, setLoading, userId } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const [imgUrl, setImgUrl] = useState({} as IUrlImg);

  const openWhatsApp = () => {
    if (!dataCar || !dataCar.user || !dataCar.user?.phone) {
      console.error('Número de telefone não encontrado');
      return;
    }

    const countryCode = '55';
    const phoneNumberWithoutCountryCode = dataCar.user?.phone.replace(
      /^\d{2}/,
      ''
    );
    const formattedPhoneNumber = countryCode + phoneNumberWithoutCountryCode;

    const message = `Olá, ${dataCar.user.name}! Gostaria de comprar o veículo ${dataCar.brand} ${dataCar.model}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedPhoneNumber}?text=${encodedMessage}`;

    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const modalCarImg = (data: IUrlImg) => {
    const car = dataCar.images.find((i: IUrlImg) => i.id === data.id);
    setImgUrl(car);
    onOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Instance.get<any>(`/vehicle/${id}`);
        setDataCar(response.data);
      } catch (err) {
        navigate("/notFound")
        console.log(err);

      }
    };
    fetchData();
  }, [id, listComment]);

  if (!dataCar) {
    return <p></p>;
  }

  return (
    <Box
      height={'100%'}
      bg={'grey_scale.grey8'}
    >
      <Header />
      <Box
        bg="brand.brand1"
        w="full"
        h="544px"
        pos="absolute"
      />
      <Container
        pos={'relative'}
        maxWidth={'container.xl'}
        mb={'73px'}
      >
        <Box
          id="main"
          display={'flex'}
          justifyContent={['center', 'center', 'center', 'normal']}
          flexWrap={'wrap'}
          marginTop={'40px'}
          columnGap="40px"
        >
          <Box
            w={['100%', '80%', '100%', '60%']}
            display={'flex'}
            borderRadius={'4px'}
            justifyContent={'center'}
            padding={'40px'}
            bg="grey_scale.grey10"
          >
            <Image
              w={'400px'}
              src={dataCar.images[0].img_url}
              objectFit={'contain'}
            />
          </Box>
          <Box
            w={['100%', '80%', '100%', '35%']}
            mt={['18px', '18px', '18px', '0px']}
            p={'40px'}
            display={'flex'}
            flexDirection={'column'}
            flexWrap={'wrap'}
            bg="grey_scale.grey10"
            borderRadius={'4px'}
          >
            <Text
              variant="Heading-3-500"
              fontSize={'1.2rem'}
              fontWeight={'600'}
              mb={'30px'}
            >
              Fotos
            </Text>
            <Box
              justifyContent={'center'}
              display={'flex'}
              flexWrap={'wrap'}
              gap={'30px'}
            >
              {dataCar?.images.map((image: IUrlImg) => (
                <ImageCar
                  key={image?.id}
                  image={image}
                  modalCarImg={modalCarImg}
                />
              ))}
            </Box>
          </Box>
          <Box
            w={['100%', '80%', '100%', '60%']}
            h={'max-content'}
            display={'flex'}
            flexDirection={'column'}
            borderRadius={'4px'}
            justifyContent={'center'}
            padding={'40px'}
            marginTop={'40px'}
            bg="grey_scale.grey10"
          >
            <Text fontWeight={600}>
              {dataCar.brand.replace(/(^\w{1})|(\s+\w{1})/g, (letra: string) =>
                letra.toUpperCase()
              )}{' '}
              {dataCar.model.replace(/(^\w{1})|(\s+\w{1})/g, (letra: string) =>
                letra.toUpperCase()
              )}
            </Text>
            <Box
              marginTop={'40px'}
              marginBottom={'20px'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Box
                display={'flex'}
                gap={'12px'}
              >
                <Tag
                  bg={'brand.brand4'}
                  color={'brand.brand1'}
                >
                  {dataCar.year}
                </Tag>
                <Tag
                  bg={'brand.brand4'}
                  color={'brand.brand1'}
                >
                  {dataCar.mileage} KM
                </Tag>
              </Box>
              <Text fontWeight={'bold'}>R$ {dataCar.price}</Text>
            </Box>
            {token && userId !== dataCar.user.id && (
              <Button
                w={'32'}
                variant={'brand1'}
                onClick={openWhatsApp}
              >
                Comprar
              </Button>
            )}
          </Box>
          <Box
            w={['100%', '80%', '100%', '35%']}
            gap={'32px'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            p={'40px'}
            mt={'34px'}
            bg="grey_scale.grey10"
            borderRadius={'4px'}
          >
            <Avatar
              size={'lg'}
              name={dataCar.user.name}
              src="https://bit.ly/tioluwani-kolawole"
            />
            <Text
              fontSize={'20px'}
              fontWeight={'bold'}
            >
              {dataCar.user.name}
            </Text>
            <Text textAlign={'center'}>{dataCar.Description}</Text>
            <Button
              variant={'grey1'}
              onClick={() =>
                navigate(`/profile/${dataCar.user.id}`, { replace: true })
              }
            >
              Ver todos anuncios
            </Button>
          </Box>
          <Box
            w={['100%', '80%', '100%', '60%']}
            p={'36px 44px'}
            mt={['20px', '20px', '20px', '-110px']}
            mb={'16px'}
            bg={'grey_scale.grey10'}
            borderRadius={'4px'}
          >
            <Text
              variant={'Heading-6-600'}
              mb={'32px'}
            >
              Descrição
            </Text>
            <Text
              variant={'body-1-400'}
              textAlign={'justify'}
            >
              {dataCar.description}
            </Text>
          </Box>
          <Comments />
          <AddComments />
        </Box>
      </Container>
      <Footer />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Imagem Veiculos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              bg={'grey_scale.grey7'}
              justify={'center'}
            >
              <Image src={imgUrl.img_url} />
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductPage;
