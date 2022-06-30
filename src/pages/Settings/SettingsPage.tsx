import { Container } from '@mui/material'
import React, { FC } from 'react'
import { Navigate } from 'react-router-dom';
import { authApi } from '../../store/api/authApi';

const SettingsPage: FC = () => {
  const { data } = authApi.useGetIsAuthorizedQuery();

  return (
    <>
      {!data?.id ?
        <Navigate to='/login' />
        : <Container maxWidth="xl">
          <div>SettingsPage</div>
        </Container>
      }
    </>
  )
}

export default SettingsPage