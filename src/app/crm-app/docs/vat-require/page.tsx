"use client";

import React from "react";
import MaxA4 from "@/components/wrapper/maxA4";
import CreateVatRequire from "@/components/CreateVatRequire";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import BodyTable from "@/components/BodyTable";
import CreateVatHeaderComponent from "@/components/CreateVatHeaderComponent";
import DocNote from "@/components/DocNote";
import Link from "next/link";


// const cAddress = {
//   address:"Lorem ipsum dolor sit amet\nconsectetur adipisicing elit.\nVeritatis rerum voluptates fugiat\nlibero dolor tempora.",
// }
// const docData = {
//   id : "S123456789",
//   date : "2022-01-01",
// }


export default function Page() {
  const [props, setSubmittedData] = React.useState(null);
  const handleProps = (data: any) => {
    setSubmittedData(data);
    console.log("1", data);
  };
  const [docData, setDocData] = React.useState(null);
  const docDataProps = (data: any) => {
    setDocData(data);
    console.log("2", data);
  };
  const [cAddress, setCAddress] = React.useState(null);
  const cAddressProps = (data: any) => {
    setCAddress(data);
    console.log("3", data);
  };
  const [docNoteData, setNoteData] = React.useState(null);
  const handleNoteData = (data: any) => {
    setNoteData(data);
    console.log("Note Data", data);
  };



  const contentToPrint = React.useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Title Of Document",
    onBeforePrint() {
      console.log("onBeforePrint");
    },
    onAfterPrint() {
      console.log("onAfterPrint");
    },
    removeAfterPrint: true,
  });

  return (
    <div className="flex flex-col justify-start mt-2 p-2 mx-5">
      <div className="w-full">
        <h1 className="prompt-semibold text-2xl text-start">
          ฟอร์มขอ VAT
        </h1>
        <p className="text-sm text-muted-foreground font-normal prompt-light text-start">
          แบบฟอร์มการขอ VAT
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
      <div className="mt-5">
      <MaxA4 >
        <div className="flex flex-col justify-between gap-4" ref={contentToPrint}>
          {/* //TODO :Heeader Address */}
          <div className="flex flex-col gap-y-4">
          <CreateVatHeaderComponent DocumentData={docData} CustomerAddress={cAddress} />
          </div>
          <BodyTable props={props} />
          <DocNote docNoteData={docNoteData} />
        </div>
      </MaxA4>
      </div>
      <div className="flex justify-center mt-5 gap-4 p-2">
        <CreateVatRequire
          TableProps={handleProps}
          AddressProps={cAddressProps}
          DocumentProps={docDataProps}
          NoteProps={handleNoteData}
        />
        <Button
          className="w-96"
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          PRINT
        </Button>
      </div>
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
