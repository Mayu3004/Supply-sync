
const isLoggedIn = () => {
    const token = JSON.parse(localStorage.getItem("token") as string);
    
    if (!token) return false;
  
    return true;
  };
  
  export const grantAccessTo = (permittedRoles: string[]) => {
    const hasAccess = () => {
      const user = JSON.parse(localStorage.getItem("role") as string);
     
      if (!user) return false;
     
      // return permittedRoles.includes(JSON.parse(user).role);
      return permittedRoles.includes(user);
      // return true;
      
    };
   
    return hasAccess;
  };
  export const GUARDS = { isLoggedIn, grantAccessTo };