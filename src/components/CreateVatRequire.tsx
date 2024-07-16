"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CompanyInForm,
  CustomerData,
  DocNoteInForm,
  DocsInForm,
  FormContent,
} from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CreateVatRequire = ({
  TableProps,
  NoteProps,
  DocumentProps,
  AddressProps,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [productRow, setProductRow] = React.useState<FormContent[]>([
    {
      id: 0,
      content: "",
      qty: 0,
      price: 0,
      discount: 0, //ส่วนลด
      amount: 0, //สำหรับยอดรวม
      total: 0,
      article: "", //รหัสสินค้า
      image: "",
    },
  ]);
  const [docNote, setDocNote] = React.useState<DocNoteInForm>();
  const [address, setAddress] = React.useState<any>();
  const [doc, setDoc] = React.useState<any>();

  const handleAddRows = (
    id: number,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newData =
      name === "price" ||
      name === "qty" ||
      name === "discount" ||
      name === "amount" ||
      name === "total"
        ? parseFloat(value) || ""
        : value;
    const updateRows = productRow.map((row) =>
      row.id === id ? { ...row, [name]: newData } : row
    );
    setProductRow(updateRows);
  };

  const deleteRow = (id: any) => {
    const newData = productRow.filter((row) => row.id !== id);
    if (id === 1) {
      console.log("there is no data to remove");
    } else {
      setProductRow(newData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name.startsWith("address")) {
      setAddress((prevCompany: any) => ({
        ...prevCompany,
        [name.replace("address.", "")]: value,
      }));
    } else if (name.startsWith("doc")) {
      setDoc((prevDoc: any) => ({
        ...prevDoc,
        [name.replace("doc.", "")]: value,
      }));
    } else if (name.startsWith("note")) {
      setDocNote((prevNote: any) => ({
        ...prevNote,
        [name.replace("note.", "")]: value,
      }));
    }
  };
  const addRow = (e: any) => {
    e.preventDefault();
    const newRowId = productRow.length;
    const newRowData = {
      id: newRowId,
      content: "",
      qty: 0,
      price: 0,
      amount: 0, //สำหรับยอดรวม
      total: 0,
      article: undefined, //รหัสสินค้า
      image: "",
    };
    setProductRow([...productRow, newRowData]);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    TableProps(productRow);
    DocumentProps(doc);
    AddressProps(address);
    NoteProps(docNote);
    //TODO : clear value for each state
    setProductRow([
      {
        id: 0,
        content: "",
        qty: 0,
        price: 0,
        discount: 0,
        amount: 0,
        total: 0,
        article: "",
      },
    ]);
    setOpen(false);
  };

  const handleFileChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0] || null;
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAddress((prevCompany: any) => ({
        ...prevCompany,
        logo: fileUrl,
      }));
    }
  };
  const handleFileChangeDoc = (e: any) => {
    const file = e.target.files[0]; // Access the file from event
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Generate a URL for preview or processing
      // Update the image property of the first row (assuming that's what you intend)
      setProductRow((prevRows) => [
        {
          ...prevRows[0], // Preserve other properties of the first row
          image: fileUrl, // Update only the image property
        },
        ...prevRows.slice(1), // Keep the rest of the rows unchanged
      ]);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-900">สร้างข้อมูลภายในเอกสาร</Button>
        </DialogTrigger>
        <DialogContent
          className="max-w-fit overflow-y-scroll max-h-screen"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>สร้างข้อมูล</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              กรุณากรอกรายละเอียดภายในเอกสาร
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-6 gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between gap-4 prompt-semibold mb-5">
              <label>
              อัพโหลดที่อยู่
              <Input
                type="file"
                name="address.logo"
                onChange={(e) => handleFileChange(e)}
                accept="image/*"
                />
                </label>
              <label>
                พิมพ์ที่อยู่
              <textarea
                name="address.address"
                onChange={(e) => handleChange(e)}
                placeholder="พิมพ์ที่อยู่"
                className="w-full ring-2 ring-gray-500/50 rounded-md p-2"/>
              </label>
            <label>
              เลขที่เอกสาร
            <Input
                type="text"
                name="doc.id"
                onChange={(e) => handleChange(e)}
              />
            </label>
              <label htmlFor="">
                วันที่
              <Input
                type="text"
                name="doc.date"
                onChange={(e) => handleChange(e)}
              />
              </label>
              <div className="p-2 w-full shadow-xl" />
            </div>

            {/* //TODO : Table Input */}
            <div className="flex flex-col justify-between gap-4 prompt-semibold mb-5">
            <label>
              รายละเอียดภายในตาราง
              {productRow &&
                productRow.map((row, i) => (
                  <div key={i} className="grid gap-4 py-4">
                    <div className="flex justify-between space-x-2">
                      <p className="text-xs text-muted-foreground text-center">
                        ลำดับที่ {i + 1}
                      </p>
                      <label className="prompt-semibold -tracking-tighter text-xs">
                        QTY
                        <Input
                          name="qty"
                          value={row.qty}
                          onChange={(e) => handleAddRows(row.id, e)}
                          type="number"
                          placeholder="จำนวน"
                          className="w-[70px] text-xs"
                        />
                      </label>
                      <label className="prompt-semibold -tracking-tighter text-xs">
                        รหัสสินค้า
                        <Input
                          name="article"
                          value={row.article}
                          onChange={(e) => handleAddRows(row.id, e)}
                          type="text"
                          placeholder="รหัสสินค้า"
                          className="w-[150px] text-xs"
                        />
                      </label>
                      <label className="prompt-semibold -tracking-tighter text-xs">
                        ราคาต่อชิ้น
                        <Input
                          name="price"
                          value={row.price}
                          onChange={(e) => handleAddRows(row.id, e)}
                          type="number"
                          placeholder="ราคาต่อชิ้น"
                          className="w-[100px] text-xs"
                        />
                      </label>
                      <label className="prompt-semibold -tracking-tighter text-xs">
                        ราคารวม
                        <Input
                          name="amount"
                          value={row.amount}
                          onChange={(e) => handleAddRows(row.id, e)}
                          type="number"
                          placeholder="ราคารวม"
                          className="w-[70px] text-xs"
                        />
                      </label>
                    </div>
                    <textarea
                      name="content"
                      value={row.content}
                      onChange={(e) => handleAddRows(row.id, e)}
                      placeholder="รายการสินค้า สำหรับ 1 ช่อง"
                      className="border border-gray-500/20 rounded-md p-2"
                    />
                    <div className="p-2 w-full shadow-xl" />
                  </div>
                ))}
            </label>
            </div>
            <div className="flex flex-col prompt-semibold -tracking-tighter text-xs">
              <label className="prompt-semibold -tracking-tighter text-xs">
                ยอดสุทธิ
                <Input
                  name="total"
                  value={productRow[0].total}
                  onChange={(e) => handleAddRows(productRow[0].id, e)}
                  type="number"
                  placeholder="ยอดสุทธิ"
                  className="w-full text-xs"
                />
              </label>
              <label className="prompt-semibold -tracking-tighter text-xs">
                อัพโหลด Slip
                <Input
                  name="image"
                  onChange={(e) => handleFileChangeDoc(e)}
                  type="file"
                  className="w-full text-xs"
                  accept="image/*"
                />
              </label>
              <label className="prompt-semibold -tracking-tighter text-xs">
                หมายเหตุ
                <textarea
                  name="note.content"
                  onChange={(e) => handleChange(e)}
                  placeholder="หมายเหตุ"
                  className="border border-gray-500/20 rounded-md p-2 w-full"
                />
              </label>
            </div>
            <hr />
            <div className="w-full flex justify-between gap-x-4 p-2 ">
              <Button
                type="button"
                className="bg-green-500 w-full"
                onClick={addRow}
              >
                + Add Row
              </Button>
              <Button
                type="button"
                className="bg-red-500"
                onClick={() => deleteRow(productRow[productRow.length - 1].id)}
              >
                - Remove Row
              </Button>
            </div>
            <Button type="submit" className="bg-blue-500 w-full">
              สร้างข้อมูล
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateVatRequire;
