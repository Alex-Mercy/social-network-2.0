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


import { usersApi } from '../store/api/usersApi';
import { Link } from 'react-router-dom';
import { followApi } from '../store/api/followApi';
import UserItem from '../components/UserItem';

const pageSize = 50;

const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, error, isLoading } = usersApi.useGetAllUsersQuery([currentPage, pageSize]);


  const pagesCount = data?.totalCount && Math.ceil(data.totalCount / pageSize);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="md">
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {data?.items?.map(user =>
          <UserItem  key={user.id} user={user}/>
        )}
      </List>
      <Pagination count={pagesCount} page={currentPage} onChange={handleChange} />
    </Container>
  );
}

export default UsersPage;