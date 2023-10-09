import { FormikErrors } from "formik";
import { FormValues } from "../data/Type";

export const validate = (values: FormValues): FormikErrors<FormValues> => {
  const errors: FormikErrors<FormValues> = {};

  Object.entries(values).forEach(([key, { isRequired, value }]) => {
    if (
      isRequired &&
      (!value || (Array.isArray(value) && value.length === 0))
    ) {
      errors[key] = { value: "This field is required!" };
    }
  });

  return errors;
};
