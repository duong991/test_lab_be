export interface UserData {
    email: string;
}

export interface TokenData {
    accessToken: string;
    refreshToken: string;
}

export interface UserRO {
    user: UserData;
    token?: TokenData;
}
