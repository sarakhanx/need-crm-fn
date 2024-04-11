export interface ParamsID {
  params: {
    id: string | number;
  };
}

export interface Customer {
  id: number;
  name: string;
  lastname: string;
  customer_email: string;
  customer_address: string;
  customer_mobile: string;
  company_name: string;
  company_contact: string;
  company_vat: string;
};
export interface Company  {
  id: number;
  company_name: string;
  company_address: string;
  company_vat_id: string;
  createdAt: string;
  company_contact: string;
};
export interface ContactData {
    [key: string]: string; // ระบุว่ามี key เป็น string และ value เป็น string เท่านั้น
  }
export  interface Errors {
    fieldErrors: {
      [field: string]: string[];
    };
  }
  export  interface Error {

    productErrors: {
      [field: string]: string[];
    };
  }
  export interface Product {
    Title: string;
    Size: string;
    Qty: string;
    Price: string;
    Discount: string;
    "Total Price": string;
  }

  export interface Document {
    id: string;
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
    customer_company_name: string;
    productsArray: Product[];
  }