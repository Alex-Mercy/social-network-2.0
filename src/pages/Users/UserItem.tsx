import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { usersApi, UserType } from '../../store/api/usersApi';
import userLogo from '../../assets/images/dev.jpg';

type UserItemProps = {
    user: UserType;

}

const UserItem: FC<UserItemProps> = ({user, }) => {
    const [follow, {error: followError, isLoading: isFollowLoading, data: followData}]  = usersApi.useFollowUserMutation();
    const [unfollow, {isLoading: isUnFollowLoading, data: unFollowData}] = usersApi.useUnFollowUserMutation();

  return (
    <div>
            <ListItem alignItems="flex-start">
              <Link to={'/profile/' + user.id}>
              <ListItemAvatar >
                <Avatar alt="User" src={user.photos.small ? user.photos.small : userLogo} />
              </ListItemAvatar>
              </Link>
              <ListItemText
                primary={user.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {user.status && 'status:'} {user.status}
                    </Typography>

                  </React.Fragment>

                }
              />
              {user.followed ?
                <Button variant="contained" disabled={isUnFollowLoading} onClick={() => unfollow(user.id)}>Unfollow</Button>
                : <Button variant="outlined" disabled={isFollowLoading} onClick={() => follow(user.id)}>Follow</Button>
              }
            </ListItem>

            <Divider variant="inset" component="li" />
          </div>
  )
}

export default UserItem