export interface DataStoredInAccessToken {
    userId: number;
}

export interface DataStoredInRefreshToken {
    userId: number;
    email: string;
}
