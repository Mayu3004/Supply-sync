import { toast } from "react-toastify";
import Instance from "./instance.services";


export const LoginRequestHandler = async (data: any) => {
    try {
        
        const response = await Instance.post("auth/login", data);
        toast.success("Login successful")
        return response.data.data;
    } catch (error:any) {
        toast.error(`${error.response.data.error.message}`)
    //     console.error('Error in login request:', error);
    //     if (error.response && error.response.data && error.response.data.message) {
    //         throw new Error(error.response.data.error.message);
    //     } else {
    //         throw new Error('INVALID CREDENTIALS ENTER VALID CREDENTIALS.');
    //     }
    }

    // return {token:"dsjvspsufgdus[iu"}

}

export const LogoutRequestHandler = async (data: string) => {
    try {
        
        const response = await Instance.post('auth/logout', data);
        toast.success("Logout successful")
        return response.data.data
    }
    catch (error) {
        // console.error('Error in logout request:', error);
        throw new Error("Unable to logout")
       
    }
}