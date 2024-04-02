"use client";

import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useToggleHooks from "../../lib/hooks/ToggleHooks";
import { PanelRightOpen } from "lucide-react";


const MainSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen, ref] = useToggleHooks(false);



  
  return (
    <aside
      className={`flex flex-col justify-between h-screen bg-gray-900/50 transition-all ease-in-out duration-500 transform ${
        isOpen ? "w-48" : ""
      }`}
      ref={ref}
    >
      <div className="p-2 space-y-1">
        <PanelRightOpen
          className="focus:outline-none h-6 w-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <div>
          {isOpen && (
            <div>
              <Button
                variant={"ghost"}
                className={`w-full ${
                  pathname === "/crm-app"
                    ? "bg-blue-700 text-white font-bold"
                    : ""
                }`}
              >
                <Link href={"/crm-app"}>NEED CRMs Application</Link>
              </Button>
              <Button
                variant={"ghost"}
                className={`w-full ${
                  pathname === "/crm-app/dashboard"
                    ? "bg-blue-700 text-white font-bold"
                    : ""
                }`}
              >
                <Link href={"/crm-app/dashboard"}>Dashboard</Link>
              </Button>
              <Button
                variant={"ghost"}
                className={`w-full ${
                  pathname === "/crm-app/calendar"
                    ? "bg-blue-700 text-white font-bold"
                    : ""
                }`}
              >
                <Link href={"/crm-app/calendar"}>Calendar</Link>
              </Button>
              <Button
                variant={"ghost"}
                className={`w-full ${
                  pathname === "/crm-app/accoutings"
                    ? "bg-blue-700 text-white font-bold"
                    : ""
                }`}
              >
                <Link href={"/crm-app/accoutings"}>Accouting</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default MainSidebar;
