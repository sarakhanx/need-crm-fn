"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React from "react";
import {
  CompanyInForm,
  CustomerData,
  DocNoteInForm,
  DocsInForm,
  FormContent,
} from "@/lib/types";
const CreateDataProps = ({
  TableProps,
  CompanyProps,
  DocumentProps,
  CustomerProps,
  NoteProps,
}: any) => {
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
    },
  ]);
  const [company, setCompany] = React.useState<CompanyInForm>({
    logo: "",
    name: "",
    comAddress1: "",
    comAddress2: "",
    comTel: "",
    comEmail: "",
    comVat: "",
  });
  const [doc, setDoc] = React.useState<DocsInForm>({
    id: "",
    createdAt: "",
    tel: "",
    email: "",
  });
  const [customer, setCustomer] = React.useState<CustomerData>({
    name: "",
    tel: "",
    address1: "",
    address2: "",
    vat: "",
    note: "",
  });
  const [docNote, setDocNote] = React.useState<DocNoteInForm>();
  const [open, setOpen] = React.useState(false);
  const addRow = (e: any) => {
    e.preventDefault();
    const newRowId = productRow.length;
    const newRowData = {
      id: newRowId,
      content: "",
      qty: 0,
      price: 0,
      discount: 0, //ส่วนลด
      amount: 0, //สำหรับยอดรวม
      total: 0,
      article: "", //รหัสสินค้า
    };
    setProductRow([...productRow, newRowData]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    CompanyProps(company);
    TableProps(productRow);
    DocumentProps(doc);
    CustomerProps(customer);
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
    setDoc({
      id: "",
      createdAt: "",
      tel: "",
      email: "",
    });
    setCompany({
      logo: "",
      name: "",
      comAddress1: "",
      comAddress2: "",
      comTel: "",
      comEmail: "",
      comVat: "",
    });
    setCustomer({
      name: "",
      tel: "",
      address1: "",
      address2: "",
      vat: "",
      note: "",
    });
    setDocNote({
      content: "",
    });
    setOpen(false);
  };
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
  const handleFileChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0] || null;
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCompany((prevCompany) => ({
        ...prevCompany,
        logo: fileUrl,
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name.startsWith("company")) {
      setCompany((prevCompany) => ({
        ...prevCompany,
        [name.replace("company.", "")]: value,
      }));
    } else if (name.startsWith("doc")) {
      setDoc((prevDoc) => ({
        ...prevDoc,
        [name.replace("doc.", "")]: value,
      }));
    } else if (name.startsWith("customer")) {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [name.replace("customer.", "")]: value,
      }));
    } else if (name.startsWith("note")) {
      setDocNote((prevCustomer) => ({
        ...prevCustomer,
        [name.replace("note.", "")]: value,
      }));
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>สร้างใบส่งของ / ใบเสร็จรับเงิน</Button>
        </DialogTrigger>
        <DialogContent
          className="max-w-fit overflow-y-scroll max-h-screen"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>สร้างข้อมูล</DialogTitle>
            <DialogDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum,
              doloremque.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-2">
            <label className="">
              รายละเอียดร้านค้า
              {/* //TODO: Input for company */}
              <Input
                onChange={(e) => handleFileChange(e)}
                type="file"
                accept="image/*"
              />
            </label>
            <div className="grid gap-4 py-4">
              <Input
                onChange={(e) => handleChange(e)}
                type="text"
                name="company.name"
                placeholder="Company name"
              />
              <Input
                onChange={(e) => handleChange(e)}
                type="text"
                name="company.comAddress1"
                placeholder="address line 1"
              />
              <Input
                onChange={(e) => handleChange(e)}
                type="text"
                name="company.comAddress2"
                placeholder="address line 2"
              />
              <div className="flex justify-between gap-4">
                <Input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="company.comTel"
                  placeholder="Telephone Number"
                  className="w-[250px]"
                />
                <Input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="company.comEmail"
                  placeholder="Email"
                  className="w-[300px]"
                />
              </div>
              <Input
                onChange={(e) => handleChange(e)}
                type="text"
                name="company.comVat"
                placeholder="VAT ID"
              />
            </div>
            <hr />
            <label className="grid gap-4 pt-4">
              {/* //TODO : Input for Document */}
              รายละเอียดเอกสาร
              <Input
                name="doc.id"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="เลขที่เอกสาร"
              />
              <Input
                name="doc.createdAt"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="วันที่สร้างเอกสาร"
              />
              <Input
                name="doc.tel"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="เบอร์โทร"
              />
              <Input
                name="doc.email"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="อีเมลล์"
              />
            </label>
            {/* //TODO : Input for Customer */}
            <label className="grid gap-4 py-4">
              รายละเอียดลูกค้า
              <Input
                name="customer.name"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="ชื่อลูกค้า"
              />
              <Input
                name="customer.address1"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="ที่อยู่บรรทัดแรก"
              />
              <Input
                name="customer.address2"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="ที่อยู่บรรทัดสอง"
              />
              <div className="flex justify-between gap-4">
                <Input
                  name="customer.tel"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="เบอร์โทร"
                />
                <Input
                  name="customer.vat"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="เลขที่ผู้เสียภาษี"
                />
              </div>
              <textarea
                onChange={(e) => handleChange(e)}
                name="customer.note"
                placeholder="หมายเหตุสำหรับลูกค้า"
                className="border border-gray-500/20 rounded-md p-2"
              />
            </label>
{/* //TODO: Input for table */}
            <label>
              รายละเอียดภายในตาราง
              {productRow.map((row, i) => (
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
                        className="w-[70px] text-xs"
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
                      ส่วนลด
                      <Input
                        name="discount"
                        value={row.discount}
                        onChange={(e) => handleAddRows(row.id ?? 0, e)}
                        type="number"
                        placeholder="ส่วนลด"
                        className="w-[70px] text-xs"
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
                  <div className="p-2 w-full shadow-xl"/>
                </div>
              ))}
            </label>

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

export default CreateDataProps;
