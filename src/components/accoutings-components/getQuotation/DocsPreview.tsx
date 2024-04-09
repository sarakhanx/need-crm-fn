'use client'
import React from "react"
import {Card , CardContent , CardHeader , CardDescription , CardTitle} from "@/components/ui/card"
import Maxwidth from "@/components/MaxWidth"
import { useUserSession } from "@/lib/hooks/authHooks/useUserSession"


interface Product {
    Title: string;
    Size: string;
    Qty: string;
    Price: string;
    Discount: string;
    'Total Price': string;
}

interface Document {
    createdAt: string;
    user_name: string;
    user_lastname: string;
    roles: string;
    company_name: string;
    company_address: string;
    company_contact: string;
    company_vat_id: string;
    customer_name: string;
    customer_lastname: string;
    customer_address: string;
    customer_mobile: string;
    products: string | null;
    productsArray: Product[];
}

type Data = Document[];


const api = process.env.NEXT_PUBLIC_API
const DocsPreview = () =>{
    const {userSession} = useUserSession()
    const token = userSession?.token
    const id = userSession?.id
    

    const [userDocs , setUserDocs] = React.useState<Document[]>([])

React.useEffect( ()=>{
    const dataFetcher = async ()=>{
    try {
            if(id){
                const res = await fetch(`${api}/get-docs-by-user/${id}`, {
                    method:"GET",
                    headers:{
                        "Content-Type" : "application/json",
                        "authorization" : `Bearer ${token}`
                    }
                })
                const data = await res.json()
                setUserDocs(data.docs)
                console.log(data)
            }
    } catch (error :any) {
        throw new Error("Something went wrong", error)
    }}
    dataFetcher()
},[id, token])

    return (
        <Maxwidth>
             {/* <code> {JSON.stringify(userDocs)}</code> */}
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Docs Preview</CardTitle>
                    <CardDescription className="text-sm">Preview Docs</CardDescription>
                </CardHeader>
                {userDocs.map((doc, i) => (
    <CardContent key={i}>
        <div>
            <h3>Document #{i + 1}</h3>
            <p>Created At: {doc.createdAt}</p>
            <p>User: {doc.user_name} {doc.user_lastname}</p>
            <p>Company: {doc.company_name}</p>
            <p>Customer: {doc.customer_name} {doc.customer_lastname}</p>
            <p>Customer Address: {doc.customer_address}</p>
            <p>Customer Mobile: {doc.customer_mobile}</p>
            <h4>Products:</h4>
            {doc.productsArray && doc.productsArray.length > 0 ? (
                <ul>
                    {doc.productsArray.map((product, index) => (
                        <li key={index}>
                            Title: {product.Title}, Size: {product.Size}, Qty: {product.Qty}, Price: {product.Price}, Discount: {product.Discount}, Total Price: {product['Total Price']}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found</p>
            )}
            {doc.products && (
                <p>Product Info: {doc.products}</p>
            )}
        </div>
        <hr />
    </CardContent>
))}
            </Card>
        </div>
        </Maxwidth>
    )
}

export default DocsPreview;