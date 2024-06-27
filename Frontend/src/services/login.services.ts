import Instance from "./instance.services";


export const LoginRequestHandler = async (data: any) => {
    try {
        
        const response = await Instance.post("auth/login", data);
      
        return response.data.data;
    } catch (error:any) {
        console.error('Error in login request:', error);
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('INVALID CREDENTIALS ENTER VALID CREDENTIALS.');
        }
    }

    // return {token:"dsjvspsufgdus[iu"}

}

export const LogoutRequestHandler = async (data: string) => {
    try {
        const token = localStorage.getItem('token');
        const parsedToken = token ? JSON.parse(token) : null;
        
        const response = await Instance.post('auth/logout', data,{
            headers: {
              Authorization: `Bearer ${parsedToken}`
            }
          });
       
          return response.data.data
    }
    catch (error) {
        console.error('Error in logout request:', error);
        throw error;
    }
}