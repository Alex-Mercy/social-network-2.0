import { Divider, IconButton, List } from '@mui/material'
import React, { FC } from 'react'
import MenuListItem from './MenuListItem'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LoginIcon from '@mui/icons-material/Login';
import TelegramIcon from '@mui/icons-material/Telegram';
import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { DrawerHeader, drawerWidth } from '../../App';
import { authApi } from '../../store/api/authApi';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

type DrawerMenuProps = {
  open: boolean;
  handleDrawerClose: () => void;
  theme: Theme;
  MenuPrimaryItems: string[];
  MenuSecondaryItems: string[];
  MenuNotAuthorized: string[];
}

const DrawerMenu: FC<DrawerMenuProps> = ({open, handleDrawerClose, theme, MenuPrimaryItems, MenuSecondaryItems, MenuNotAuthorized}) => {
  const {data} = authApi.useGetIsAuthorizedQuery();


  

  return (
    <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {data?.id ? MenuPrimaryItems.map((text, index) => (
            <MenuListItem key={index} text={text.toLowerCase()} open={open} id={data.id}>
              {text === 'Profile' && <AccountBoxIcon />}
              {text === 'Users' && <GroupIcon />}
              {text === 'Messages' && <EmailIcon />}
              {text === 'Chat' && <TelegramIcon />}
            </MenuListItem>
          ))
          :
          MenuNotAuthorized.map((text, index) => (
            <MenuListItem key={index} text={text.toLowerCase()} open={open}>
              {text === 'Users' && <GroupIcon />}
              {text === 'Login' && <LoginIcon />}
            </MenuListItem>
          ))
          }
        </List>
        <Divider />
        <List>
          { data?.id && MenuSecondaryItems.map((text, index) => (
            <MenuListItem key={index} text={text} open={open}>
              {text === 'Music' && <MusicNoteIcon />}
              {text === 'Videos' && <VideoLibraryIcon />}
              {text === 'Settings' && <SettingsIcon />}
            </MenuListItem>
          ))}
        </List>
      </Drawer>
  )
}

export default DrawerMenu;