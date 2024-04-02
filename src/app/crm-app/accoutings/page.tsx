'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Maxwidth from "@/components/MaxWidth";
import SearchComponent from "@/components/Search";
import useAuth from "@/lib/hooks/useAuth";

export default function Page(){
    useAuth();
    return (
        <Maxwidth>
                <SearchComponent/>
            <div>
                <h1>Accountings</h1>
            </div>
        </Maxwidth>
    )
}