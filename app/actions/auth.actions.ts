'use server';
import { prisma } from '@/db/prisma';
import bcrypt from 'bcryptjs';
import { signAuthToken, setAuthCookie } from '@/lib/auth';

type responseResult = {
  success: boolean;
  message: string;
};

export async function registerUser(
  prevState: responseResult,
  formData: FormData,
): Promise<responseResult> {
  try {
    //extracting form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    //validate form data
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required' };
    }

    //check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //sign and set auth token
    const token = await signAuthToken(user.id);
    await setAuthCookie(token);

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    return {
      success: false,
      message: 'Error registering user: ' + (error as Error).message,
    };
  }
}

//login user
export async function loginUser(
  prevState: responseResult,
  formData: FormData,
): Promise<responseResult> {
  try {
    //extracting form data
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    //validate form data
    if (!email || !password) {
      return { success: false, message: 'All fields are required' };
    }

    //check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || !user.password) {
      return { success: false, message: 'Invalid email or password' };
    }

    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return { success: false, message: 'Invalid email or password' };
    }

    //sign and set auth token
    const token = await signAuthToken(user.id);
    await setAuthCookie(token);

    return { success: true, message: 'User logged in successfully' };
  } catch (error) {
    return {
      success: false,
      message: 'Error logging in user: ' + (error as Error).message,
    };
  }
}
