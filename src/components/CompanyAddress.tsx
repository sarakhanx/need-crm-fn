"use client";

import React from "react";
import { CompanyInForm, DocsInForm } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";

interface CompanyProps {
  companyData: CompanyInForm | null;
  documentData: DocsInForm | null;
}

export default function CompanyAddress({
  companyData,
  documentData,
}: CompanyProps) {
  const [company, setCompany] = React.useState<CompanyInForm | undefined>({
    logo: "",
    name: "",
    comAddress1: "",
    comAddress2: "",
    comTel: "",
    comEmail: "",
    comVat: "",
  });
  const [doc, setDoc] = React.useState<DocsInForm | undefined>({
    id: "",
    createdAt: "",
    tel: "",
    email: "",
  });
  React.useEffect(() => {
    setDoc(documentData ?? undefined);
    setCompany(companyData ?? undefined);
  }, [documentData, companyData]);

  if (documentData || companyData) {
    return (
      <div>
        <div className="w-full flex justify-between">
          <div className="flex-col justify-between prompt-semibold">
            <img src={`${company?.logo}`} alt="logo" className="w-24" />
            <p className="text-sm">{company?.name}</p>
            <p className="text-xs text-muted-foreground font-light">
              {company?.comAddress1}
            </p>
            <p className="text-xs text-muted-foreground font-light">
              {company?.comAddress1}
            </p>
            <p className="text-xs text-muted-foreground font-light">
              {company?.comEmail}
            </p>
            <p className="text-xs text-muted-foreground font-light">
              {company?.comTel}
            </p>
            <p className="text-xs text-muted-foreground font-light">
              <strong>VAT&nbsp;:&nbsp;</strong>
              {company?.comVat}
            </p>
          </div>
          <div className="flex justify-between prompt-semibold">
            <div className="flex-col justify-start">
              <p className="text-xs text-muted-foreground font-light">
                <strong>เลขที่เอกสาร&nbsp;:&nbsp;</strong>
                {doc?.id}
              </p>
              <p className="text-xs text-muted-foreground font-light">
                <strong>วันที่&nbsp;:&nbsp;</strong>
                {doc?.createdAt}
              </p>
              <p className="text-xs text-muted-foreground font-light">
                <strong className="font-semibold">Tel&nbsp;:&nbsp;</strong>
                {doc?.tel}
              </p>
              <p className="text-xs text-muted-foreground font-light">
                <strong>Email&nbsp;:&nbsp;</strong>
                {doc?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-between gap-4">
        <div className="space-y-2">
      <Skeleton className="w-[100px] h-[100px] rounded-full" />
      <Skeleton className="w-[150px] h-[10px]" />
      <Skeleton className="w-[150px] h-[10px]" />
        </div>
        <div className="space-y-2 items-end">
      <Skeleton className="w-[150] h-[20px]" />
      <Skeleton className="w-[150px] h-[10px]" />
      <Skeleton className="w-[150px] h-[10px]" />
        </div>
    </div>
  );
}
