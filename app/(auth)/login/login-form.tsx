'use client';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/actions/auth.actions';
import { toast } from 'sonner';

const LoginForm = () => {
const router = useRouter();

  const initialState = {
    success: false,
    message: '',
    };
    
    const [state, formAction] = useActionState(loginUser, initialState);
    useEffect(() => {
        if (state.success) {
            toast.success("Login successful");
            router.push('/tickets');
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, router]);
   

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200 px-4'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200'>
        <h1 className='text-3xl font-bold mb-6 text-center text-blue-600'>
            Login
        </h1>
        {state.message && !state.success && (
          <p className='text-red-500 mb-4 text-center'>{state.message}</p>
        )}
        <form action={formAction} className='space-y-4 text-gray-700'>
         
          <input
            className='w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            type='email'
            name='email'
            placeholder='Email'
            autoComplete='email'
            required
          />
          <input
            className='w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            type='password'
            name='password'
            placeholder='Password'
            required
                  />
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition'
            >
              Register
            </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
