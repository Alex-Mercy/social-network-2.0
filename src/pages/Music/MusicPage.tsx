import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Container } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { authApi } from '../../store/api/authApi';

const MusicPage: React.FC = () => {
  const theme = useTheme();
  const { data } = authApi.useGetIsAuthorizedQuery();

  return (
    <>
      {data !== undefined && !data?.id ?
        <Navigate to='/login' />

        : <Container maxWidth="xl">
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image="/static/images/cards/live-from-space.jpg"
              alt="Live from space album cover"
            />
          </Card>
        </Container>
      }
    </>
  );
}

export default MusicPage;