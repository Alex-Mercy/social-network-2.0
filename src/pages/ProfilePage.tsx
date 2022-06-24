import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container } from '@mui/system';
import { Button, Grid, Input, List, ListItem, ListItemText, Stack } from '@mui/material';
import { authApi, profileApi } from '../store/api/api';
import { useMatch, useParams } from 'react-router-dom';
import { PhotoCamera } from '@mui/icons-material';


const ProfilePage: React.FC = () => {
  // const {data: authData} = authApi.useGetIsAuthorizedQuery();
  const match = useMatch("/profile/:userId/");
  const userId = match ? match.params.userId : '21639';

  const { data: profileData } = profileApi.useGetProfileQuery(userId!);


  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={6} sm={4} md={4} lg={3} xl={3} >
          <Card sx={{ maxWidth: 345 }}>

            <CardMedia
              component="img"
              height="300"
              image="https://catherineasquithgallery.com/uploads/posts/2021-03/1614563215_14-p-kartinka-cheloveka-na-belom-fone-17.png"
              alt="Paella dish"
            />
            <CardContent>
              <input type="file" ></input>
            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={6} sm={8} md={8} lg={9} xl={9}>
          <Card sx={{ maxWidth: 500 }}>

            <CardContent>

              <ListItem >
                <b>Full name</b>: {profileData?.fullName}
              </ListItem>
              <ListItem >
                <b>Looking for a job</b>: {profileData?.lookingForAJob}
              </ListItem>
              <ListItem >
                <b>My professioanal slills</b>: {profileData?.lookingForAJobDescription}
              </ListItem>
              <ListItem >
                <b>About me</b>: {profileData?.aboutMe}
              </ListItem>
              {profileData && Object.entries(profileData.contacts).map((key) => (
                <ListItem key={key[0]}>
                  <b>{key[0]}</b>: {key[1]}
                </ListItem>
              ))}

              <Button variant='outlined'>Edit profile</Button>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}


export default ProfilePage;