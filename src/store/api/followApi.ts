import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

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
        getIsFollowed: build.query<boolean, number[]>({
            query: ([currentPage = 1, pageSize = 10]) => ({
                url: 'users',
                params: {
                    page: currentPage,
                    count: pageSize
                }
            }),
            providesTags: result => ['Follow']
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
            invalidatesTags: ['Follow']
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
            invalidatesTags: ['Follow']
            
        }),
    })
})