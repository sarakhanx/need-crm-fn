'use client'
import React from "react";
import useAuth from "@/lib/hooks/useAuth";
import {ParamsID , Errors} from "@/lib/types";
import { Input } from "@/components/ui/input";
import z from "zod"
import Maxwidth from "@/components/MaxWidth";
import { useUserSession } from "@/lib/hooks/authHooks/useUserSession";
import { Button } from "@/components/ui/button";
import ProductRow from "@/components/ProductRow";

const api = process.env.NEXT_PUBLIC_API

const ProductSchema = z.object({
    title : z.string().min(1,{
        message : "กรุณาใส่ชื่อสินค้า"
    }),
    // description : z.string().min(1,{
    //     message : "กรุณาใส่รายละเอียดสินค้าอย่างน้อย 15 ตัวอักษร"
    // }),
    price : z.number().min(0.01,{
        message : "กรุณาใส่ราคาสินค้าเป็นตัวเลขเท่านั้น ไม่ต้องใส่ comma , หรือ ."
    }),
    discount : z.number().min(0,{
        message: "ใส่ส่วนลดเป็นจำนวนเต็มเท่านั้น (แบบเปอร์เซ็น แอพไม่คำนวนให้)"
    }),
    note : z.string(),
    sku : z.string(),
    size: z.string(),
    qty : z.number().min(1,{
        message : "ใส่จำนวนสินค้าเป็นจำนวนเต็มเท่านั้น"
    })
})
type ProductFields = z.infer<typeof ProductSchema>

export default function Page(params : ParamsID){
    const {userSession} = useUserSession();
   
    const [dealer , SetDealer] = React.useState<any>()
    const [seller , setSeller] = React.useState<any>()
    const [customer , setCustomer] = React.useState<any>()

    useAuth();
    const id = params.params.id
      React.useEffect(()=>{
        const token =  userSession?.token
        const fetchData = async () =>{
           if(token){
            try {
                const res = await fetch(`${api}/get-a-doc/${id}`,{
                 method : "GET",
                 headers : {
                     "Content-Type" : "application/json",
                     "authorization" : `Bearer ${token}`
                 }
                })
                const data = await res.json()
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
                } catch (error:Error | any) {
                 throw new Error("Something went wrong",error)
                }
           }
        } 
        fetchData()
      },[userSession])
    //   console.log(dealer)
    // console.log(token)
    return(
        <Maxwidth className={"mt-5"}>
            <hr />
            
            <div className="flex justify-between flex-wrap">
            บริษัทที่ขาย
            <div className="">
                <pre className="text-xl font-semibold text-wrap">
                {JSON.stringify(dealer)}
                </pre>
                </div>
                <div className="">
                ลูกค้า
                <pre className="text-xl font-semibold text-wrap">
                {JSON.stringify(customer)}
                </pre>
                </div>
            </div>
            <hr className="mb-5"/>
            <ProductRow params={params.params}/>
            <hr />
        คนขาย
        <pre className="flex justify-between text-xl font-semibold text-wrap">
                {JSON.stringify(seller)}
                </pre>
    </Maxwidth>
    )
}
