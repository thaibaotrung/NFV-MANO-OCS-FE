import { InputBaseProps, OutlinedInputProps, TextField, TextFieldProps } from '@mui/material';
import { FormikContextType } from 'formik';

export type IFormicTextField = TextFieldProps &
  InputBaseProps &
  OutlinedInputProps & {
    formik: FormikContextType<any>;
    inputField?: any;
    downCase?: boolean;
  };

export const FormikInputField = ({ formik, inputField, downCase, ...props }: IFormicTextField) => {
  const touch = formik.touched[props.name as string];
  const error = formik.errors[props.name as string];
  const value = formik.values[props.name as string];
  // ? toLowerCaseNonAccentVietnamese()
  // : toUpperCaseNonAccentVietnamese(formik.values[props.name as string]);

  const InputFiled: any = inputField || TextField;

  return (
    <InputFiled
      error={!!(touch && error)}
      fullWidth
      helperText={(touch && error) as string}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={value}
      {...props}
    />
  );
};
