"use client";

import SignInForm from "@/components/SignInForm";
import SignIn from "./signin/page";
import { useRouter } from "next/navigation";
import Maxwidth from "@/components/MaxWidth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const afterLogin = () => {
    router.push("/crm-app");
  };

  return (
    <>
      <Maxwidth>
        <div className="flex flex-col items-center justify-between w-full my-4 gap-4">
          <h5 className="text-lg prompt-bold">NEED CRMs Application</h5>
          <p className="text-muted-foreground prompt-light text-sm text-center">
            สวัสดี! ยินดีที่ได้พบกันอีกครั้ง <br />กรุณากรอก Username และ Passwowrd เพื่อเข้าสู่ระบบ
          </p>
        </div>
        <SignInForm onSuccess={afterLogin} />
        <div className="relative my-5 prompt-light">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              หรือลงทะเบียน
            </span>
          </div>
        </div>
        <Maxwidth>
        <Button className="w-full "><Link href={"/signup"}
        target="_balnk"
        >ลงทะเบียน</Link></Button>
        </Maxwidth>
      </Maxwidth>
    </>
  );
}
