import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom';

type MenuItemProps = {
text: string;
open: boolean;
children: React.ReactNode;
}

const MenuListItem: FC<MenuItemProps> = ({text, open, children}) => {
  const link = text.toLowerCase();
  return (
    <ListItem key={text}  style={{color : '#000000'}} disablePadding component={Link} to={link} sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {children}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
  )
}

export default MenuListItem;