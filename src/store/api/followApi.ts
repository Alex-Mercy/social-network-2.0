import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { apiKey } from "./authApi";

export type FollowType = {
    resultCode: number;
    messages: null | string;
    data: object;
}

export const followApi = createApi({
    reducerPath: 'followApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://social-network.samuraijs.com/api/1.0/follow'}),
    tagTypes: ['Follow'],
    endpoints: (build) => ({
        followUser: build.mutation<FollowType, number>({
            query: (userId) => ({
                url: `${userId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'POST',
                body: userId
            }),
            invalidatesTags: ['Follow']
        }),
        unFollowUser: build.mutation<FollowType, number>({
            query: (userId) => ({
                url: `${userId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'DELETE',
                body: userId
            }),
            invalidatesTags: ['Follow']
            
        }),
    })
})