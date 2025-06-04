'use client'
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/current-user";
import { toast } from "sonner";

const LogoutButton = () => {
    const router = useRouter();
    const initialState = { success: false, message: '' };
    const [state, formAction] = useActionState(logoutUser, initialState);
  
    useEffect(() => {
          if (state.success) {
        toast.success('logout successful');
        router.push('/login');
    } else if (state.message) {
        toast.error(state.message);
    } 
    }, [state, router]);

    return ( 
        <form action={formAction} className="">
            <button className='bg-red-600 font-bold text-white px-4 py-2 rounded hover:bg-blue-700 transition'>Logout</button>
        </form>
     );
}
 
export default LogoutButton;