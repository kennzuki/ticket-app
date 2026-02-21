'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET_KEY);
const cookieName = 'auth_token';

//encrypt the payload and sign the JWT token
export async function signAuthToken(payload: string) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);
    return token;
  } catch (error) {
    throw new Error(`Error signing auth token: ${error instanceof Error ? error.message : error}`)
  }
}

//decrypt and verify token
export async function verifyAuthToken<T>(token: string): Promise<T> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as T;
  } catch (error) {
    throw new Error(`Error occurred: ${error instanceof Error ? error.message : error}`)
  }
}

export async function setAuthCookie(token: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
     throw new Error(`Error occurred: ${error instanceof Error ? error.message : error}`)
  }
}

//Get the auth token from cookies
export async function getAuthCookie() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(cookieName);
    return token?.value;
  } catch (error) {
     throw new Error(`Error occurred: ${error instanceof Error ? error.message : error}`)
  }
}

//Remove the auth token from cookies
export async function removeAuthCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(cookieName);
  } catch (error) {
     throw new Error(`Error occurred: ${error instanceof Error ? error.message : error}`)
  }
}
