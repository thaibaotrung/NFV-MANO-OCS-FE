import { ReactNode, SyntheticEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, ButtonBase, CardContent, ClickAwayListener, Grid, Paper, Popper, Stack, Tooltip, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import IconButton from 'components/@extended/IconButton';
import useAuth from 'hooks/useAuth';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';
import { LogoutOutlined } from '@ant-design/icons';

// types
import { ThemeMode } from 'types/config';
import { useSelector } from 'react-redux';

// types
interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

// tab panel wrapper
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const profile = useSelector((state: any) => state.userSlice.profile);
  const theme = useTheme();
  const navigate = useNavigate();

  // const { data } = useQuery({
  //   queryKey: ['Profile'],
  //   queryFn: async () => {
  //     const res = await axiosServices.get(`${process.env.REACT_APP_API_DOMAIN}/api/admin/profile`);
  //     return res.data;
  //   }
  // });

  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/login`, {
        state: {
          from: ''
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 5,
          '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter' },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          },
          padding: 0.5,
          border: `3px solid ${theme.palette.primary.main}`
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={avatar1} size="sm" />
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {profile.username || user?.name}
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 250
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="start" alignItems="center">
                      <Button
                        variant="text"
                        color="inherit"
                        // startIcon={<Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />}
                        fullWidth
                        sx={{
                          justifyContent: 'start'
                        }}
                        onClick={() =>
                          navigate(`/apps/profiles/user/personal`, {
                            state: {
                              from: ''
                            }
                          })
                        }
                      >
                        View Profile
                      </Button>
                      {/* <Stack direction="row" spacing={1.25} alignItems="center">
                          <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />
                          <Stack>
                            <Typography variant="h6">{profile.username || user?.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {profile.role.code}
                            </Typography>
                          </Stack>
                        </Stack> */}
                      {/* <Grid item>
                        <Tooltip title="Logout">
                          <IconButton size="large" sx={{ color: 'text.primary' }} onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid> */}
                    </Grid>
                    <Grid container>
                      <Button
                        variant="text"
                        color="inherit"
                        // startIcon={<LogoutOutlined style={{ fontSize: '24px', padding: '4px' }} />}
                        fullWidth
                        sx={{
                          justifyContent: 'start'
                        }}
                        onClick={handleLogout}
                      >
                        <Typography>Logout</Typography>
                      </Button>
                    </Grid>
                  </CardContent>

                  {/*<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>*/}
                  {/*  <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">*/}
                  {/*    <Tab*/}
                  {/*      sx={{*/}
                  {/*        display: 'flex',*/}
                  {/*        flexDirection: 'row',*/}
                  {/*        justifyContent: 'center',*/}
                  {/*        alignItems: 'center',*/}
                  {/*        textTransform: 'capitalize'*/}
                  {/*      }}*/}
                  {/*      icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}*/}
                  {/*      label="Profile"*/}
                  {/*      {...a11yProps(0)}*/}
                  {/*    />*/}
                  {/*    <Tab*/}
                  {/*      sx={{*/}
                  {/*        display: 'flex',*/}
                  {/*        flexDirection: 'row',*/}
                  {/*        justifyContent: 'center',*/}
                  {/*        alignItems: 'center',*/}
                  {/*        textTransform: 'capitalize'*/}
                  {/*      }}*/}
                  {/*      icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}*/}
                  {/*      label="Setting"*/}
                  {/*      {...a11yProps(1)}*/}
                  {/*    />*/}
                  {/*  </Tabs>*/}
                  {/*</Box>*/}
                  {/*<TabPanel value={value} index={0} dir={theme.direction}>*/}
                  {/*  <ProfileTab handleLogout={handleLogout} />*/}
                  {/*</TabPanel>*/}
                  {/*<TabPanel value={value} index={1} dir={theme.direction}>*/}
                  {/*  <SettingTab />*/}
                  {/*</TabPanel>*/}
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
