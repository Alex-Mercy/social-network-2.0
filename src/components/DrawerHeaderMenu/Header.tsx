import React, { FC } from 'react'
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../store/api/authApi';
import { drawerWidth } from '../../App';
import { profileApi } from '../../store/api/profileApi';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type HeaderProps = {
  handleDrawerOpen: () => void;
  open: boolean;
  MenuPrimaryItems: string[];
}

const Header: FC<HeaderProps> = ({ handleDrawerOpen, open, MenuPrimaryItems }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [logout, { }] = authApi.useLogoutMutation();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/login');
  }

  const { data } = authApi.useGetIsAuthorizedQuery();
  const { data: profileData, isLoading: profileLoading } = profileApi.useGetProfileQuery(data?.id!, {
    skip: data?.id === undefined
  });


  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Social Network
        </Typography>

        {data?.login ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={data.login} src={profileData?.photos.small!} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {MenuPrimaryItems.map((setting) => (
                <MenuItem
                  key={setting}
                  component={Link}
                  to={setting ==='Profile' ? setting.toLowerCase() + '/' + data.id : setting.toLowerCase()}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={handleLogout} textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          : data !== undefined ? <Button variant="contained" component={Link} to='/login' disableElevation>
            Login
          </Button>
            :
            <></>
        }

      </Toolbar>

    </AppBar>
  )
}

export default Header;