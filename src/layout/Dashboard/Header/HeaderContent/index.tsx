// material-ui
import { Box, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

// project import
import Profile from './Profile';
import MobileSection from './MobileSection';

// types

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  // const { i18n, menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const localization = useMemo(() => <Localization />, [i18n]);

  // const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {/* {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />} */}
      {/*{!downLG && <Search />}*/}

      {!downLG && <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />}

      {/*{!downLG && megaMenu}*/}
      {/* {!downLG && localization} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {/*<Notification />*/}
      {/*<Message />*/}
      {/* {!downLG && <FullScreen />} */}
      {/* <Customization /> */}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
