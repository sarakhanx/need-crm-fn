'use client'

import SignInForm from "@/components/SignInForm";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const router = useRouter();
    const afterLogin = () =>{
        router.push("/crm-app/dashboard")
      }
    return (
        <>
        <h1>Signin Page</h1>
            <SignInForm onSuccess={afterLogin}/>
        </>
    );
}