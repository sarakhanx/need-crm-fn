"use client";

import { ParamsID } from "@/lib/types";
import React from "react";
import type { Document, Product } from "@/lib/types";
import { useUserSession } from "@/lib/hooks/authHooks/useUserSession";

const api = process.env.NEXT_PUBLIC_API;


export default function Page(params: ParamsID) {
    const {userSession} = useUserSession();
    const token = userSession?.token;
  const id = params.params.id;
  const [data, setData] = React.useState<Document>();

  React.useEffect(() => {
    const prepareData = async () => {
        try {
            if (token) {
                const res = await fetch(`${api}/get-a-doc/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`
                    }
                });

                const jsonData = await res.json();
                const fetchedData = jsonData.doc;
                // Format company address field with line breaks
                const formattedAddress = fetchedData.company_address ? fetchedData.company_address.replace(/\r\n/g, "<br>") : '';
                // Format company contact field
                if (fetchedData.company_contact) {
                    const contactArray = JSON.parse(fetchedData.company_contact);
                    const formattedContact = Object.entries(contactArray).map(([key, value]) => `${key}: ${value}`).join(", ");
                    fetchedData.company_contact = formattedContact.replace(/\r\n/g, "<br>");
                }
                // Update the data state with formatted fields
                setData({
                    ...fetchedData,
                    company_address: formattedAddress
                });
            }
        } catch (error: any) {
            console.log(error);
            throw new Error("Something went wrong", error);
        }
    };

    prepareData();
}, [id, token]);


//   console.log(id);
  return (
    <>
 <div className="grid grid-cols-2 gap-4">
    <div className="col-span-2">
      <h3 className="text-lg font-semibold">ใบเสร็จรับเงิน</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm">วันที่: {data?.createdAt}</p>
          <p className="text-sm">เลขที่: {id}</p>
        </div>
        <div>
          <p className="text-sm">ผู้ให้บริการ: {data?.company_name}</p>
          <p className="text-sm">เลขที่ผู้เสียภาษี: {data?.company_vat_id}</p>
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold">ข้อมูลผู้ซื้อ</h3>
      <p className="text-sm">ชื่อ-สกุล: {data?.customer_name} {data?.customer_lastname}</p>
      <p className="text-sm">ที่อยู่: {data?.customer_address}</p>
      <p className="text-sm">เบอร์โทรศัพท์: {data?.customer_mobile}</p>
    </div>
    <div className="col-span-2">
      <h3 className="text-lg font-semibold">รายการสินค้า</h3>
      {data?.productsArray && (
        <ul className="list-disc list-inside">
          {data.productsArray.map((product, index) => (
            <li key={index} className="text-sm">
              {product.Title}: ขนาด {product.Size}, จำนวน {product.Qty} ชิ้น, ราคา {product.Price} บาท, ส่วนลด {product.Discount} บาท, รวม {product["Total Price"]} บาท
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  </>
  );
}
