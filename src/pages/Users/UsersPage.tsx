import * as React from 'react';
import List from '@mui/material/List';
import { Box, MenuItem, Pagination, Skeleton, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { usersApi } from '../../store/api/usersApi';
import UserItem from './UserItem';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { authApi } from '../../store/api/authApi';

const pageSize = 50;

const UsersPage: React.FC = () => {
  const skeleton = Array(pageSize).fill(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const termQuery = searchParams.get('term') || '';
  const friendQuery = searchParams.get('friend') || '';
  const pageQuery = Number(searchParams.get('page')) || 1;

  const filters = ['All users', 'Followed users', 'Unfollowed users'];
  const filterValue = friendQuery === 'true' ? 'Followed users' : friendQuery === 'false' ? 'Unfollowed users' : 'All users';

  const [searchValue, setSearchValue] = React.useState(termQuery);
  const [currentPage, setCurrentPage] = React.useState(pageQuery);
  const [filter, setFilter] = React.useState(filterValue);

  const { data: authData } = authApi.useGetIsAuthorizedQuery();
  const { data, error, isLoading } = usersApi.useGetAllUsersQuery(
    {
      count: pageSize,
      page: pageQuery,
      term: termQuery,
      friend: friendQuery
    });
    console.log('Rendered UsersPge');
    

  const pagesCount = data?.totalCount && Math.ceil(data.totalCount / pageSize);

  const params: any = {};

  const handleParams = (page: number, filter: string, search: string) => {
    if (page > 1) params.page = page;
    if (search.length) params.term = search;
    if (filter === 'Followed users') params.friend = true;
    if (filter === 'Unfollowed users') params.friend = false;
    return params;
  }

  const changePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    handleParams(page, filter, searchValue)
    setSearchParams(params);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e?.target?.value;
    setSearchValue(query);
    handleParams(1, filter, query);
    debounceFn(params);
  }

  const handleDebounceFn = (params: string) => {
    setCurrentPage(1);
    setSearchParams(params);
  }

  const debounceFn = React.useCallback(debounce(handleDebounceFn, 700), []);

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e?.target?.value;
    setFilter(query);
    handleParams(currentPage, query, searchValue);
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

        {authData?.id && <TextField
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
        }
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
      <Pagination count={pagesCount} page={currentPage} onChange={changePage} />
    </Container>
  );
}

export default UsersPage;