import { Button, Checkbox, FormControlLabel, List, Stack } from '@mui/material';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { FC } from 'react'
import * as yup from "yup";
import { profileApi, ProfileRequestType, ProfileResponseType } from '../../store/api/profileApi';
import { FormTextField } from '../Login/FormTextField';

type EditDataProps = {
    data?: ProfileResponseType;
    listTitles: string[];
    contactsData?: [string, string][];
    handleClick: () => void;
}

const validationSchema = yup.object().shape({
    contacts: yup.object().shape({
        facebook: yup.string().url('Enter a valid url'),
        website: yup.string().url('Enter a valid url'),
        vk: yup.string().url('Enter a valid url'),
        twitter: yup.string().url('Enter a valid url'),
        instagram: yup.string().url('Enter a valid url'),
        youtube: yup.string().url('Enter a valid url'),
        github: yup.string().url('Enter a valid url'),
        mainLink: yup.string().url('Enter a valid url'),
    })
});


const EditDataProfile: FC<EditDataProps> = ({ data, listTitles, contactsData, handleClick }) => {
    const [uploadProfile, { }] = profileApi.useUploadProfileDataMutation();

    const handlePut = async (values: ProfileRequestType) => {
        await uploadProfile(values).unwrap();
        handleClick();
    }
    return (
        <div>
            <Formik
                initialValues={{
                    userId: data!.userId,
                    aboutMe: data ? data.aboutMe : '',
                    lookingForAJob: data?.lookingForAJob ? true : false,
                    fullName: data ? data.fullName : '',
                    lookingForAJobDescription: data ? data.lookingForAJobDescription : '',
                    contacts: {
                        github: data?.contacts.github ? data?.contacts.github : '',
                        vk: data?.contacts.vk ? data?.contacts.vk : '',
                        facebook: data?.contacts.facebook ? data?.contacts.facebook : '',
                        instagram: data?.contacts.instagram ? data?.contacts.instagram : '',
                        twitter: data?.contacts.twitter ? data?.contacts.twitter : '',
                        website: data?.contacts.website ? data?.contacts.website : '',
                        youtube: data?.contacts.youtube ? data?.contacts.youtube : '',
                        mainLink: data?.contacts.mainLink ? data?.contacts.mainLink : ''
                    }
                }}
                validationSchema={validationSchema}
                onSubmit={(
                    values: ProfileRequestType,
                    formikHelpers: FormikHelpers<ProfileRequestType>
                ) => {
                    handlePut(values);
                    formikHelpers.setSubmitting(false);
                }}
            >
                {(formikProps: FormikProps<ProfileRequestType>) => (

                    <Form noValidate autoComplete="off">
                        <List>
                            <Stack
                                component="form"
                                sx={{
                                    width: '50ch',
                                    marginLeft: '1ch'
                                }}
                                spacing={1}
                                noValidate
                                autoComplete="off"
                            >
                                <Field
                                    label={listTitles[0]}
                                    id='fullName'
                                    name='fullName'
                                    defaultValue={data?.fullName}
                                    variant="outlined"
                                    size="small"
                                    component={FormTextField}
                                />
                                <Field
                                    as={FormControlLabel}
                                    type="checkbox"
                                    name='lookingForAJob'
                                    control={<Checkbox />}
                                    label={listTitles[1]}
                                />
                                <Field
                                    label={listTitles[2]}
                                    id='lookingForAJobDescription'
                                    name='lookingForAJobDescription'
                                    defaultValue={data?.lookingForAJobDescription}
                                    variant="outlined"
                                    size="small"
                                    component={FormTextField}
                                />
                                <Field
                                    label={listTitles[3]}
                                    id='aboutMe'
                                    name='aboutMe'
                                    defaultValue={data?.aboutMe}
                                    variant="outlined"
                                    size="small"
                                    component={FormTextField}
                                />
                                {contactsData && contactsData.map((key) => (
                                    <Field
                                        key={key[0]}
                                        label={key[0]}
                                        id={"contacts." + key[0]}
                                        name={"contacts." + key[0]}
                                        defaultValue={key[1]}
                                        variant="outlined"
                                        size="small"
                                        component={FormTextField}
                                    />
                                ))}
                            </Stack>
                        </List>
                        <Button
                            type="submit"
                            disabled={!formikProps.isValid || formikProps.isSubmitting}
                            variant='outlined'
                        >
                            Save changes
                        </Button>
                    </Form>
                )}
            </Formik>


        </div>
    )
}

export default EditDataProfile