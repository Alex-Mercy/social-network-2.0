import * as React from 'react';
import List from '@mui/material/List';
import { Box, MenuItem, Pagination, Skeleton, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { usersApi } from '../../store/api/usersApi';
import UserItem from './UserItem';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';


const pageSize = 50;

const UsersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const termQuery = searchParams.get('term') || '';
  let friendQuery = searchParams.get('friend') || null;
  const filterValue = friendQuery ===  'true' ? 'Followed users' : friendQuery === 'false' ? 'Unfollowed users' : 'All users';
  
  const [searchValue, setSearchValue] = React.useState(termQuery);
  const [currentPage, setCurrentPage] = React.useState(1);
  const filters = ['All users', 'Followed users', 'Unfollowed users'];
  
  const [filter, setFilter] = React.useState(filterValue);

  const params: any = {};
  
  const { data, error, isLoading } = usersApi.useGetAllUsersQuery(
    { count: pageSize, 
      page: currentPage, 
      term: termQuery,
      friend: friendQuery
    });

  const pagesCount = data?.totalCount && Math.ceil(data.totalCount / pageSize);
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e?.target?.value;
    if (query.length) params.term = query;
    setSearchValue(query);
    debounceFn(params)
  }

  const handleDebounceFn = (params: string) => {
    setCurrentPage(1);
    setSearchParams(params);
  }

  const debounceFn = React.useCallback(debounce(handleDebounceFn, 700), []);

  const skeleton = Array(pageSize).fill(0);

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e?.target?.value;
    setFilter(query);
    if (query === 'Followed users') params.friend = true;
    if (query === 'Unfollowed users') params.friend = false;
    console.log(params);
    
    setSearchParams(params);
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
        <TextField id="search" label='Find user' onChange={handleSearch} value={searchValue} variant="outlined" />
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