import * as yup from "yup";
import { IPassword, IUser, IUserUpdateRequest } from "../../interface";
import { SchemaOf } from "yup";

export const userSchema: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().required(),
  email: yup.string().required(),
  cpf: yup.string().required(),
  phone: yup
    .string()
    .required()
    .max(11)
    .min(11, "Verifique se foi adicionado o DDD"),
  password: yup.string().required(),
  birthday: yup.date().required(),
  description: yup.string().notRequired(),
  buyer: yup.boolean().notRequired(),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Confirmação de senha deve ser igual a senha"
    ),
  zipcode: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  state: yup.string().required(),
  number: yup.string().required(),
  complement: yup.string().notRequired(),
});

export const emailSchema = yup.object().shape({
  email: yup.string().required(),
});

export const passwordSchema: SchemaOf<IPassword> = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "confirmação de senha deve ser igual a senha "
    )
    .required(),
});

export const userUpdateSchema: SchemaOf<IUserUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    email: yup.string().notRequired(),
    cpf: yup.string().notRequired(),
    phone: yup.string().notRequired().max(11).min(11),
    password: yup.string().notRequired(),
    birthday: yup.date().notRequired(),
    description: yup.string().notRequired(),
  });
