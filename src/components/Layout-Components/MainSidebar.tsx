"use client";

import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
// import useToggleHooks from "../../lib/hooks/ToggleHooks";
import { PanelLeftDashed } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";



const MainSidebar = () => {
  const pathname = usePathname();
  // const [isOpen, setIsOpen, ref] = useToggleHooks(false);



  
  return (
    <div className="w-20 h-screen bg-gray-300 shadow-sm">
    <Sheet>
      <SheetTrigger asChild>
      <PanelLeftDashed className="h-10 w-10 mt-4 mx-auto" />
      </SheetTrigger>
      <SheetContent side="left" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Menu Navigation</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-5">
              <Button
                variant={"ghost"}
                className={`w-full ${
                  pathname === "/crm-app"
                    ? "bg-blue-700 text-white font-bold"
                    : ""
                }`}
              >
                <Link href={"/crm-app"} className="prompt-semibold -tracking-tighter">NEED CRMs Application</Link>
              </Button>
              <Button
                variant={"ghost"}
                className={`w-full ${
                  pathname === "/crm-app/dashboard"
                    ? "bg-blue-700 text-white font-bold"
                    : ""
                }`}
              >
                <Link href={"/crm-app/dashboard"} className="prompt-semibold -tracking-tighter">Dashboard</Link>
              </Button>
              <Button
                variant={"ghost"}
                className={`w-full ${
                  pathname === "/crm-app/products-bar"
                    ? "bg-blue-700 text-white font-bold"
                    : ""
                }`}
              >
                <Link href={"/crm-app/products-bar"} className="prompt-semibold -tracking-tighter">ขอบาร์สินค้าเข้าระบบ</Link>
              </Button>
              <Button
                variant={"ghost"}
                className={`w-full ${
                  pathname === "/crm-app/accoutings"
                    ? "bg-blue-700 text-white font-bold"
                    : ""
                }`}
              >
                <Link href={"/crm-app/accoutings"} className="prompt-semibold -tracking-tighter">ออกใบกำกับภาษี</Link>
              </Button>

              <Select>
                <SelectTrigger>
                  <SelectValue className="prompt-semibold" placeholder="เลือกประเภทเอกสาร"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      ประเภทเอกสาร
                    </SelectLabel>
                    {/* //NOTE - Select Grouop for k.Som Docs*/}
                    <div className="space-y-4">
                    <Button variant={"ghost"}
                    className={`w-full ${
                      pathname === "/crm-app/docs/deliverynotes"
                        ? "bg-blue-700 text-white font-bold"
                        : ""
                    }`}
                    >
                      <Link className="prompt-semibold -tracking-tighter" href={"/crm-app/docs/deliverynotes"}>ใบส่งสินค้า</Link>
                      </Button>
                    <Button variant={"ghost"}
                    className={`w-full ${
                      pathname === "/crm-app/docs/reciptnotes"
                        ? "bg-blue-700 text-white font-bold"
                        : ""
                    }`}
                    >
                      <Link className="prompt-semibold -tracking-tighter" href={"/crm-app/docs/reciptnotes"}>ใบเสร็จรับเงิน</Link>
                      </Button>
                    <Button variant={"ghost"}
                    className={`w-full ${
                      pathname === "/crm-app/docs/freightclaim"
                        ? "bg-blue-700 text-white font-bold"
                        : ""
                    }`}
                    >
                      <Link className="prompt-semibold -tracking-tighter" href={"/crm-app/docs/freightclaim"}>ใบเบิกค่าขนส่ง</Link>
                      </Button>
                    <Button variant={"ghost"}
                    className={`w-full ${
                      pathname === "/crm-app/docs/vat-require"
                        ? "bg-blue-700 text-white font-bold"
                        : ""
                    }`}
                    >
                      <Link className="prompt-semibold -tracking-tighter" href={"/crm-app/docs/vat-require"}>ฟอร์มขอ Vat</Link>
                      </Button>
                    </div>
                    
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
      </SheetContent>
    </Sheet>
    </div>
  );
};

export default MainSidebar;
