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
    net: string;
  }

  export interface Document {
    DocId: string;
    id: string;
    createdAt: string;
    doc_createdAt: string;
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
    net:string
    company_logo_path:string
  }

  export interface DeleveryNotes {
    id : number
    image :  any | null
    detail : string
    price : number
    qty : number
  }

export interface FormContent {
  id : number,
  content : string,
  qty : number,
  price : number,
  discount? : number, //ส่วนลด
  amount : number, //สำหรับยอดรวม
  total : number,
  article? : string, //รหัสสินค้า
  totalToText? : any
}

export interface CompanyInForm {
  name : string,
  comAddress1 : string,
  comAddress2 : string,
  comTel : string
  comVat : string
  logo? : any | null
  comEmail? : string
}

export interface DocsInForm {
id : string,
createdAt? : string | null,
tel? : string | null,
email? : string | null,
}

export interface CustomerData {
  name? : string,
  address1? : string
  address2? : string
  tel? : string
  vat? : string
  note? : string
}

export interface DocNoteInForm {
  content? : string | null
}