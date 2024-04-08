import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import Maxwidth from "../../MaxWidth";
import { DataSelect } from "./DataSelect";
interface Errors {
    fieldErrors: {
      [field: string]: string[];
    };
  }

  

  const CreateQuotation= ()=>{
    return (
        <Maxwidth>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Create Quotation</CardTitle>
                    <CardDescription className="text-sm">เพิ่มหัวบิลใหม่</CardDescription>
                </CardHeader>
                <CardContent>
        <DataSelect/>
                </CardContent>
            </Card>
        </Maxwidth>
    )
  }

  export default CreateQuotation;