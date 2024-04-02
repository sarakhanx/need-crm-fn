'use client'

import SignInForm from "@/components/SignInForm";
import SignIn from "./signin/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const afterLogin = () =>{
    router.push("/crm-app")
  }

  return (
    <>
    <h1>INDEX</h1>
    <SignInForm onSuccess={afterLogin}/>
    </> 
  );
}
