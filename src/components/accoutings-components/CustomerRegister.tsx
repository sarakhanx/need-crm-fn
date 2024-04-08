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
import { Errors} from "@/lib/types";
import z from "zod";

const CustomerSchema = z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  customer_email: z.string().email(),
  customer_address: z.string().min(5),
  customer_mobile: z.string().min(10),
});

const CompanySchema = z.object({
  company_name: z.string(),
  company_address: z.string(),
  company_contact: z.string(),
  company_vat: z.string(),
});

const api = process.env.NEXT_PUBLIC_API;

const Companies = () => {
  const [customer, setCustomer] = React.useState({
    name: "",
    lastname: "",
    customer_email: "",
    customer_address: "",
    customer_mobile: "",
  });
  const [company, setCompany] = React.useState({
    company_name: "",
    company_address: "",
    company_contact: "",
    company_vat: "",
  });
  const [errors, setErrors] = React.useState<Errors>({
    fieldErrors: {},
  });
  const handleChange = (field: any, value: any, type: string) => {
    if (type === "customer") {
      setCustomer((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    } else if (type === "company") {
      setCompany((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customerValidation = CustomerSchema.safeParse(customer);
    const companyValidation = CompanySchema.safeParse(company);
    if (!customerValidation.success) {
      setErrors(customerValidation.error.flatten());
    } else if (!companyValidation.success) {
      setErrors(companyValidation.error.flatten());
    } else {
        const {
          name,
          lastname,
          customer_email,
          customer_address,
          customer_mobile,
        } = customer;
        const { company_name, company_address, company_contact, company_vat } =
          company;
        const handleSubmit = await fetch(`${api}/add-customer`, {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
                name,
                lastname,
                customer_email,
                customer_address,
                customer_mobile,
                company_name,
                company_address,
                company_contact,
                company_vat,
        }),
        });
        console.log("Form submitted successfully!");
        console.log(JSON.stringify({
                name,
                lastname,
                customer_email,
                customer_address,
                customer_mobile,
                company_name,
                company_address,
                company_contact,
                company_vat,
        }))
        if (handleSubmit.status === 200) {
          alert("บันทึกสําเร็จ");
          window.location.reload();
        } else {
          alert("บันทึกไม่สําเร็จ");
        }
    }
  };
  return (
    <div className="overflow-y-auto h-96 p-5">
      <Card>
        <CardHeader>
          <CardTitle>นามบุคคล | บริษัทผู้ซื้อ</CardTitle>
          <CardDescription>รายละเอียดหัวบิลของผู้ซื้อ</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between">
              <label>
                ชื่อ - นามสกุล
                <div className="flex justify-between gap-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="ชื่อ"
                    value={customer.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value, "customer")
                    }
                  />
                  <Input
                    type="text"
                    placeholder="นามสกุล"
                    value={customer.lastname}
                    onChange={(e) =>
                      handleChange("lastname", e.target.value, "customer")
                    }
                  />
                </div>
              </label>
            </div>
            <label className="block text-gray-700 text-sm mb-2 p-3 rounded-lg w-full">
              ที่อยู่ในนามลูกค้า
              <Textarea
                value={customer.customer_address.replace(/<br\s*\/?>/g, "\n")}
                onChange={(e) =>
                  handleChange("customer_address", e.target.value, "customer")
                }
              />
            </label>
            <label className="block text-gray-700 text-sm mb-2 p-3 rounded-lg w-full">
              เบอร์มือถือ | เบอร์โทรที่ติดต่อได้
              <Input
                type="text"
                value={customer.customer_mobile}
                onChange={(e) =>
                  handleChange("customer_mobile", e.target.value, "customer")
                }
              />
            </label>
            <label className="block text-gray-700 text-sm mb-2 p-3 rounded-lg w-full">
              E-mail
              <Input
                type="text"
                value={customer.customer_email}
                onChange={(e) =>
                  handleChange("customer_email", e.target.value, "customer")
                }
              />
            </label>
            <div className="relative my-5">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">
                  ในนามบริษัท
                </span>
              </div>
            </div>
            <label className="block text-gray-700 text-sm mb-2 p-3 rounded-lg w-full">
              ชื่อบริษัท
              <Input
                type="text"
                name="company_name"
                value={company.company_name}
                onChange={(e) =>
                  handleChange("company_name", e.target.value, "company")
                }
              />
            </label>
            <label className="block text-gray-700 text-sm mb-2 p-3 rounded-lg w-full">
              ที่อยู่บริษัท
              <Textarea
                name="company_address"
                value={company.company_address.replace(/<br\s*\/?>/g, "\n")}
                onChange={(e) =>
                  handleChange("company_address", e.target.value, "company")
                }
              />
            </label>
            <label className="block text-gray-700 text-sm mb-2 p-3 rounded-lg w-full">
              เลขที่ผู้เสียภาษี
              <Input
                type="text"
                name="company_vat"
                value={company.company_vat}
                onChange={(e) =>
                  handleChange("company_vat", e.target.value, "company")
                }
              />
            </label>
            <label className="block text-gray-700 text-sm mb-2 p-3 rounded-lg w-full">
              เบอร์โทรในนามบริษัท
              <Input
                type="text"
                name="company_contact"
                value={company.company_contact}
                onChange={(e) =>
                  handleChange("company_contact", e.target.value, "company")
                }
              />
            </label>
            <div className="flex justify-between gap-2">
              <Button variant="destructive" className="w-full shadow-md">
                ยกเลิก
              </Button>
              <Button type="submit" className="bg-blue-700 w-full shadow-md">
                บันทึก
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500">
              {Object.entries(errors.fieldErrors).map(
                ([field, fieldErrors]) => (
                  <div key={field}>
                    <strong>{field}:</strong>
                    {fieldErrors.map((error, index) => (
                      <div key={`${field}-${index}`}>{error}</div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Companies;
