'use client'

import BodyTable from "@/components/BodyTable";
import FreightClaimComponent from "@/components/FrieghtClaimComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MaxA4 from "@/components/wrapper/maxA4";
import Link from "next/link";
import React from "react";
import { useReactToPrint } from "react-to-print";


export default function Page() {
  const [props, setSubmittedData] = React.useState(null);
  const handleProps = (data: any) => {
    setSubmittedData(data);
    console.log("submittedData", data);
  };
  const contentToPrint = React.useRef(null);
  const handlePrint  = useReactToPrint({
    documentTitle: "Title Of Document",
    onBeforePrint() {
      console.log("onBeforePrint");
    },
    onAfterPrint() {
      console.log("onAfterPrint");
    },
    removeAfterPrint: true,
  })




  return (
    <div>
      <div className="flex flex-col justify-start mt-2 p-2 mx-5">
      <div className="w-full">
        <h1 className="prompt-semibold text-2xl text-start">
        ใบเบิกค่าขนส่งสินค้า
        </h1>
        <p className="text-sm text-muted-foreground font-normal prompt-light text-start">
        ใบเบิกค่าขนส่งสินค้า กด Print ได้ทันที
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
      </div>
      <div className="w-full flex justify-center mt-5">
        <MaxA4 >
          <div ref={contentToPrint}>
          <div className="flex justify-center items-center" >
            <h1 className="text-2xl font-semibold prompt-semibold">
              ใบเบิกค่าขนส่งสินค้า
            </h1>
          </div>
          <div className="flex justify-between my-4 prompt-semibold">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center">
                <h3 className="text-xs font-semibold -tracking-tighter">
                  เบิกค่า&nbsp;:&nbsp;
                </h3>
                <Input
                  className="border-none text-xs underline h-6 w-60"
                  placeholder="เบิกค่าอะไร"
                />
              </div>
              <div className="flex items-center">
                <h3 className="text-xs font-semibold -tracking-tighter">
                  วันที่&nbsp;:&nbsp;
                </h3>
                <Input
                  className="border-none text-xs underline h-6 w-60"
                  placeholder="วันที่"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <h3 className="text-xs font-semibold -tracking-tighter">
                  เลขที่ใบขาย&nbsp;:&nbsp;
                </h3>
                <Input
                  className="border-none text-xs underline h-6 w-60"
                  placeholder="เลขที่ใบขาย"
                />
              </div>
              <div className="flex items-center">
                <h3 className="text-xs font-semibold -tracking-tighter">
                  ผู้เบิก&nbsp;:&nbsp;
                </h3>
                <Input
                  className="border-none text-xs underline h-6 w-60"
                  placeholder="ชื่อ - นามสกุล"
                />
              </div>
            </div>
          </div>
          <div className="flex-col w-full">
            <BodyTable props={props} />
            <div className="flex justify-start m-4">
              <textarea
                placeholder="หมายเหตุ"
                className="rounded-md p-2 w-96 text-xs text-red-500 font-medium prompt-medium"
              />
            </div>
          </div>
          </div>
        </MaxA4>
      </div>
      <div className="flex justify-center mt-5 gap-4 p-2">
        <FreightClaimComponent TableProps={handleProps} />
        <Button className="w-96 text-white"
        onClick={()=>{
          handlePrint(null , ()=> contentToPrint.current)
        }}
        >PRINT</Button>
      </div>
      {/* //NOTE  - stylye started here */}
      <style>
        {`
          @media print {
            @page {
            margin: 1cm;
    }
          p {
          color : black;
          }
            img {
              max-width: 100%;
              height: auto;
            }
            .print-button {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}
