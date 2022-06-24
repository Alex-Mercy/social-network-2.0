import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { FollowType,  LoginFormRequestType, LoginFormResponseType, UsersType } from "../types";


export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://social-network.samuraijs.com/api/1.0/'}),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getAllUsers: build.query<UsersType, number[]>({
            query: ([currentPage = 1, pageSize = 10]) => ({
                url: 'users',
                params: {
                    page: currentPage,
                    count: pageSize
                }
            }),
            providesTags: result => ['Users']
        }),
        followUser: build.mutation<FollowType, number>({
            query: (userId) => ({
                
                url: `follow/${userId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": "24635b41-a830-49f0-81e2-67ea1fbc69b6"
                },
                method: 'POST',
                body: {}
            }),
            invalidatesTags: ['Users']
        }),
        unFollowUser: build.mutation<FollowType, number>({
            query: (userId) => ({
                url: `follow/${userId}`,
                method: 'DELETE',
                body: userId
            }),
            invalidatesTags: ['Users']
        }),
    })
})


export type MeResponseType = {
    data: MeResponseDataType;
    fieldsErrors: [];
    messages: [];
    resultCode: number;
}

export type MeResponseDataType = {
    id: number
    email: string
    login: string
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://social-network.samuraijs.com/api/1.0/auth'}),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        getIsAuthorized: build.query<MeResponseDataType, void>({
            query: () => ({
                url: 'me',
                credentials: 'include',
                headers: {
                    "API-KEY": "24635b41-a830-49f0-81e2-67ea1fbc69b6"
                },
            }),
            transformResponse: (response: MeResponseType) => response.data,
            providesTags: result =>  ['Auth']
        }),
        login: build.mutation<LoginFormResponseType, LoginFormRequestType>({
            query: ({email, password, remember}) => ({
                url: `login`,
                credentials: 'include',
                headers: {
                    "API-KEY": "24635b41-a830-49f0-81e2-67ea1fbc69b6"
                },
                method: 'POST',
                body: {email, password, remember}
            }),
            invalidatesTags: ['Auth']
        }),
        logout: build.mutation<LoginFormResponseType, void>({
            query: () => ({
                url: `login`,
                credentials: 'include',
                method: 'DELETE',
            }),
            invalidatesTags: ['Auth']
        }),
    })
})

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

export type ProfileType = {
    userId: number;
    fullName: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    aboutMe: string;
    contacts: ProfileContactsType;
    
}


export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://social-network.samuraijs.com/api/1.0/profile'}),
    tagTypes: ['Profile'],
    endpoints: (build) => ({
        getProfile: build.query<ProfileType, number | string>({
            query: (userId) => ({
                url: `${userId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": "24635b41-a830-49f0-81e2-67ea1fbc69b6"
                },
            }),
            providesTags: result =>  ['Profile']
        }),
        login: build.mutation<LoginFormResponseType, LoginFormRequestType>({
            query: ({email, password, remember}) => ({
                url: `login`,
                credentials: 'include',
                headers: {
                    "API-KEY": "24635b41-a830-49f0-81e2-67ea1fbc69b6"
                },
                method: 'POST',
                body: {email, password, remember}
            }),
            invalidatesTags: ['Profile']
        }),
        logout: build.mutation<LoginFormResponseType, void>({
            query: () => ({
                url: `login`,
                credentials: 'include',
                method: 'DELETE',
            }),
            invalidatesTags: ['Profile']
        }),
    })
})