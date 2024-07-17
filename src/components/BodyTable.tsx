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
import { Textarea } from "./ui/textarea";
const THBText = require("thai-baht-text");

interface BodyTableProps {
  props: FormContent[] | null;
}

export default function BodyTable({ props }: BodyTableProps) {
  const [contentForm, setContentForm] = React.useState<FormContent[]>([]);

  React.useEffect(() => {
    if (props && props.length > 0) {
      setContentForm(props);
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
  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  //NOTE : edit table
  const unformatNumber = (number: string) => {
    return number ? parseFloat(number.replace(/,/g, "")) : 0;
  };

  const handleInputChange = (id: number, name: string, value: string) => {
    const updatedContentForm = contentForm.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [name]:
            name === "price" || name === "discount" || name === "amount"
              ? unformatNumber(value)
              : value,
        };
      }
      return item;
    });
    setContentForm(updatedContentForm);
  };

  const formatInputValue = (value: number) => {
    //convert string to number with comma
    return formatNumber(value);
  };
  const handleTextareaChange = (id: number, name: string, value: string) => {
    handleInputChange(id, name, value);
    adjustTextareaHeight(id);
  };

  const adjustTextareaHeight = (id: number) => {
    const textarea = document.getElementById(
      `content-${id}`
    ) as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  React.useEffect(() => {
    contentForm.forEach((item) => adjustTextareaHeight(item.id));
  }, [contentForm]);

  if (props) {
    return (
      <>
        <Table>
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
                {data.article ? (
                  <TableCell>
                    <input
                      id="article"
                      name="article"
                      value={data.article}
                      onChange={(e) =>
                        handleInputChange(
                          data.id,
                          e.target.name,
                          e.target.value
                        )
                      }
                      type="text"
                      placeholder="รหัสสินค้า"
                      className="w-[70px]"
                    />
                  </TableCell>
                ) : null}
                <TableCell className="whitespace-pre-wrap">
                  <Textarea
                    id={`content-${data.id}`}
                    name="content"
                    value={data.content}
                    onChange={(e) =>
                      handleInputChange(data.id, e.target.name, e.target.value)
                    }
                    placeholder="รายละเอียด"
                    className="w-full border border-none"
                    rows={1}
                  />
                </TableCell>
                <TableCell>
                  <input
                    id="qty"
                    name="qty"
                    value={data.qty}
                    onChange={(e) =>
                      handleInputChange(data.id, e.target.name, e.target.value)
                    }
                    type="text"
                    placeholder="จำนวน"
                    className="w-[40px]"
                  />
                </TableCell>
                <TableCell>
                  <input
                    id="price"
                    name="price"
                    value={formatInputValue(data.price)}
                    onChange={(e) =>
                      handleInputChange(data.id, e.target.name, e.target.value)
                    }
                    type="text"
                    placeholder="ราคา"
                    className="w-[100px]"
                  />
                </TableCell>
                {data.discount ? (
                  <TableCell>
                    <input
                      id="discount"
                      name="discount"
                      value={formatInputValue(data.discount)}
                      onChange={(e) =>
                        handleInputChange(
                          data.id,
                          e.target.name,
                          e.target.value
                        )
                      }
                      type="text"
                      placeholder="ส่วนลด"
                      className="w-[70px]"
                    />
                  </TableCell>
                ) : null}
                <TableCell>
                  <input
                    id="amount"
                    name="amount"
                    value={formatInputValue(data.amount)}
                    onChange={(e) =>
                      handleInputChange(data.id, e.target.name, e.target.value)
                    }
                    type="text"
                    placeholder="ราคารวม"
                    className="w-[150px]"
                  />
                </TableCell>
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
              <TableCell>{formatNumber(contentForm[0]?.total)}</TableCell>
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
