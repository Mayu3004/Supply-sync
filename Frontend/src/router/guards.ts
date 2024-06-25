
const isLoggedIn = () => {
    const token = JSON.parse(localStorage.getItem("token") as string);
    // console.log(token);
    if (!token) return false;
  
    return true;
  };
  
  export const grantAccessTo = (permittedRoles: string[]) => {
    const hasAccess = () => {
      const user = JSON.parse(localStorage.getItem("role") as string);
      // console.log(user);
      if (!user) return false;
      console.log(user);
      // return permittedRoles.includes(JSON.parse(user).role);
      return permittedRoles.includes(user);
      // return true;
      
    };
    // console.log(hasAccess);
    return hasAccess;
  };
  export const GUARDS = { isLoggedIn, grantAccessTo };