import { verifyAuthToken, getAuthCookie,removeAuthCookie } from './auth';
import { prisma } from '@/db/prisma';

type AuthPayload = {
  userId: string;
  email: string;
};

export async function getCurrentUser(): Promise<AuthPayload | null> {
  try {
    const token = await getAuthCookie();
    if (!token) return null;

    const payload = (await verifyAuthToken(token)) as AuthPayload;
    if (!payload?.userId) return null;
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true },
    });
    return user;
  } catch (error) {
    console.log('Error retrieving current user:', (error as Error).message);
    return null;
  }
}

//log user out and remove auth cookie

export async function logoutUser(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Clear the auth cookie
      await removeAuthCookie();
      return{
        success: true,
        message: 'User logged out successfully',
      };
  } catch (error) {
      return {
        success: false,
        message: 'Error logging out user',
      };
    console.error('Error logging out user:', (error as Error).message);
  }
}
