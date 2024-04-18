"use client";

import { ParamsID } from "@/lib/types";
import React, { ReactHTML } from "react";
import type { Document, Product } from "@/lib/types";
import { useUserSession } from "@/lib/hooks/authHooks/useUserSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const api = process.env.NEXT_PUBLIC_API;

export default function Page(params: ParamsID) {
  const { userSession } = useUserSession();
  const token = userSession?.token;
  const id = params.params.id;
  const [data, setData] = React.useState<Document>();
  const [loading, setLoading] = React.useState<Boolean>(true);

  React.useEffect(() => {
    const prepareData = async () => {
      try {
        const res = await fetch(`${api}/get-a-doc/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const jsonData = await res.json();
        // console.log("API Response:", jsonData);

        const fetchedData = jsonData.doc;
        // Format company address field with line breaks
        const formattedAddress = fetchedData.company_address
          ? fetchedData.company_address.replace(/\r\n/g, "<br>")
          : "";
        // Format company contact field
        if (fetchedData.company_contact) {
          const contactArray = JSON.parse(fetchedData.company_contact);
          const formattedContact = Object.entries(contactArray)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");
          fetchedData.company_contact = formattedContact.replace(
            /\r\n/g,
            "<br>"
          );
          // Update the data state with formatted fields
          setData({
            ...fetchedData,
            company_address: formattedAddress,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        // setError("An error occurred while fetching data. Please try again later.");
      }
    };

    prepareData();
  }, [id, token]);

  if (loading) {
    return <div>loading....</div>;
  }

  //   console.log(id);
  return (
    <>
      <div id="pdf-content" className="flex justify-center">
        <div className="mx-1">
          {/* Dealer Information */}
          <div className="flex justify-between p-4">
            <div className="flex-col prompt-light">
              <div className="h-16 w-32 overflow-hidden rounded-md">
                <img src={`${data?.company_logo_path}`} alt="logo-company" />
              </div>
              <h3 className="text-md font-semibold">{data?.company_name}</h3>
              <div
                className="text-xs"
                dangerouslySetInnerHTML={{
                  __html: data?.company_address || "",
                }}
              />
              <div className="flex items-center text-xs -tracking-tighter ">
                <p className="text-xs">เลขประจำตัวผู้เสียภาษี&nbsp;:&nbsp;</p>
                <p>{data?.company_vat_id}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center font-semibold underline">
              <h3 className="text-lg text-end">ใบเสนอราคา/ใบเสร็จ</h3>
            </div>
          </div>
          {/* Customer Information */}
          <div className="flex justify-stretch gap-1 w-full">
            <div className="flex border border-gray-900 rounded-lg p-4 prompt-light text-xs w-full">
              <div className="flex-col">
                {data?.customer_name ? (
                  <div className="flex">
                    นามลูกค้า:&nbsp;
                    <p className="underline">
                      {data?.customer_name}&nbsp;{data?.customer_lastname}
                    </p>
                  </div>
                ) : (
                  <div className="flex text-xs">
                    นามบริษัท:&nbsp;<p>{data?.customer_company_name}</p>
                  </div>
                )}

                <p className="">Address:&nbsp;{data?.customer_address}</p>
                <p className="">Phone:&nbsp;{data?.customer_mobile}</p>
              </div>
              {/* Add more customer information here */}
            </div>
            <div className="flex-col justify-start items-center border border-gray-900 rounded-lg p-4 prompt-light text-xs">
              <div className="flex">
                <p className="">เอกสารเลขที่&nbsp;:&nbsp;</p>
                <p>{data?.DocId}</p>
              </div>
              <div className="flex">
                <p className="">วันที่เสนอราคา&nbsp;:&nbsp;</p>
                <p>
                  {data?.company_address
                    ? new Date(data?.doc_createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
              <div className="flex">
                  <p>การชำระเงิน&nbsp;:&nbsp;</p>
                </div>
              <div className="flex">
                  <p>ครบกำหนด&nbsp;:&nbsp;</p>
                </div>
            </div>
          </div>

          {/* Product List */}
          <div className="col-span-2 mb- text-xs mx-1 prompt-light my-2">
  {data?.productsArray && (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-200 text-xs">
          <th className="border border-gray-400 p-2">ลำดับ</th>
          <th className="border border-gray-400 p-2" style={{ width: '50%' }}>ชื่อสินค้า</th>
          <th className="border border-gray-400 p-2">ขนาด</th>
          <th className="border border-gray-400 p-2">qty</th>
          <th className="border border-gray-400 p-2">Price (THB)</th>
          <th className="border border-gray-400 p-2">Discount (THB)</th>
          <th className="border border-gray-400 p-2">Total (THB)</th>
        </tr>
      </thead>
      <tbody className="border border-gray-400">
        {data.productsArray.map((product, index) => (
          <tr key={index} className="text-xs text-center">
            <td className="p-2">{index + 1}</td>
            <td className="p-2 text-start" style={{ width: '50%' }}>{product?.Title}</td>
            <td className="p-2">{product?.Size}</td>
            <td className="p-2">{product?.Qty}</td>
            <td className="p-2">{product?.Price}</td>
            <td className="p-2">{product?.Discount}</td>
            <td className="p-2">{product["Total Price"]}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={7} className=""></td>
        </tr>
        <tr>
          <td colSpan={7} className=" p-2"></td>
        </tr>
        <tr>
          <td colSpan={7} className="p-2"></td>
        </tr>
      </tbody>
    </table>
  )}
</div>


          <div className="w-full flex justify-end prompt-semibold text-xs">
            <div className="flex flex-col w-full my-2 mx-1">
              <label className="underline underline-offset-2 p-2">
          ชำระโดย
          </label>
          <div className="space-y-2">
          <div className="flex items-center gap-2">
                  <Input type="checkbox"/>เงินสด
          </div>
          <div className="flex items-center gap-2">
                  <Input type="checkbox"/>เช็คธนาคาร
                  <div className="underline underline-offset-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div>เลขที่</div><div className="underline underline-offset-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          </div>
            <div className="flex items-center gap-2">สาขา
            <div className="underline underline-offset-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            ลงวันที่<div className="underline underline-offset-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
          </div>
              
            </div>

            <div className="flex flex-col my-2 border  border-gray-400 rounded-md p-2 prompt-light mx-1">
              <div className="flex text-xs">
                <p className="font-semibold underline">Total</p>
                <p>&nbsp;:&nbsp;{data?.net}&nbsp;THB</p>
              </div>
              <div className="flex text-xs">
                <p className="font-semibold underline">VAT</p>
                <p>&nbsp;:&nbsp;None&nbsp;%</p>
              </div>
              <div className="flex text-xs underline underline-offset-4">
                <p className="font-semibold underline">Net</p>
                <p>&nbsp;:&nbsp;{data?.net}&nbsp;THB</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-1">
            {/* //todo : จะต้องลงลายเซ็นของผู้รับสินค้า , ผู้ส่ง , คนรับเงิน , ผู้จัดส่ง */}
            <div className="flex">
              <div className="border border-gray-900 rounded-md p-2">
                <h3 className="text-md prompt-regular underline underline-offset-8">ผู้รับสินค้า</h3>
                <div style={{ height: "1.5cm" , width : "4.5cm"}}/>
                <p className="text-xs tracking-tighter prompt-light text-muted-foreground">วันที่&nbsp;.............../.............../...............</p>
              </div>
            </div>
            <div className="flex">
              <div className="border border-gray-900 rounded-md p-2">
                <h3 className="text-md prompt-regular underline underline-offset-8">ผู้ส่งสินค้า</h3>
                <div style={{ height: "1.5cm" , width : "4.5cm"}}/>
                <p className="text-xs tracking-tighter prompt-light text-muted-foreground">วันที่&nbsp;.............../.............../...............</p>
              </div>
            </div>
            <div className="flex">
              <div className="border border-gray-900 rounded-md p-2">
                <h3 className="text-md prompt-regular underline underline-offset-8">ผู้รับเงิน</h3>
                <div style={{ height: "1.5cm" , width : "4.5cm"}}/>
                <p className="text-xs tracking-tighter prompt-light text-muted-foreground">วันที่&nbsp;.............../.............../...............</p>
              </div>
            </div>
            <div className="flex">
              <div className="border border-gray-900 rounded-md p-2">
                <h3 className="text-md prompt-regular underline underline-offset-8">ผู้รับสินค้า</h3>
                <div style={{ height: "1.5cm" , width : "4.5cm"}}/>
                <p className="text-xs tracking-tighter prompt-light text-muted-foreground">วันที่&nbsp;.............../.............../...............</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
