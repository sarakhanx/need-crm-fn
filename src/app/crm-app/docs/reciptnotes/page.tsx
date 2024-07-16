"use client";

import BodyTable from "@/components/BodyTable";
import CompanyAddress from "@/components/CompanyAddress";
import CreateDataProps from "@/components/CreateDataProps";
import CustomerAddress from "@/components/CustomerAddress";
import DocNote from "@/components/DocNote";
import SignatureSection from "@/components/SignatureSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MaxA4 from "@/components/wrapper/maxA4";
import Link from "next/link";
import React from "react";
import { useReactToPrint } from "react-to-print";

export default function Page() {
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


  const [props, setSubmittedData] = React.useState(null);
  const handleProps = (data: any) => {
    setSubmittedData(data);
    console.log("submittedData", data);
  };
  const [companyData, setCompanyData] = React.useState(null);
  const handleCompanydata = (data: any) => {
    setCompanyData(data);
    console.log("companyData", data);
  };
  const [documentData, setDocumentData] = React.useState(null);
  const handleDocumentData = (data: any) => {
    setDocumentData(data);
    console.log("documentData", data);
  };
  const [customerData, setCustomerData] = React.useState(null);
  const handleCustomerData = (data: any) => {
    setCustomerData(data);
    console.log("Customer Data", data);
  };
  const [docNoteData, setNoteData] = React.useState(null);
  const handleNoteData = (data: any) => {
    setNoteData(data);
    console.log("Note Data", data);
  };

  return (
    <div>
          <div className="flex flex-col justify-start mt-2 p-2 mx-5">
      <div className="w-full">
        <h1 className="prompt-semibold text-2xl text-start">
          ฟอร์มเบิกค่าขนส่งสินค้า / ฟอร์มใบเสร็จรับเงิน
        </h1>
        <p className="text-sm text-muted-foreground font-normal prompt-light text-start">
        ฟอร์มเบิกค่าขนส่งสินค้า / ฟอร์มใบเสร็จรับเงิน สามารถพิมพ์หรืออัพโหลดรูปลงไปที่เอกสาร และกด Print ได้ทันที
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
      <div className="mt-5">

      
      <MaxA4>
        <div className="w-full space-y-4" ref={contentToPrint}>
          <div className="flex justify-end w-full">
            <Input
              type="text"
              placeholder="ใบเสร็จรับเงิน/Receipt"
              className="border-none text-end prompt-semibold font-bold text-sm p-4 w-[250px]"
            />
          </div>
          {/* //NOTE - Components import here */}
          <CompanyAddress
            companyData={companyData}
            documentData={documentData}
          />
          <CustomerAddress customerData={customerData} />
          <BodyTable props={props} />
          <DocNote docNoteData={docNoteData} />

        {/* //NOTE - Components for sign here */}
        <SignatureSection/>
        </div>
      </MaxA4>
      </div>
      <div className="w-full flex justify-center mt-5 gap-4 p-2">
        <CreateDataProps
          TableProps={handleProps}
          CompanyProps={handleCompanydata}
          DocumentProps={handleDocumentData}
          CustomerProps={handleCustomerData}
          NoteProps={handleNoteData}
        />
        <Button className="w-96 text-white"
        onClick={()=>{
          handlePrint(null , ()=> contentToPrint.current)
        }}
        >PRINT</Button>
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
