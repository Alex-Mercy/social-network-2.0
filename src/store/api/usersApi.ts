import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { apiKey } from "./authApi";
import { ProfilePhotosType } from "./profileApi";


export type UserType = {
    id: number;
    name: string;
    status: string | null;
    photos: ProfilePhotosType;
    followed: boolean;
}

export type UsersType = {
    items: UserType[];
    totalCount: number;
    error: string | null;
}

export type FollowType = {
    resultCode: number;
    messages: null | string;
    data: object;
}

export type RequestUsersType = {
    count: number;
    page: number;
    term?: string;
    friend: boolean | string;
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://social-network.samuraijs.com/api/1.0/'}),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getAllUsers: build.query<UsersType, RequestUsersType>({
            query: ({count = 10, page = 1, term = '', friend = null }) => ({
                url: 'users',
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                params: {
                    count,
                    page,
                    term,
                    friend
                }
            }),
            providesTags: result => ['Users']
        }),
        followUser: build.mutation<FollowType, number>({
            query: (userId) => ({
                url: `follow/${userId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'POST',
                body: userId
            }),
            invalidatesTags: ['Users']
        }),
        unFollowUser: build.mutation<FollowType, number>({
            query: (userId) => ({
                url: `follow/${userId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'DELETE',
                body: userId
            }),
            invalidatesTags: ['Users']
            
        }),
    })
})