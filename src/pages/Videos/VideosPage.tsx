import { Container } from '@mui/material'
import React, { FC } from 'react'
import { Navigate } from 'react-router-dom';
import { authApi } from '../../store/api/authApi';

const VideosPage: FC = () => {
  const { data } = authApi.useGetIsAuthorizedQuery();
  return (
    <>
    {!data?.id ?
      <Navigate to='/login' />
    : <Container maxWidth="xl">
      <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/TUcn_vPHfxU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </Container>
}
    </>
  )
}

export default VideosPage