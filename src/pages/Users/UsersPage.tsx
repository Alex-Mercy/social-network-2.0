import * as React from 'react';
import List from '@mui/material/List';
import { Pagination, Skeleton, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { usersApi } from '../../store/api/usersApi';
import UserItem from './UserItem';
import Search from '../../components/Search';


const pageSize = 50;

const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, error, isLoading } = usersApi.useGetAllUsersQuery({count: pageSize, page: currentPage});
  const [searchValue, setSearchValue] = React.useState(null)


  const pagesCount = data?.totalCount && Math.ceil(data.totalCount / pageSize);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const skeleton = Array(pageSize).fill(0);

  return (
    <Container maxWidth="md">
      <Search
      label='Find User'
      />
        {/* <TextField
          id="outlined-select-currency"
          select
          label="Select"
          helperText="Please select your currency"
        /> */}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      
        {isLoading &&
          skeleton.map((item) => (
            <Skeleton width={852} height={64}/ >
          ))
        }
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {data?.items?.map(user =>
          <UserItem key={user.id} user={user} />
        )}
      </List>
      <Pagination count={pagesCount} page={currentPage} onChange={handleChange} />
    </Container>
  );
}

export default UsersPage;