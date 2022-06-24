import { Container } from '@mui/material'
import React, { FC } from 'react'

const VideosPage: FC = () => {
  return (
    <Container maxWidth="xl">
    <div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/TUcn_vPHfxU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
    </Container>
  )
}

export default VideosPage