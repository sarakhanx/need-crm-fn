"use client";
import React from "react";
import {CustomerData} from "@/lib/types"
import { Skeleton } from "./ui/skeleton";


interface CustomerProps {
    customerData : CustomerData | null
}

const CustomerAddress = ({customerData}:CustomerProps) => {
    const [cusData , setCusData] = React.useState<CustomerData | undefined>()
    React.useEffect(()=>{
        setCusData(customerData ?? undefined)
    },[customerData])



if(customerData){
  return (
    <div className="flex justify-between text-xs prompt-regular text-gray-500/90">
      <div className="flex-col w-96">
        <div className="flex justify-between">
          <div>
          <strong>ชื่อ-นามสกุล&nbsp;:&nbsp;</strong>
            {cusData?.name}
          </div>
         
        </div>
        <div><strong>ที่อยู่&nbsp;:&nbsp;</strong>{cusData?.address1}</div>
        <div>{cusData?.address2}</div>
        <div>{cusData?.vat}</div>
        <div className="font-light underline underline-offset-1">{cusData?.note}</div>
      </div>
      <div>
          <p><strong>tel&nbsp;:&nbsp;</strong>{cusData?.tel}</p>
          </div>
    </div>
  );
}
return (
  <div className="flex flex-col justify-between gap-2">
    <Skeleton className="w-full h-[20px]"/>
    <Skeleton className="w-full h-[20px]"/>
    <Skeleton className="w-full h-[20px]"/>
  </div>
)
};

export default CustomerAddress;
