import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET_KEY);
const cookieName = "auth_token";

//encrypt the payload and sign the JWT token
export async function signAuthToken (payload: string) { 
    try {
        const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
            .sign(secret);
        return token;
    } catch (error) {
        throw new Error("Error signing auth token");
    }

}

//decrypt and verify token
export async function verifyAuthToken<T> (token: string): Promise<T> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as T;
    } catch (error) {
        error.message = "Invalid or expired token";
        throw new Error("Error verifying auth token");
    }
}

