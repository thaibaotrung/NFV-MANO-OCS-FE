import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextFieldProps } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { FormikContextType } from 'formik';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs from 'dayjs';

export type IFormikInputDate = DatePickerProps<any> & {
  name: string;
  placeholder?: string;
  formik: FormikContextType<any>;
  endAdornmentIcon?: boolean;
  required?: boolean;
};

export const FormikInputDate = ({ formik, required = false, ...props }: IFormikInputDate) => {
  const handleChange = (newValue: Date) => {
    value = newValue;
    formik.setFieldValue(props.name, dayjs(newValue).format('YYYY-MM-DD'));
  };

  const touch = formik.touched[props.name as string];
  const error = formik.errors[props.name as string];
  let value = new Date(dayjs(formik.values[props.name as string], 'yyyy-MM-dd').format('YYYY-MM-DD'));
  // console.log('value1231312', dayjs(formik.values[props.name as string]).format('YYYY-MM-DD'));
  // console.log('value1231312', dayjs('15-10-2002', 'DD-MM-YYYY').format('DD-MM-YYYY'));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        onChange={(value) => handleChange(value)}
        value={value}
        className="app-input-date"
        format="yyyy-MM-dd"
        slotProps={{
          textField: {
            error: !!(touch && error),
            helperText: touch ? error : '',
            onBlur: formik.handleBlur,
            name: props.name,
            required,
            placeholder: props.placeholder,
            value: value
            // Don't use it currently
            // InputProps: {
            //   endAdornment: endAdornmentIcon && (
            //     <SvgIcon>
            //       <CalendarSvg />
            //     </SvgIcon>
            //   ),
            // },
          } as TextFieldProps
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};
