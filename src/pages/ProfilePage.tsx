import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Container } from '@mui/system';
import { Button, Grid, Input, List, ListItem, ListItemText, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { authApi } from '../store/api/authApi';
import { profileApi } from '../store/api/profileApi';
import userLogo from '../assets/images/dev.jpg';


const ProfilePage: React.FC = () => {
  const { data: authData } = authApi.useGetIsAuthorizedQuery();
  const params = useParams();
  const paramsId = Object.values(params)[0];
  const userId = paramsId ? paramsId : authData?.id;
  const { data: profileData } = profileApi.useGetProfileQuery(userId!, {
    skip: authData?.id === undefined
  });


  const [uploaadPhoto, {}] = profileApi.useUploadFileMutation()
  const selectNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      uploaadPhoto(e.target.files[0]);
    }
  }


  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={6} sm={4} md={4} lg={3} xl={3} >
          <Card sx={{ maxWidth: 345 }}>

            <CardMedia
              component="img"
              height="300"
              image={profileData?.photos.large ? profileData?.photos.large : userLogo}
              alt='User Avatar'
            />
            
              {!paramsId &&
              <CardContent>
                <input onChange={selectNewAvatar} type="file" ></input>
                </CardContent>
              }

            

          </Card>
        </Grid>

        <Grid item xs={6} sm={8} md={8} lg={9} xl={9}>
          <Card sx={{ maxWidth: 500 }}>
            <CardContent>
              <List>
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
              </List>
              {!paramsId &&
                <Button variant='outlined'>Edit profile</Button>
              }
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}


export default ProfilePage;