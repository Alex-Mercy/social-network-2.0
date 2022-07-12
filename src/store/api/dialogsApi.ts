import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { apiKey } from "./authApi";

export type DialogItem = {
    addedAt: string;
    body: string;
    id: string;
    recipientId: number;
    senderId: number;
    senderName: string;
    translatedBody: boolean;
    viewed: boolean;
}

export type GetDialogResponseType = {
    error: boolean;
    items: DialogItem[];
    totalCount: number;
}

export type MessagesResponseType = {
    data: Object;
    fieldsErrors: [];
    messages: [];
    resultCode: number;
}

export type SendMessageRequest = {
    body: string;
    userId: number;
}

export type GetNewestMessagesRequest = {
    userId: number;
    date: string;
}




export const dialogsApi = createApi({
    reducerPath: 'dialogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0/dialogs' }),
    tagTypes: ['AllDialogs', 'OneDialog', 'ViewedDialog', 'NewesTmessages', 'ListOfNewMessages'],
    endpoints: (build) => ({
        getAllDialogs: build.query<GetDialogResponseType, void>({
            query: () => ({
                url: ``,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
            }),
            providesTags: ['AllDialogs']
        }),
        getDialog: build.query<GetDialogResponseType, number>({
            query: (userId) => ({
                url: `${userId}/messages`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
            }),
            providesTags: ['OneDialog']
        }),
        startChatting: build.mutation<MessagesResponseType, number>({
            query: (userId) => ({
                url: `${userId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'PUT',
                body: userId
            }),
            invalidatesTags: ['AllDialogs']
        }),
        sendMessage: build.mutation<MessagesResponseType, SendMessageRequest>({
            query: ({ userId, body }) => ({
                url: `${userId}/messages`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'POST',
                body: { userId, body }
            }),
            invalidatesTags: ['OneDialog']
        }),
        getIsMessageViewed: build.query<boolean, string>({
            query: (messageId) => ({
                url: `messages/${messageId}/viewed`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
            }),
            providesTags: ['ViewedDialog']
        }),
        sendMessageToSpam: build.mutation<MessagesResponseType, void>({
            query: (messageId) => ({
                url: `messages/${messageId}/spam`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'POST',
            }),
            invalidatesTags: ['AllDialogs']
        }),
        deleteMessage: build.mutation<MessagesResponseType, void>({
            query: (messageId) => ({
                url: `messages/${messageId}`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['AllDialogs']
        }),
        restoreMessage: build.mutation<MessagesResponseType, void>({
            query: (messageId) => ({
                url: `messages/${messageId}/restore`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
                method: 'PUT',
            }),
            invalidatesTags: ['AllDialogs']
        }),
        getNewestMessages: build.query<Object[], GetNewestMessagesRequest>({
            query: ({ userId, date }) => ({
                url: `${userId}/messages/new?newerThen=${date}`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
            }),
            providesTags: ['NewesTmessages']
        }),
        getListOfNewMessages: build.query<Object | number, void>({
            query: () => ({
                url: `dialogs/messages/new/count`,
                credentials: 'include',
                headers: {
                    "API-KEY": apiKey
                },
            }),
            providesTags: ['ListOfNewMessages']
        }),
    })
})