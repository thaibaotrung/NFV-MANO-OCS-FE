import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  styled,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import IconButton from "components/@extended/IconButton";
import AnimateButton from "components/@extended/AnimateButton";

import useScriptRef from "hooks/useScriptRef";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import useAuth from "hooks/useAuth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

// ============================|| JWT - LOGIN ||============================ //

const AuthLogin = ({ isDemo = false }: { isDemo?: boolean }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "admin",
      password: "123456",
    },
  });
  const onSubmit = (data) => {
    console.log("data", data);
    navigate("/app/vnf");
  };

  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };
  const SpanTextRed = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    fontWeight: "bold",
    "&::before": {
      content: '"*"',
    },
  })) as typeof Typography;
  return (
    <>
      <Grid container spacing={3}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">
                  Email <SpanTextRed component="span" />
                </InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={value}
                  name="email"
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(errors.email)}
                />
              </Stack>
            </Grid>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">
                  Password <SpanTextRed component="span" />
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(errors.password)}
                  id="-password-login"
                  type={showPassword ? "text" : "password"}
                  value={value}
                  name="password"
                  onBlur={onBlur}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? (
                          <EyeOutlined />
                        ) : (
                          <EyeInvisibleOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
              </Stack>
            </Grid>
          )}
        />

        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              onClick={handleSubmit(onSubmit)}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthLogin;
