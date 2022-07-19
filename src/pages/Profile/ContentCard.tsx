import { Button, Card, CardContent, List, ListItem } from '@mui/material'
import React, { FC } from 'react'
import { ProfileResponseType } from '../../store/api/profileApi';
import EditDataProfile from './EditDataProfile'

type ContentCardProps = {
    profileData?: ProfileResponseType;
    paramsId?: string;
    listTitles: string[];
    contactsData?: [string, string][];
    isLoading: boolean;
    authId?: string;
}


const ContentCard: FC<ContentCardProps> = ({profileData, paramsId, listTitles, contactsData, isLoading, authId}) => {
    const [editMode, setEditMode] = React.useState(false);

    const handleClick = () => {
        setEditMode(!editMode);
    }

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardContent>
                {editMode
                    ? <EditDataProfile 
                    data={profileData} 
                    handleClick={handleClick} 
                    contactsData={contactsData} 
                    listTitles={listTitles} 
                    />
                    : !isLoading &&
                    <List>
                        <ListItem >
                            <b>{listTitles[0]}</b>: {profileData?.fullName}
                        </ListItem>
                        <ListItem >
                            <b>{listTitles[1]}</b>: {profileData?.lookingForAJob ? 'Yes' : 'No'}
                        </ListItem>
                        <ListItem >
                            <b>{listTitles[2]}</b>: {profileData?.lookingForAJobDescription}
                        </ListItem>
                        <ListItem >
                            <b>{listTitles[3]}</b>: {profileData?.aboutMe}
                        </ListItem>
                        {contactsData && contactsData.map((key) => (
                            <ListItem key={key[0]}>
                                <b>{key[0]}</b>: {key[1]}
                            </ListItem>
                        ))}
                    </List>
                }

                {paramsId === authId && !editMode &&
                    <Button onClick={handleClick} variant='outlined'>Edit profile</Button>
                }
            </CardContent>

        </Card>
    )
}

export default ContentCard