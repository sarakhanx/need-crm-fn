import { Button } from "@/components/ui/button";
import * as React from "react";
import { useUserSession } from "@/lib/hooks/authHooks/useUserSession";
import {Customer , Company} from "@/lib/types";
import { useRouter } from "next/navigation";

const api = process.env.NEXT_PUBLIC_API;

export function DataSelect() {
  const router = useRouter();

  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [customerSelected, setCustomerSelected] =
    React.useState<Customer | null>();
  const [companySelected, setCompanySelected] =
    React.useState<Company | null>();
  const [searchTerm, setSearchTerm] = React.useState("");

  const {userSession} = useUserSession()
  const userId = userSession?.id
  console.log(userId)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesResponse, customersResponse] = await Promise.all([
          fetch(`${api}/companies`),
          fetch(`${api}/get-customers`)
        ]);
        
        if (!companiesResponse.ok || !customersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [companiesData, customersData] = await Promise.all([
          companiesResponse.json(),
          customersResponse.json()
        ]);

        setCompanies(companiesData.data);
        setCustomers(customersData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyName = e.target.value;
    const selectedCompany = companies.find(
      (company) => company.company_name === selectedCompanyName
    );
    setCompanySelected(selectedCompany || null);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase()); // Normalize search term
  };
  const filteredCustomers = customers.filter((customers) =>
    customers.name.toLowerCase().includes(searchTerm)
  );
  const handleSubmit = async (e:any) =>{
    e.preventDefault();
    const dealerId = companySelected?.id;
    const customerId = customerSelected?.id;
    const sellerId = userId
    try {
      const res = await fetch(`${api}/create-doc`, {
        method : "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          dealerId,
          customerId,
          sellerId
        })
      })
      const data = await res.json()
      const docId = data.data.docId
      if(docId){
        router.push(`/crm-app/accoutings/${docId}`)
      }
      // console.log(docId)
    } catch (error : Error | any) {
      throw new Error("Something went wrong", error)
    }
  }
  // ! DEBUG
  // console.log("Customer data selected is", customerSelected);
  // console.log("Company data selected is", companySelected);
  return (
    <div className="flex flex-col justify-start gap-4">
      <form action="" onSubmit={handleSubmit}>
      {/* <button onClick={confirmCreateDocs}>confirmCreateDocs</button> */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700 font-medium">
          เลือกผู้ขาย:
        </label>
        <select
          onChange={handleSelectChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          defaultValue={"companyValue"}
        >
          <option value={"companyValue"}>เลือกบริษัทผู้ขาย</option>
          {companies.map((company, i) => (
            <option key={i} value={company.company_name}>
              {company.company_name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        {/* //? Customer */}
        <label className="text-sm text-gray-700 font-medium">
          ค้นหาลูกค้า:
        </label>
        <div className="relative">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
            placeholder="ค้นหาบริษัท | ชื่อ | นามสกุล"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {/* Display filtered customers */}
      {searchTerm && (
        <div>
          {filteredCustomers.map((customer, index) => (
            <div key={index} onClick={() => setCustomerSelected(customer)}>
                <p className="text-md font-medium">{customer.name}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between">
        <Button variant={"destructive"}>ยกเลิก</Button>
        <Button className="bg-blue-700" type="submit">สร้างเอกสารใบเสนอราคา</Button>
        
      </div>
      </form>
    </div>
  );
}
