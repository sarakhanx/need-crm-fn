"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const api = process.env.NEXT_PUBLIC_API;
interface ContactData {
  [key: string]: string; // ระบุว่ามี key เป็น string และ value เป็น string เท่านั้น
}

const Companies = () => {
  const [address, setAddress] = React.useState([{ id: 1,key:"", value: "" }]);
  const [company , setCompany] = React.useState({
    company_name: "",
    company_address: "",
    company_contact: "",
    company_vat_id: "",
  })
  const [logo , setLogo] = React.useState<File | any>()
  const addRows = (e: any) => {
    e.preventDefault();
    const newRowId = address.length + 1;
    const newRow = { id: newRowId, key:"", value: "" };
    setAddress([...address, newRow]);
  };
  const handleAddRows = (id: any, e: any) => {
    const { name, value } = e.target;
    const updatedRows = address.map((row) =>
      row.id === id ? { ...row, [name]: value } : row
    );
    setAddress(updatedRows);
  };
  const handleChange = (field: any, value: any) => {
    setCompany((prevState) => ({
        ...prevState,
        [field]: value,
      }));
  };
  const handlerFileChange = (e: any) => {
    const selectedFile = e.target.files?.[0];
    setLogo(selectedFile);
  };

  const handleSubmit = async (e : any)=>{
    e.preventDefault();
    const {company_name , company_address , company_contact , company_vat_id} = company
    if(!logo)return ;
    const data = new FormData();
    try {
      data.append("file", logo);
      data.append("company_name", company_name);
      data.append("company_address", company_address);
      data.append("company_vat_id", company_vat_id);
      const contactData : ContactData = address.reduce((acc: ContactData, cur) => {
        acc[cur.key] = cur.value;
        return acc;
      }, {});
      data.append("company_contact", JSON.stringify(contactData));
  

      const submitCreate = await fetch(`${api}/createcompanies`,{
        method : "POST",
        body : data
      })
      if(submitCreate.status === 201){
        alert("บันทึกสําเร็จ")
        window.location.reload()
      }else{
        alert("บันทึกไม่สําเร็จ")
      }
    } catch (error : Error | any) {
      throw new Error("something went wrong", error);
    }
  }

  return (
    <div className="overflow-y-auto h-96 p-5">
      <Card>
        <CardHeader>
          <CardTitle>ลงทะเบียนบริษัทผู้ขาย</CardTitle>
          <CardDescription>
            รายละเอียดหัวบิลของผู้ขาย และอัพโหลดไฟล์สื่อ Logo บริษัท
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="file"
              className="block text-gray-700 text-sm font-bold mb-2 border-2 p-3 rounded-lg w-full file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-gray-900"
            onChange={handlerFileChange}
            >
              อัพโหลดตราบริษัท
              <Input id="file" type="file"
              
              />
            </label>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 border-2 p-3 rounded-lg w-full"
            >
              ชื่อบริษัท
              <Input type="text" name="company_name"
              value={company.company_name}
              onChange={(e) => handleChange("company_name", e.target.value)}
              />
            </label>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 border-2 p-3 rounded-lg w-full"
            >
              ที่อยู่บริษัท
              <Textarea
              value={company.company_address.replace(/<br\s*\/?>/g, '\n')}
              onChange={(e)=>handleChange("company_address", e.target.value)}
              />
            </label>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 border-2 p-3 rounded-lg w-full"
            >
              เลขที่ผู้เสียภาษี
              <Input type="text"
              value={company.company_vat_id}
              onChange={(e)=>handleChange("company_vat_id", e.target.value)}
              />
            </label>
            <div className="flex flex-col justify-center gap-4 text-gray-700 text-sm font-bold mb-2 border-2 p-3 rounded-lg w-full">
              {address.map((row) => (
                <div key={row.id} className="flex justify-between">
                  <label className="space-y-2">
                    ช่องทางการติดต่อที่ {row.id}
                    <div className="flex justify-between">
                    <Input
                      type="text"
                      name="key"
                      value={row.key}
                      placeholder="eg : facebook"
                      onChange={(e) => handleAddRows(row.id, e)}
                    />                    
                    <Input
                      type="text"
                      name="value"
                      value={row.value}
                      placeholder="รายละเอียด..."
                      onChange={(e) => handleAddRows(row.id, e)}
                    />
                    </div>
                  </label>
                </div>
              ))}
              <div className="flex justify-center items-center">
                <Button
                  onClick={addRows}
                  className="bg-blue-400 text-white font-bold py-2 px-4 rounded-lg w-48"
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
            <Button variant="destructive" className="w-full">ยกเลิก</Button>
        <Button className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">บันทึก</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
        
      </CardFooter>
      </Card>
    </div>
  );
};

export default Companies;
