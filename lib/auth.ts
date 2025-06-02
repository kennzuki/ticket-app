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

