import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom';

type MenuItemProps = {
text: string;
open: boolean;
children: React.ReactNode;
id?: number;
}

const MenuListItem: FC<MenuItemProps> = ({text, open, children, id}) => {
  const link = text === 'profile' ? text + '/' + id : text;
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