import { Link } from "react-router-dom";
import { To } from "history";

// material-ui
import { ButtonBase, Stack, styled, Typography } from "@mui/material";
import { SxProps } from "@mui/system";

// project import
import { APP_DEFAULT_PATH } from "config";
import useAuth from "hooks/useAuth";
import { images } from "../../assets/images";

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

const Image = styled("img")(() => ({
  height: "35px",
}));

const LogoSection = ({ reverse, isIcon, sx, to }: Props) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <ButtonBase
        disableRipple
        {...(isLoggedIn && {
          component: Link,
          to: !to ? APP_DEFAULT_PATH : to,
          sx,
        })}
      >
        {isIcon ? (
          <Image
            sx={{
              width: "auto",
            }}
            src={images.AppIcon}
            alt={""}
          />
        ) : (
          <Stack gap={1} flexDirection={"row"}>
            <Image
              sx={{
                width: "35px",
              }}
              src={images.AppIcon}
              alt={""}
            />
            <Typography variant={"h5"} alignSelf={"center"}>
              VNFM HOME PAGE
            </Typography>
          </Stack>
        )}
      </ButtonBase>
    </>
  );
};

export default LogoSection;
