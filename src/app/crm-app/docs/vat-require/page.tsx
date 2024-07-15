"use client";

import React from "react";
import MaxA4 from "@/components/wrapper/maxA4";
import CreateVatRequire from "@/components/CreateVatRequire";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import BodyTable from "@/components/BodyTable";
import CreateVatHeaderComponent from "@/components/CreateVatHeaderComponent";
import DocNote from "@/components/DocNote";


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
    <div className="flex flex-col justify-between">
      <div className="w-full flex justify-center">
        <h1 className="text-2xl font-semibold prompt-semibold">
          ฟอร์มขอ VAT (NEED PAGE)
        </h1>
      </div>
      <MaxA4>
        <div className="flex flex-col justify-between gap-4" ref={contentToPrint}>
          {/* //TODO :Heeader Address */}
          <div className="flex flex-col gap-y-4">
          <CreateVatHeaderComponent DocumentData={docData} CustomerAddress={cAddress} />
          </div>
          <BodyTable props={props} />
          <DocNote docNoteData={docNoteData} />
        </div>
      </MaxA4>
      <div className="flex justify-center mt-5 gap-4 p-2">
        <CreateVatRequire
          TableProps={handleProps}
          AddressProps={cAddressProps}
          DocumentProps={docDataProps}
          NoteProps={handleNoteData}
        />
        <Button
          className="w-96 text-white bg-amber-500"
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
