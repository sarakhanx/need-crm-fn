'use client'
import Maxwidth from "@/components/MaxWidth";
import useAuth from "@/lib/hooks/useAuth";

export default function Page() {
    useAuth();
  return (
    <Maxwidth>
      <div>
        <h1>Calendar</h1>
      </div>
    </Maxwidth>
  );
}
