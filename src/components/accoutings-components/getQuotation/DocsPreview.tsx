"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Maxwidth from "@/components/MaxWidth";
import { useUserSession } from "@/lib/hooks/authHooks/useUserSession";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Document , Product } from "@/lib/types";

type Data = Document[];

const api = process.env.NEXT_PUBLIC_API;
const DocsPreview = () => {
  const { userSession } = useUserSession();
  const token = userSession?.token;
  const id = userSession?.id;

  const [userDocs, setUserDocs] = React.useState<Document[]>([]);
  const [ status , setStatus] = React.useState<Boolean>(false)

  React.useEffect(() => {
    const dataFetcher = async () => {
      try {
        if (id) {
          const res = await fetch(`${api}/get-docs-by-user/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setUserDocs(data.docs);
          console.log(data);
          setStatus(true)
        }
      } catch (error: any) {
        throw new Error("Something went wrong", error);
      }
    };
    dataFetcher();
  }, [id, token]);

  return (
    <>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg prompt-semibold">รายการเอกสารต่างๆ</CardTitle>
            <CardDescription className="text-xs text-muted-foreground prompt-light">
              {status ? "รายการเอกสารของท่าน" : "เอกสารของท่านจะแสดงผลที่นี่ เร็วๆนี้"}
            </CardDescription>
          </CardHeader>
          {userDocs.map((doc, i) => (
            <CardContent key={i} className="">
              <div className="flex justify-between self-center">
                <div className="flex-col">
                  <p className="text-xs underline">เลขที่เอกสาร #</p>
                  <h3 className="text-center">{doc.id}</h3>
                </div>
                <div className="text-xs">
                  <p className="text-xs underline">คนขาย</p>
                  <p className="text-xs">
                    {doc.user_name} {doc.user_lastname.substring(0, 2)}.
                  </p>
                </div>

                {doc.customer_name ? (
                  <div className="flex-col">
                    <p className="text-xs underline">ชื่อลูกค้า</p>
                    <p className="text-xs">
                      {doc.customer_name}&nbsp;
                      {doc.customer_lastname.substring(0, 2)}.
                    </p>
                  </div>
                ) : (
                  <div className="flex-col">
                    <p className="text-xs underline">ชื่อบริษัท</p>
                    <p>{doc.customer_company_name}</p>
                  </div>
                )}
                <div className="text-xs">
                  {doc.productsArray && doc.productsArray.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs">
                          <th>Title</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doc.productsArray.map((product, index) => (
                          <tr key={index}>
                            <td>{product.Title}</td>
                            <td>{product.Qty}</td>
                            <td>{product.Price}</td>
                            <td>{product["Total Price"]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No products found | Content Error
                    </p>
                  )}
                </div>
                <hr />
                <Link
                  href={`/crm/pdf/${doc.id}`}
                  className="text-sm"
                >
                  <Button className="m-2">View</Button>
                </Link>
              </div>

              <div className="flex-col justify-center shadow-sm">
                <p className="text-xs text-muted-foreground">
                อัพเดท: {new Date(doc.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          ))}
        </Card>
      </div>
    </>
  );
};

export default DocsPreview;
