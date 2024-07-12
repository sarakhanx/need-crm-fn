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
import React from "react";
import { useReactToPrint } from "react-to-print";

export default function page() {
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
      Recipt Notes Page
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
      <div className="w-full flex justify-center mt-5 gap-4 p-2">
        <CreateDataProps
          TableProps={handleProps}
          CompanyProps={handleCompanydata}
          DocumentProps={handleDocumentData}
          CustomerProps={handleCustomerData}
          NoteProps={handleNoteData}
        />
        <Button className="w-96 text-white bg-amber-500"
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
