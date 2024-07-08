'use client'

import Maxwidth from "../../../components/MaxWidth";
import useAuth from "@/lib/hooks/useAuth";

export default function Page() {
    useAuth();
    return (
        <Maxwidth>
            <div>
                <h1>Developer Portal</h1>
            </div>
        </Maxwidth>
    )
}