"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormContent } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
const THBText = require("thai-baht-text");

interface BodyTableProps {
  props: FormContent[] | null;
}

export default function BodyTable({ props }: BodyTableProps) {
  const [contentForm, setContentForm] = React.useState<FormContent[]>([]);

  React.useEffect(() => {
    if (props && props.length > 0) {
      setContentForm(props);
      console.log(contentForm);
    }
  }, [props]);

  const totalToText = () => {
    if (contentForm.length > 0) {
      const total = contentForm[0].total;
      const textToTotal = THBText(total); // Assuming THBText is a function that converts total to text
      return textToTotal;
    }
    return "";
  };

  if (props) {
    return (
      <>
        <Table>
          {/* //NOTE - started the table here */}
          {/* <TableCaption>This is a table caption</TableCaption> */}
          <TableHeader className="text-sm text-black bg-lime-500/60">
            <TableRow>
              <TableHead className="w-[30px]">ลำดับ</TableHead>
              {contentForm.length > 0 && contentForm[0].article ? (
                <TableHead className="w-[100px]">รหัสสินค้า</TableHead>
              ) : null}
              <TableHead className="w-[350px] text-center">
                รายการสินค้า
              </TableHead>
              <TableHead className="w-[50px]">จำนวน</TableHead>
              <TableHead className="w-[50px]">ราคาต่อชิ้น</TableHead>
              {contentForm.length > 0 && contentForm[0].discount ? (
                <TableHead className="w-[50px]">ส่วนลด</TableHead>
              ) : null}
              <TableHead className="w-[50px]">ราคารวม</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {contentForm.map((data, i) => (
              <TableRow key={i}>
                <TableCell>{data.id + 1}</TableCell>
                {data.article ? <TableCell>{data.article}</TableCell> : null}
                <TableCell className="whitespace-pre-wrap">
                  {data.content}
                </TableCell>
                <TableCell>{data.qty}</TableCell>
                <TableCell>{data.price}</TableCell>
                {data.discount ? <TableCell>{data.discount}</TableCell> : null}
                <TableCell>{data.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {contentForm[0]?.image ? (
          <img
            src={contentForm[0]?.image}
            alt="Overlay Image"
            className="h-[250px] w-full object-contain"
          />
        ) : null}
        <Table>
          <TableFooter>
            <TableRow>
              {contentForm[0]?.discount || contentForm[0]?.article ? (
                <TableCell colSpan={5} className="">
                  รวมทั้งสิ้น : {totalToText()}
                </TableCell>
              ) : (
                <TableCell colSpan={4} className="">
                  รวมทั้งสิ้น : {totalToText()}
                </TableCell>
              )}
              <TableCell>{contentForm[0]?.total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </>
    );
  }
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex justify-center items-center space-y-2 w-full">
        <Skeleton className="w-full h-[50px]" />
      </div>
      <div className="flex justify-center items-center space-x-2 w-full">
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
      </div>
      <div className="flex justify-center items-center space-x-2 w-full">
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
      </div>
      <div className="flex justify-center items-center space-x-2 w-full">
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
      </div>
      <div className="flex justify-center items-center space-x-2 w-full">
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
      </div>
    </div>
  );
}
