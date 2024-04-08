"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Maxwidth from "@/components/MaxWidth";
import SearchComponent from "@/components/Search";
import useAuth from "@/lib/hooks/useAuth";
import Companies from "@/components/accoutings-components/Companies";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomerRegister from "@/components/accoutings-components/CustomerRegister";
import CreateQuotation from "@/components/accoutings-components/CreateQuotation/CreateQuotation";
// import { useUserSession } from "@/lib/hooks/authHooks/useUserSession";

export default function Page() {
  // const {userSession} = useUserSession();
  // const user = userSession?.token
  // console.log("user token =", user);
  useAuth();
  return (
    <Maxwidth>
  <SearchComponent />
  <div className="my-8">
    <div className="flex flex-col justify-center mb-6">
      <h1 className="prompt-bold text-center text-2xl">ระบบออกเอกสาร</h1>
      <p className="text-sm prompt-light text-muted-foreground text-center">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae id delectus, dicta nulla amet quidem veniam perspiciatis doloribus laudantium aliquam?
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Companies Register</CardTitle>
          <CardDescription className="text-sm">ลงทะเบียนบริษัทผู้ขาย เป็นส่วนหนึ่งในการจัดการหัวบิลในส่วนของบริษัท</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <div className="text-center">
                <Button className="w-full shadow-md">เพิ่มบริษัทผู้ขาย</Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <Companies />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"ghost"}>ปิดหน้าต่าง</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Customer Register</CardTitle>
          <CardDescription className="text-sm">ลงทะเบียนลูกค้าในนามบุคคล หรือบริษัทเพื่อสร้าง LEAD หรือบันทึกข้อมูลของลูกค้า</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <div className="text-center">
                <Button className="w-full shadow-md">เพิ่มข้อมูลลูกค้า</Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <CustomerRegister />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"ghost"}>ปิดหน้าต่าง</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Create Quotation</CardTitle>
          <CardDescription className="text-sm">สร้างเอกสารใบเสนอราคา</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <div className="text-center">
                <Button className="w-full shadow-md">สร้างใบเสนอราคา</Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <CreateQuotation />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"ghost"}>ปิดหน้าต่าง</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  </div>
</Maxwidth>
  );
}