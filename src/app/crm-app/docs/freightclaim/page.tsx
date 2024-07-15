'use client'

import BodyTable from "@/components/BodyTable";
import FreightClaimComponent from "@/components/FrieghtClaimComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MaxA4 from "@/components/wrapper/maxA4";
import React from "react";
import { useReactToPrint } from "react-to-print";


export default function page() {
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
      <h1 className="text-2xl">Freight Claim Page Form</h1>
      <div className="w-full flex justify-center">
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
        <Button className="w-96 text-white bg-amber-500"
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
