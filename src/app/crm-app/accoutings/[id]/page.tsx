"use client";
import React from "react";
import useAuth from "@/lib/hooks/useAuth";
import { ParamsID, Errors } from "@/lib/types";
import z from "zod";
import Maxwidth from "../../../../components/MaxWidth";
import { useUserSession } from "@/lib/hooks/authHooks/useUserSession";
import ProductRow from "@/components/ProductRow";

const api = process.env.NEXT_PUBLIC_API;

const ProductSchema = z.object({
  title: z.string().min(1, {
    message: "กรุณาใส่ชื่อสินค้า",
  }),
  // description : z.string().min(1,{
  //     message : "กรุณาใส่รายละเอียดสินค้าอย่างน้อย 15 ตัวอักษร"
  // }),
  price: z.number().min(0.01, {
    message: "กรุณาใส่ราคาสินค้าเป็นตัวเลขเท่านั้น ไม่ต้องใส่ comma , หรือ .",
  }),
  discount: z.number().min(0, {
    message: "ใส่ส่วนลดเป็นจำนวนเต็มเท่านั้น (แบบเปอร์เซ็น แอพไม่คำนวนให้)",
  }),
  note: z.string(),
  sku: z.string(),
  size: z.string(),
  qty: z.number().min(1, {
    message: "ใส่จำนวนสินค้าเป็นจำนวนเต็มเท่านั้น",
  }),
});
type ProductFields = z.infer<typeof ProductSchema>;

export default function Page(params: ParamsID) {
  const { userSession } = useUserSession();

  const [dealer, SetDealer] = React.useState<any>();
  const [seller, setSeller] = React.useState<any>();
  const [customer, setCustomer] = React.useState<any>();

  useAuth();
  const id = params.params.id;
  React.useEffect(() => {
    const token = userSession?.token;
    const fetchData = async () => {
      if (token) {
        try {
          const res = await fetch(`${api}/get-a-doc/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          SetDealer({
            company_address: data.doc.company_address,
            company_contact: data.doc.company_contact,
            company_name: data.doc.company_name,
            company_vat_id: data.doc.company_vat_id,
          });
          setSeller({
            user_name: data.doc.user_name,
            user_lastname: data.doc.user_lastname,
            user_roles: data.doc.user_roles,
          });
          setCustomer({
            customer_address: data.doc.customer_address,
            customer_lastname: data.doc.customer_lastname,
            customer_mobile: data.doc.customer_mobile,
            customer_name: data.doc.customer_name,
          });
          // console.log(data)
        } catch (error: Error | any) {
          throw new Error("Something went wrong", error);
        }
      }
    };
    fetchData();
  }, [userSession]);
  //   console.log(dealer)
  // console.log(token)
  return (
    <Maxwidth className={"mt-5"}>
      <hr />
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="">
            <h1 className="prompt-semibold">ร้านค้า</h1>
            <h5 className="text-lg font-bold underline underline-offset-2">
              {dealer?.company_name}
            </h5>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: dealer?.company_address.replace(/\r\n/g, "<br>"),
              }}
              className="text-muted-foreground1"
            />
            <div
              dangerouslySetInnerHTML={{
                __html: dealer?.company_contact
                  .replace(/[{}]/g, "")
                  .replace(/,/g, "<br/>")
                  .replace(/[""]/g, ""),
              }}
            />
          </div>
          <div className="flex">
            <div>
              <h1 className="prompt-semibold">ลูกค้า</h1>
              {customer?.customer_name ? (
                <h5 className="text-lg font-bold underline underline-offset-2">
                  {customer?.customer_name}&nbsp;{customer.customer_lastname}
                </h5>
              ) : (
                <h5 className="text-lg font-bold underline underline-offset-2">
                  {customer?.customer_company_name}
                </h5>
              )}
              <hr />
              <div dangerouslySetInnerHTML={{__html:  customer?.customer_address.replace(/\n/g,"<br/>")}} />
              <div dangerouslySetInnerHTML={{__html:  customer?.customer_mobile}} />
            </div>
          </div>
        </div>
      </div>
      <hr className="mb-5" />
      <ProductRow params={params.params} />
      <hr />
      <div className="flex justify-between mt-4">
        <h3 className="text-lg prompt-semibold underline underline-offset-2">{seller?.user_name}&nbsp;{seller?.user_lastname}</h3>
        <p className="text-muted-foreground">Roles : {seller?.user_roles}</p>
      </div>
    </Maxwidth>
  );
}
