import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { FollowType,  LoginFormRequestType, LoginFormResponseType,  MeResponseDataType, MeResponseType, UsersType } from "../types";


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


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://social-network.samuraijs.com/api/1.0/auth'}),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        getIsAuthorized: build.query<MeResponseType, void>({
            query: () => ({
                url: 'me',
                credentials: 'include',
                headers: {
                    "API-KEY": "24635b41-a830-49f0-81e2-67ea1fbc69b6"
                },
            }),
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
