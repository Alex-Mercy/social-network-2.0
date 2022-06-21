export type PhotosType = {
    small: null | string;
    large: null | string;
}

export type UserType = {
    id: number;
    name: string;
    status: string | null;
    photos: PhotosType;
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

export type MeResponseDataType = {
    id: number
    email: string
    login: string
}

export type MeResponseType = {
    data: MeResponseDataType;
    fieldsErrors: [];
    messages: [];
    resultCode: number;
}
