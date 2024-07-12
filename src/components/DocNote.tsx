'use client'
import React from "react";
import { DocNoteInForm } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";


interface DocNoteProps {
    docNoteData : DocNoteInForm | null
}


const DocNote = ({docNoteData}:DocNoteProps) => {
    const [note , setNote] = React.useState<DocNoteInForm | undefined>()
    React.useEffect(()=>{
        setNote(docNoteData ?? undefined)
    },[docNoteData])


    const lineBreaksConvert = (content: string | undefined) => {
        if (!content) {
            return null;
        }
        return content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };


if(docNoteData){{
    return (
        <div className="text-sm font-semibold text-red-500/90 mt-5">
        {lineBreaksConvert(note?.content ?? "")}
        </div>
    ) 
}
}
return (
    <div className="flex flex-col items-start gap-4 mt-2">
        <Skeleton className="w-[300px] h-[100px]"/>
    </div>
)
}

export default DocNote;