import * as React from 'react';
import List from '@mui/material/List';
import { Box, MenuItem, Pagination, Skeleton, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { usersApi } from '../../store/api/usersApi';
import UserItem from './UserItem';
import { debounce } from 'lodash';


const pageSize = 50;

const UsersPage: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1);
  const filters = ['All users', 'Followed users', 'Unfollowed users'];
  const [filter, setFilter] = React.useState(filters[0]);
  const friend = filter === 'Followed users' ? true : filter === 'Unfollowed users' ? false : null;

  const { data, error, isLoading } = usersApi.useGetAllUsersQuery(
    { count: pageSize, 
      page: currentPage, 
      term: searchValue,
      friend
    });

  const pagesCount = data?.totalCount && Math.ceil(data.totalCount / pageSize);
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e?.target?.value)
    setCurrentPage(1);

  }
  const debouncedOnchange = debounce(handleSearch, 700)

  const skeleton = Array(pageSize).fill(0);

  const changeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="search" label='Find user' onChange={debouncedOnchange} variant="outlined" />
        <TextField
          id="outlined-select-currency"
          select
          value={filter}
          onChange={changeFilter}
        >
          {filters.map((filter) => (
            <MenuItem key={filter} value={filter}>
              {filter}
            </MenuItem>
            ))}
        </TextField>
      </Box>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

        {isLoading &&
          skeleton.map((item, index) => (
            <Skeleton width={852} height={64} key={index} />
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