import {createApi, fetchBaseQuery, SkipToken} from "@reduxjs/toolkit/dist/query/react";


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

export type LoginFormRequestType = {
    email: string;
    password: string;
    remember: boolean;
    captcha: string;
}

export type LoginFormResponseType = {
    data: {
        userId: number
    };
    fieldsErrors: [{
        errror: string;
        field: string
    }];
    messages: string[];
    resultCode: number;
}

export type CaptchaResponseType = {
    url: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://social-network.samuraijs.com/api/1.0/'}),
    tagTypes: ['Auth', 'Captcha'],
    endpoints: (build) => ({
        getIsAuthorized: build.query<MeResponseDataType, void>({
            query: () => ({
                url: 'auth/me',
                credentials: 'include',
                headers: {
                    "API-KEY": "24635b41-a830-49f0-81e2-67ea1fbc69b6"
                },
            }),
            transformResponse: (response: MeResponseType) => response.data,
            providesTags: ['Auth']
        }),
        login: build.mutation<LoginFormResponseType, LoginFormRequestType>({
            query: ({email, password, remember, captcha}) => ({
                url: `auth/login`,
                credentials: 'include',
                headers: {
                    "API-KEY": "24635b41-a830-49f0-81e2-67ea1fbc69b6"
                },
                method: 'POST',
                body: {email, password, remember, captcha}
            }),
            invalidatesTags: ['Auth', 'Captcha']
        }),
        logout: build.mutation<LoginFormResponseType, void>({
            query: () => ({
                url: `auth/login`,
                credentials: 'include',
                method: 'DELETE',
            }),
            invalidatesTags: ['Auth']
        }),
        getCaptcha: build.query<CaptchaResponseType, void >({
            query: () => ({
                url: '/security/get-captcha-url',
                credentials: 'include',
                headers: {
                    "API-KEY": "24635b41-a830-49f0-81e2-67ea1fbc69b6"
                },
            }),
            providesTags: ['Captcha']
        }),
    })
})