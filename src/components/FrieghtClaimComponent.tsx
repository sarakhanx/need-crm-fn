'use client'
import React from "react"
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
    FormContent,
  } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";



const FreightClaimComponent = ({TableProps} : any) => {
    const [open , setOpen] = React.useState(false)
    const [productRow , setProductRow] = React.useState<FormContent[]>([
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
      ])
      const addRow = (e: any) => {
        e.preventDefault();
        const newRowId = productRow.length;
        const newRowData = {
          id: newRowId,
          content: "",
          qty: 0,
          price: 0,
          discount: 0,
          amount: 0,
          total: 0,
          article: "", 
        };
        setProductRow([...productRow, newRowData]);
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


    const handleSubmit = (e: any) => {
        e.preventDefault();
        TableProps(productRow);
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

    return (
        <>
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
        <Button className="bg-blue-500">สร้างข้อมูล</Button>
                </DialogTrigger>
                <DialogContent
                className="max-w-fit overflow-y-scroll max-h-screen"
                aria-describedby={undefined}
                >
                    <DialogHeader>
                        <DialogTitle>สร้างข้อมูล</DialogTitle>
                        <DialogDescription>
                            กรุณากรอกรายละเอียดภายในตาราง
                        </DialogDescription>
                    </DialogHeader>
                <form className="space-y-6" onSubmit={handleSubmit}>
                <label>
              รายละเอียดภายในตาราง
              {productRow.map((row, i) => (
                <div key={i} className="grid gap-4 py-4">
                    <textarea
                    name="content"
                    value={row.content}
                    onChange={(e) => handleAddRows(row.id, e)}
                    placeholder="รายละเอียด"
                    className="border border-gray-500/20 rounded-md p-2"
                  />
                  <div className="flex justify-between space-x-2 items-center">
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
                      ยอดรวมสุทธิ
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
            </div>
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
        </div>
        
        </>
    )
}

export default FreightClaimComponent;