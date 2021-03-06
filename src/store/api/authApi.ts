import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const apiKey = "6e577c02-c326-44b0-be97-ae8ef3d8a8b9";

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
                    "API-KEY": apiKey
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
                    "API-KEY": apiKey
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
                    "API-KEY": apiKey
                },
            }),
            providesTags: ['Captcha']
        }),
    })
})