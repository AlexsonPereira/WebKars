import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  FormControl,
  Text,
} from '@chakra-ui/react';
import { IAddressUpdate, IModal } from '../../interface';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userUpdateSchema } from '../../schemas/Users';
import Inputs from '../Input';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { addressUpdateSchema } from '../../schemas/address';

const ModalAddressUpdate = ({ isOpen, onOpen, onClose }: IModal) => {
  const { updateAddress, user } = useContext(AuthContext);

  useEffect(()=>{
    onClose()
  },[user])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddressUpdate>({
    resolver: yupResolver(addressUpdateSchema),
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text variant={'Heading-7-500'}>Editar endereço</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody pb={6}>
            <Text
              variant={'body-2-500'}
              marginBottom={'24px'}
            >
              Informações de endereço
            </Text>
            <FormControl
              onSubmit={handleSubmit(updateAddress)}
              as="form"
              display="flex"
              flexDirection={'column'}
              gap={'1rem'}
            >
              <Inputs
                label={'CEP'}
                placeholder="Informe seu CEP"
                id={'zipcode'}
                type={'number'}
                register={register}
                errors={errors}
                defaultValue={user?.address?.zipcode}
              ></Inputs>

              <Stack
                direction={'row'}
                justifyContent={'space-between'}
              >
                <Inputs
                  label={'Estado'}
                  placeholder="Informe seu estado"
                  id={'state'}
                  type={'text'}
                  register={register}
                  errors={errors}
                  defaultValue={user?.address?.state}
                />

                <Inputs
                  label={'Cidade'}
                  placeholder="Informe sua cidade"
                  id={'city'}
                  type={'text'}
                  register={register}
                  errors={errors}
                  defaultValue={user?.address?.city}
                />
              </Stack>

              <Inputs
                label={'Rua'}
                placeholder="Informe sua rua"
                id={'street'}
                type={'text'}
                register={register}
                errors={errors}
                defaultValue={user?.address?.street}
              ></Inputs>

              <Stack
                direction={'row'}
                justifyContent={'space-between'}
              >
                <Inputs
                  label={'Número'}
                  placeholder="Informe o numero"
                  id={'number'}
                  type={'number'}
                  register={register}
                  errors={errors}
                  defaultValue={user?.address?.number}
                />

                <Inputs
                  label={'Complemento'}
                  placeholder="Informe comp"
                  id={'complement'}
                  type={'text'}
                  register={register}
                  errors={errors}
                  defaultValue={user?.address?.complement}
                />
              </Stack>

              <ModalFooter gap="20px">
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                  variant={'brand1'}
                  type={'submit'}
                >
                  Salvar alterações
                </Button>
              </ModalFooter>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddressUpdate;
