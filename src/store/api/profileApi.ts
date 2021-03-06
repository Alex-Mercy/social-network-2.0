import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { apiKey } from "./authApi";

export type ProfileContactsType = {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
}

export type ProfilePhotosType = {
    small: null |string;
    large: null | string;   
}

export type ProfilePutPhotoType = {
    data: ProfilePhotosType;
    resultCode: number;
    messages: string[];
}


export type ProfileRequestType = {
    userId: number;
    fullName: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    aboutMe: string;
    contacts: ProfileContactsType;
}

export type ProfileResponseType = {
    userId: number;
    fullName: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    aboutMe: string;
    contacts: ProfileContactsType;
    photos: ProfilePhotosType; 
}

export type ProfileStatusRequestType = {
    status: string;
}

export type ProfileStatusResponseType = {
    resultCode: number;
    messages: string[];
    data: Object;
}

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://social-network.samuraijs.com/api/1.0/profile'}),
    tagTypes: ['Profile', 'ProfileStatus'],
    endpoints: (build) => ({
        getProfile: build.query<ProfileResponseType,string | number>({
            query: (userId) => ({
                url: `${userId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
            }),
            providesTags: result =>  ['Profile']
        }),
        uploadFile: build.mutation({
            async queryFn(file, _queryApi, _extraOptions, fetchWithBQ) {
              // upload with multipart/form-data
              const formData = new FormData();
              formData.append('file', file);
              const response = await fetchWithBQ({
                url: '/photo',
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'PUT',
                body: formData,
              });
              if (response.error) throw response.error;
              return response.data ? { data: response.data } : { error: response.error };
            },
            invalidatesTags: ['Profile']
          }),
          uploadProfileData: build.mutation<ProfileResponseType, ProfileRequestType>({
            query: (userId) => ({
                url: ``,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'PUT',
                body: userId
            }),
            invalidatesTags: ['Profile']
        }),
        logout: build.mutation<ProfileResponseType, ProfileResponseType>({
            query: () => ({
                url: `login`,
                credentials: 'include',
                method: 'DELETE',
            }),
            invalidatesTags: ['Profile']
        }),
        getProfileStatus: build.query<string, number | string>({
            query: (userId) => ({
                url: `status/${userId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
            }),
            providesTags: result =>  ['ProfileStatus']
        }),
        putProfileStatus: build.mutation<ProfileStatusResponseType, ProfileStatusRequestType>({
            query: (status) => ({
                url: `status`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'PUT',
                body: status
            }),
            invalidatesTags: ['ProfileStatus']
        }),
    })
})