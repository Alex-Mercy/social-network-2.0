import { Button, Card, CardContent, CardMedia, ListItem, TextField } from '@mui/material'
import React, { FC, useState } from 'react'
import { profileApi, ProfileResponseType, ProfileStatusRequestType } from '../../store/api/profileApi'
import userLogo from '../../assets/images/dev.jpg';
import { useNavigate } from 'react-router-dom';

type CardAvatarProps = {
  profileData?: ProfileResponseType;
  paramsId?: string;
  isLoading: boolean;
  profileStatus?: string | number;
}

const AvatarCard: FC<CardAvatarProps> = ({ profileData, paramsId, isLoading, profileStatus }) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [statusValue, setStatusValue] = useState(profileStatus);
  const [uploaadPhoto, { }] = profileApi.useUploadFileMutation();
  const [setStatus, { }] = profileApi.usePutProfileStatusMutation();

  const statusError = statusValue && statusValue?.toString().length > 300 ? true : false;

  const selectNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      uploaadPhoto(e.target.files[0]);
    }
  }


  const newStatus: ProfileStatusRequestType = {
    status: statusValue as string
  }

  const handleClick = async () => {
    if (editMode) await setStatus(newStatus);
    setEditMode(!editMode)
  }

  console.log(profileData);


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
      {!paramsId ?
        <CardContent>
          <input onChange={selectNewAvatar} type="file" ></input>
        </CardContent>
        :
        <ListItem>
          <Button
            variant='outlined'
            onClick={() => { navigate('/messages/' + paramsId) }}
          >
            Private Message
          </Button>
        </ListItem>
      }
      <>
        {editMode ?
          <TextField
            variant="outlined"
            label="Status"
            size="small"
            defaultValue={profileStatus}
            error={statusError}
            helperText='Max Status length is 300 symbol'
            onChange={(e) => setStatusValue(e.target.value)}
            sx={{
              marginLeft: '1ch'
            }}
          />
          : profileStatus ?
            <ListItem>
              <span><b>Status</b>: {profileStatus}</span>
            </ListItem>
            :
            <></>
        }
        {!paramsId &&
          <Button
            style={{ margin: '5px 5px 10px 10px' }}
            variant='outlined'
            onClick={handleClick}
            disabled={statusError}
          >
            {!editMode ? 'Change Status' : 'Save Status'}
          </Button>
        }
      </>

    </Card>
  )
}

export default AvatarCard;