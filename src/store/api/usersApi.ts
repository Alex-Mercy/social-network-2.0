import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
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
                body: userId
            }),
            invalidatesTags: ['Users']
        }),
        unFollowUser: build.mutation<FollowType, number>({
            query: (userId) => ({
                url: `follow/${userId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": "24635b41-a830-49f0-81e2-67ea1fbc69b6"
                },
                method: 'DELETE',
                body: userId
            }),
            invalidatesTags: ['Users']
            
        }),
    })
})