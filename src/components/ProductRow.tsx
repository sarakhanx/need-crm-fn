import Maxwidth from "./MaxWidth";
import React from "react";
import { Input } from "@/components/ui/input";
import type { Error, ParamsID } from "@/lib/types";
import z from "zod";
import { Button } from "./ui/button";

const api = process.env.NEXT_PUBLIC_API

const ProductSchema = z.object({
  id: z.number(),
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
  })
});
type ProductFields = z.infer<typeof ProductSchema>;

const ProductRow = (params: ParamsID) => {
    const docs_Id = params.params?.id
  const [errors, setErrors] = React.useState<Error>({
    productErrors: {},
  });
  const [product, setProduct] = React.useState<ProductFields[]>([
    {
      id: 1,
      title: "",
      price: 0,
      discount: 0,
      note: "",
      sku: "",
      size: "",
      qty: 0,
    },
  ]);
  const addRow = (e: any) => {
    e.preventDefault();
    const newRowId = product.length + 1;
    const newRow = {
      id: newRowId,
      title: "",
      total_price: 0,
      price: 0,
      discount: 0,
      note: "",
      sku: "",
      size: "",
      qty: 0,
    };
    setProduct([...product, newRow]);
  };
  const removeRow = (idToRemove: any) => {
    const updatedRows = product.filter((row) => row.id !== idToRemove);
    setProduct(updatedRows);
  };
  const handleAddRows = (id: any, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue =
      name === "qty" ||
      name === "price" ||
      name === "discount"
        ? parseFloat(value) || ""
        : value;
    const updatedRows = product.map((row) =>
      row.id === id ? { ...row, [name]: newValue } : row
    );
    setProduct(updatedRows);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productErrors: Error = {
      productErrors: {},
    };
  
    const promises = product.map(async (item, index) => {
      const productValidation = ProductSchema.safeParse(item);
      if (!productValidation.success) {
        productErrors.productErrors[index.toString()] = productValidation.error.errors.map((err) => err.message);
      } else {
        try {
          const response = await fetch(`${api}/add-product`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({item , doc_id:docs_Id}),
          });
          const data = await response.json();
          if (data.success) {
            console.log(`Product ${index + 1} submitted successfully!`, data);
          }
        } catch (error) {
          console.error(`Error occurred while sending product ${index + 1} request:`, error);
        }
      }
    });
  
    await Promise.all(promises);
  
    setErrors(productErrors);
  
    console.log(product,docs_Id);
  };
  
  return (
    <Maxwidth>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex flex-col justify-between gap-4">
            <table>
              <thead>
                <tr>
                  <th>ชื่อสินค้า</th>
                  <th>ราคา</th>
                  <th>ส่วนลด</th>
                  <th>SKU</th>
                  <th>size</th>
                  <th>qty</th>
                  <th>Note</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {product.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Input
                        id="title"
                        type="text"
                        className=""
                        placeholder="ชื่อสินค้า"
                        name="title"
                        value={row.title}
                        onChange={(e) => handleAddRows(row.id, e)}
                      />
                    </td>
                    <td>
                      <Input
                        id="price"
                        type="number"
                        className=""
                        placeholder="ราคาต่อชิ้น"
                        name="price"
                        value={row.price}
                        onChange={(e) => handleAddRows(row.id, e)}
                      />
                    </td>
                    <td>
                      <Input
                        id="discount"
                        type="number"
                        className=""
                        placeholder="ส่วนลด"
                        name="discount"
                        value={row.discount}
                        onChange={(e) => handleAddRows(row.id, e)}
                      />
                    </td>
                    <td>
                      <Input
                        id="sku"
                        type="text"
                        className=""
                        placeholder="รหัส"
                        name="sku"
                        value={row.sku}
                        onChange={(e) => handleAddRows(row.id, e)}
                      />
                    </td>
                    <td>
                      <Input
                        id="size"
                        type="text"
                        className=""
                        placeholder="ขนาด"
                        name="size"
                        value={row.size}
                        onChange={(e) => handleAddRows(row.id, e)}
                      />
                    </td>
                    <td>
                      <Input
                        id="qty"
                        type="number"
                        className=""
                        placeholder="จำนวน"
                        name="qty"
                        value={row.qty}
                        onChange={(e) => handleAddRows(row.id, e)}
                      />
                    </td>
                    <td>
                      <Input
                        id="note"
                        type="text"
                        className=""
                        placeholder="หมายเหตุ"
                        name="note"
                        value={row.note}
                        onChange={(e) => handleAddRows(row.id, e)}
                      />
                    </td>
                    <td>
                      <Input
                        id="total_price"
                        type="number"
                        className=""
                        placeholder="0.00"
                        name="total_price"
                        onChange={(e) => handleAddRows(row.id, e)}
                        disabled
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {Object.keys(errors).length > 0 && (
              <div className="text-red-500">
                {Object.entries(errors.productErrors).map(
                  ([field, fieldErrors]) => (
                    <div key={field}>
                      <strong>สินค้าแถวที่ {field}:</strong>
                      {fieldErrors.map((error, index) => (
                        <div
                          key={`${field}-${index}`}
                          className="text-sm underline"
                        >
                          <p>{error}</p>
                        </div>
                      ))}
                      <hr />
                    </div>
                  )
                )}
              </div>
            )}
            <div className="flex flex-col justify-center gap-2">
              <div className="flex w-full items-center justify-between space-x-2">
                <Button type="button" className="w-full bg-green-700" onClick={addRow}>
                  + Add Row
                </Button>
                <Button
                  className="w-96"
                  variant={"destructive"}
                  onClick={() => removeRow(product[product.length - 1].id)}
                  type="button"
                >
                  - Remove Row
                </Button>
              </div>
              <Button type="submit" className="bg-blue-700">
                Create Product
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Maxwidth>
  );
};
export default ProductRow;
