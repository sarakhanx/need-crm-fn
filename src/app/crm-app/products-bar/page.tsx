"use client";

import React from "react";
import ProductsBarRow from "../../../components/Products-bar-row";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col justify-start mt-2 p-2 mx-5">
      <div className="w-full">
        <h1 className="prompt-semibold text-2xl text-start">
          ฟอร์มขอบาร์สินค้าเข้าระบบ
        </h1>
        <p className="text-sm text-muted-foreground font-normal prompt-light text-start">
          แบบฟอร์มการขอบาร์สินค้าเข้าระบบ สามารถพิมพ์หรืออัพโหลดรูปลงไปที่เอกสาร และกด Print ได้ทันที
        </p>
      </div>
      
      <div className="flex justify-start space-x-4 mt-2">
        <Button className="bg-blue-500 hover:bg-blue-900">
          <Link href={"/kb/productbar"}>วิธีใช้งาน Page</Link>
        </Button>
        <Button className="hover:bg-red-900" variant="destructive" onClick={()=>{alert("ยังทำไม่เสร็จจ้าาา มีปํญหาอะไรเดินมาบอกที่๋โต๊ะได้เลย")}}>
          <Link href={"#"}>แจ้งปัญหาการใช้งาน</Link>
        </Button>
      </div>
      <hr className="mt-4" />
      <ProductsBarRow />
    </div>
  );
}
