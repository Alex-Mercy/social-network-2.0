import * as React from 'react';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { authApi } from '../../store/api/authApi';
import { profileApi } from '../../store/api/profileApi';
import AvatarCard from './AvatarCard';
import ContentCard from './ContentCard';
import Loader from '../../components/Loader';


const ProfilePage: React.FC = () => {
  const { data: authData, isLoading } = authApi.useGetIsAuthorizedQuery();
  const params = useParams();
  const paramsId = Object.values(params)[0];
  const userId = paramsId ? paramsId : authData?.id;
  const { data: profileStatusData } = profileApi.useGetProfileStatusQuery(userId!, {
    skip: authData?.id === undefined
  });
  const { data: profileData, isLoading: profileLoading } = profileApi.useGetProfileQuery(userId!, {
    skip: authData?.id === undefined
  });

  

  const contactsData = profileData && Object.entries(profileData.contacts);
  const listTitles = ['Full name', 'Looking for a job', 'My professional slills', 'About me',];

  
  return (
    <>
      {authData !== undefined && !authData?.id ?
        <Navigate to="/login" />
        : <Container maxWidth="xl">
          <Grid container spacing={2} direction="row" justifyContent="center">
            <Grid item xs={6} sm={4} md={4} lg={3} xl={3} >
              {!profileLoading ?
                <AvatarCard
                  isLoading={isLoading}
                  profileData={profileData}
                  paramsId={paramsId}
                  profileStatus={profileStatusData}
                  authId = {authData?.id.toString()}
                />
                : <Loader>
                  <AvatarCard
                    profileData={profileData}
                    paramsId={paramsId}
                    isLoading={isLoading}
                  />
                </Loader>
              }
            </Grid>

            <Grid item xs={6} sm={8} md={8} lg={9} xl={9}>
              {!profileLoading ?
                <ContentCard
                  profileData={profileData}
                  paramsId={paramsId}
                  listTitles={listTitles}
                  contactsData={contactsData}
                  isLoading={isLoading}
                  authId = {authData?.id.toString()}
                />
                : <Loader>
                  <ContentCard
                    profileData={profileData}
                    paramsId={paramsId}
                    listTitles={listTitles}
                    contactsData={contactsData}
                    isLoading={isLoading}
                  />
                </Loader>
              }
            </Grid>
          </Grid>
        </Container>
      }
    </>
  );
}


export default ProfilePage;