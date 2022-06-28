import * as React from 'react';
import List from '@mui/material/List';

import {Pagination } from '@mui/material';
import { Container } from '@mui/system';


import { usersApi } from '../../store/api/usersApi';
import UserItem from './UserItem';

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