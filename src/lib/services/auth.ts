import { jwtDecode } from "jwt-decode";
// import { useUserSession } from "../hooks/authHooks/useUserSession";

const isAuth = () => {
  // const { getUserSessionData } = useUserSession();
  // const sessionData = getUserSessionData();
  // const token = sessionDataa?.token;


    const sessionData = sessionStorage.getItem("session");
    const session = sessionData ? JSON.parse(sessionData) : null;
    const token = session?.token;
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


  //auth แบบง่ายๆ 