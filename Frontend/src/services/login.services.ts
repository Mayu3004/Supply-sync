import Instance from "./instance.services";


export const LoginRequestHandler = async (data:any) => {
    try {
        console.log(data);
        const response = await Instance.post("auth/login", data);
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error('Error in login request:', error);
        throw error;
    }

    // return {token:"dsjvspsufgdus[iu"}
    
}