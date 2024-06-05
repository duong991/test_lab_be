import { sign, verify } from "jsonwebtoken";

const createTokenPair = async (
    payloadAccess: any,
    payloadRefresh: any,
    publicKey: any,
    privateKey: any,
): Promise<{ accessToken: string; refreshToken: string }> => {
    const accessToken = sign(payloadAccess, privateKey, {
        algorithm: "RS256",
        expiresIn: "30m",
    });

    const refreshToken = sign(payloadRefresh, privateKey, {
        algorithm: "RS256",
        expiresIn: "30d",
    });
    return { accessToken, refreshToken };
};

const verifyToken = async (token: string, publicKey: any): Promise<any> => {
    try {
        return verify(token, publicKey);
    } catch (error) {
        console.log("🚀 ~ verifyToken ~ error:", error);
    }
};

export { createTokenPair, verifyToken };
