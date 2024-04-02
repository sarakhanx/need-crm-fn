import { jwtDecode } from "jwt-decode";

const isAuth = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentDate = Date.now()/1000;
          if (decoded.exp && decoded.exp < currentDate) {
            return false;
        }
        return true
      } catch (error:any) {
        throw new Error("Invalid token /n ขอจด IP ไว้หน่อยนะ", error)
      }
      
    }
    return false;
  };
  export default isAuth