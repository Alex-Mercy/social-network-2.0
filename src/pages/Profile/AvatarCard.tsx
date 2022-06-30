import { Card, CardContent, CardMedia } from '@mui/material'
import React, { FC } from 'react'
import { profileApi, ProfileResponseType } from '../../store/api/profileApi'
import userLogo from '../../assets/images/dev.jpg';

type CardAvatarProps = {
  profileData?: ProfileResponseType;
  paramsId?: string;
  isLoading: boolean;
}

const AvatarCard: FC<CardAvatarProps> = ({ profileData, paramsId, isLoading }) => {

  const [uploaadPhoto, { }] = profileApi.useUploadFileMutation()

  const selectNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      uploaadPhoto(e.target.files[0]);
    }
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      {!isLoading &&
        <CardMedia
          component="img"
          height="300"
          image={profileData?.photos.large ? profileData?.photos.large : userLogo}
          alt='User Avatar'
        />
      }
      {!paramsId &&
        <CardContent>
          <input onChange={selectNewAvatar} type="file" ></input>
        </CardContent>
      }

    </Card>
  )
}

export default AvatarCard;