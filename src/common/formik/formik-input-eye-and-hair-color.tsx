import { Autocomplete, Box, FormHelperText, InputBaseProps, OutlinedInputProps, TextField, useTheme } from '@mui/material';

export type IFormicTextField = InputBaseProps &
  OutlinedInputProps & {
    inputField?: any;
    id?: string;
    value?: string;
    onValueChange: (newValue: string | null) => void;
    options: Array<any>;
    errorMsg: string;
    errorStatus?: any;
    placeholder: string;
  };

export const FormikInputHairAndEyesColor = ({
  errorStatus,
  errorMsg,
  options,
  id,
  value,
  onValueChange,
  inputField,
  placeholder,
  ...props
}: IFormicTextField) => {
  const theme = useTheme();

  return (
    <Box border={'red'}>
      <Autocomplete
        id={id}
        value={value}
        onChange={(event: any, newValue: string | null) => {
          onValueChange(newValue);
        }}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary, border: '1px solid red' } }}
          />
        )}
      />
      {!!errorStatus && (
        <FormHelperText error id="helper-text-nationality">
          {errorMsg}
        </FormHelperText>
      )}
    </Box>
  );
};
