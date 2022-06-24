import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Button, Pagination } from '@mui/material';
import { Container } from '@mui/system';
import { usersApi } from '../store/api/api';

import userLogo from '../assets/images/dev.jpg';

const pageSize = 50;

const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, error, isLoading } = usersApi.useGetAllUsersQuery([currentPage, pageSize]);
  const [follow, {error: followError, isLoading: isFollowLoading}]  = usersApi.useFollowUserMutation();

  const pagesCount = data?.totalCount && Math.ceil(data.totalCount / pageSize);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  
  

  const handleFollow = async () => {
    await follow(567);
}

  return (
    <Container maxWidth="md">
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {data?.items?.map(user =>
          <div key={user.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="User" src={user.photos.small ? user.photos.small : userLogo} />
              </ListItemAvatar>
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
                <Button variant="contained">Unfollow</Button>
                : <Button variant="outlined" onClick={handleFollow}>Follow</Button>
              }
            </ListItem>

            <Divider variant="inset" component="li" />
          </div>
        )}
      </List>
      <Pagination count={pagesCount} page={currentPage} onChange={handleChange} />
    </Container>
  );
}

export default UsersPage;