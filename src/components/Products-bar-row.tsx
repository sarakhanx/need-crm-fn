"use client";

import React from "react";
import { DeleveryNotes } from "../lib/types";
import MaxA4 from "./wrapper/maxA4";
import { Button } from "./ui/button";
import { useReactToPrint } from "react-to-print";

const ProductsBarRow = () => {
  const [data, setData] = React.useState<DeleveryNotes[]>([
    {
      id: 1,
      image: null,
      detail: "",
      branch:"",
      price: 0,
      qty: 0,
    },
  ]);

  const addRow = (e: any) => {
    e.preventDefault();
    const newRowId = data.length + 1;
    const newRowData = {
      id: newRowId,
      image: null,
      detail: "",
      branch:"",
      price: 0,
      qty: 0,
    };
    setData([...data, newRowData]);
  };

  const deleteRow = (id: any) => {
    const newData = data.filter((row) => row.id !== id);
    if (id === 1) {
      console.log("there is no data to remove");
    } else {
      setData(newData);
    }
  };

  const handleAddRows = (
    id: any,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newData =
      name === "price" || name === "qty" ? parseFloat(value) || "" : value;
    const updateRows = data.map((row) =>
      row.id === id ? { ...row, [name]: newData } : row
    );
    setData(updateRows);
    console.log(data);
  };

  const handleFileChange = (e: any, index: number) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const updatedData = [...data];
      updatedData[index] = { ...updatedData[index], image: file };
      setData(updatedData);
    }
  };

  const contentToPrint = React.useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Title Of Document",
    onBeforePrint() {
      console.log("onBeforePrint");
    },
    onAfterPrint() {
      console.log("onAfterPrint");
    },
    removeAfterPrint: true,
  });

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <MaxA4>
        <div ref={contentToPrint}>
        <div className="flex flex-col justify-between">
        <div className="w-full text-center mb-4">
        <h3 className='prompt-semibold text-lg'>รายการขอบาร์สินค้าเข้าระบบ</h3>
        </div>
        <table className="w-full border border-black" >
          <thead>
            <tr className="bg-gray-500/50 prompt-regular text-xs shadow-sm">
              <th className="text-start">ลำดับ</th>
              <th className="text-start">ภาพสินค้า</th>
              <th className="text-start">ชื่อสินค้า</th>
              <th className="text-start">สาขา</th>
              <th className="text-start">ราคา</th>
              <th className="text-start">จํานวน</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={`${row.id}`}
                className="prompt-regular text-xs border-b-2 border-gray-500"
              >
                <td className="w-5 text-center">{row.id}</td>
                <td>
                  {!row.image && (
                    <label className="tracking-tighter">
                      image
                      <input
                        type="file"
                        name="image"
                        className="w-20"
                        onChange={(e) => handleFileChange(e, index)}
                      />
                    </label>
                  )}
                  {row.image && row.image instanceof File && (
                    <div className="flex justify-center items-center">
                      <img
                        src={URL.createObjectURL(row.image)}
                        alt={`Selected ${row.id}`}
                        width={150}
                        className="p-1"
                      />
                    </div>
                  )}
                </td>
                <td>
                  <textarea
                    id="detail"
                    placeholder="ชื่อสินค้า"
                    name="detail"
                    value={row.detail}
                    onChange={(e) => handleAddRows(row.id, e)}
                    className="w-[200px] text-xs h-auto overscroll-contain"
                  />
                </td>
                <td>
                  <input
                    id="branch"
                    name="branch"
                    onChange={(e) => handleAddRows(row.id, e)}
                    type="text"
                    placeholder="สาขา"
                    className="w-[100px]"
                  />
                </td>
                <td>
                  <input
                    id="price"
                    name="price"
                    value={row.price}
                    onChange={(e) => handleAddRows(row.id, e)}
                    type="number"
                    placeholder="ราคา"
                    className="w-[150px]"
                  />
                </td>
                <td>
                  <input
                    id="qty"
                    value={row.qty}
                    onChange={(e) => handleAddRows(row.id, e)}
                    type="number"
                    placeholder="จํานวน"
                    name="qty"
                    className="w-12"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </MaxA4>
      <div>
        <div className="w-full flex justify-center gap-x-4 p-2 mt-5 ">
          <Button type="button" className="w-96 bg-green-500" onClick={addRow}>
            + Add Row
          </Button>
          <Button
            type="button"
            className="w-96 bg-red-500"
            onClick={() => deleteRow(data[data.length - 1].id)}
          >
            - Remove Row
          </Button>
        </div>
        <Button
          className="w-full"
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          Print
        </Button>
      </div>
      <style>
        {`
          @media print {
            @page {
            margin: 0.2cm;
    }
            h3 {
            text-align: center;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 10px;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            .print-button {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductsBarRow;
