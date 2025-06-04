'use client'
import { useActionState, useEffect } from "react";

import { logoutUser } from "@/lib/current-user";
import { toast } from "sonner";

const LogoutButton = () => {
    
    const initialState = { success: false, message: '' };
    const [state, formAction] = useActionState(logoutUser, initialState);
  
    useEffect(() => {
          if (state.success) {
        toast.success('logout successful');
       
    } else if (state.message) {
        toast.error(state.message);
    } 
    }, [state]);

    return ( 
        <form action={formAction} className="">
            <button className='bg-red-600 font-bold text-white px-4 py-2 rounded hover:bg-blue-700 transition'>Logout</button>
        </form>
     );
}
 
export default LogoutButton;