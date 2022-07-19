import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/Profile/ProfilePage';
import MusicPage from './pages/Music/MusicPage';
import VideosPage from './pages/Videos/VideosPage';
import SettingsPage from './pages/Settings/SettingsPage';
import UsersPage from './pages/Users/UsersPage';
import Header from './components/DrawerHeaderMenu/Header';
import DrawerMenu from './components/DrawerHeaderMenu/DrawerMenu';
import LoginPage from './pages/Login/LoginPage';
import MessagesPage from './pages/Messages/MessagesPage';
import ChatPage from './pages/Chat/ChatPage';

export const drawerWidth = 240;
const MenuPrimaryItems = ['Profile', 'Users', 'Messages', 'Chat'];
const MenuSecondaryItems = ['Music', 'Videos', 'Settings'];
const MenuNotAuthorized = ['Login', 'Users'];


export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const App: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        MenuPrimaryItems={MenuPrimaryItems}
      />
      <DrawerMenu
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        MenuPrimaryItems={MenuPrimaryItems}
        MenuSecondaryItems={MenuSecondaryItems}
        MenuNotAuthorized={MenuNotAuthorized}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path='/' element={<ProfilePage />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/messages/:id' element={<MessagesPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/music' element={<MusicPage />} />
          <Route path='/videos' element={<VideosPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;