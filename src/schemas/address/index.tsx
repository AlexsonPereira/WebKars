import * as yup from "yup";
import { IAddress, IAddressUpdate } from "../../interface";
import { SchemaOf } from "yup";

export const addressSchema: SchemaOf<IAddress> = yup.object().shape({
  zipcode: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  state: yup.string().required(),
  number: yup.string().required(),
  complement: yup.string().required(),
});

export const addressUpdateSchema: SchemaOf<IAddressUpdate> = yup
  .object()
  .shape({
    zipcode: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    state: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().notRequired(),
  });
