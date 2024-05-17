import { Button, Grid, InputLabel, Stack, Typography } from "@mui/material";
import MainCard from "components/MainCard";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormikInputField } from "common/formik/formik-input-field";
import { width } from "@mui/system";
import { FormikInputHairAndEyesColor } from "common/formik/formik-input-eye-and-hair-color";
import { useNavigate } from "react-router";

export const EmpCreate = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required(`Name is required`),
    description: yup.string().required(`Description is required`),
    vnfdName: yup.string().required(`Vnfd Name is required`),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      vnfdName: "",
    },
    onSubmit: (values) => console.log(values),
    validationSchema,
  });
  const navigate = useNavigate();

  return (
    <>
      <MainCard sx={{ width: "75%", alignSelf: "center" }}>
        <Typography variant="h5">VNF Instance Create</Typography>
        <Stack gap={3} mt={2}>
          <Grid item xs={6} sm={6}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <InputLabel>Name</InputLabel>
              </Stack>
              <FormikInputField
                name="name"
                placeholder={"Name"}
                type="text"
                formik={formik}
              />
            </Stack>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <InputLabel>Description</InputLabel>
              </Stack>
              <FormikInputField
                name="description"
                placeholder={"Description"}
                type="text"
                formik={formik}
              />
            </Stack>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <InputLabel>VNFD Name</InputLabel>
              </Stack>
              <FormikInputHairAndEyesColor
                onValueChange={(e) => formik.setFieldValue("vnfdName", e)}
                value={formik.values.vnfdName}
                options={["ngocDa", "trungTB", "diep"].map((item) => item)}
                placeholder={"VNFD Name"}
                id="hairColor"
                errorStatus={formik.touched.vnfdName && formik.errors.vnfdName}
                errorMsg={String(formik.errors.vnfdName)}
                name={"hairColor"}
              />
            </Stack>
          </Grid>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"flex-end"} gap={5}>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            sx={{
              width: "20%",
              alignSelf: "end",
              padding: 1.5,
              mt: 3,
            }}
            variant="contained"
            color="error"
          >
            Back
          </Button>
          <Button
            onClick={() => {}}
            sx={{ width: "20%", alignSelf: "end", padding: 1.5, mt: 3 }}
            variant="contained"
          >
            Create
          </Button>
        </Stack>
      </MainCard>
    </>
  );
};
