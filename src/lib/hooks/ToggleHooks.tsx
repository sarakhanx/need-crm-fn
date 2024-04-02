"use client";

import React from "react";

const useToggleHooks = (initState : any) => {
    const [isOpen , setIsOpen] = React.useState(initState);
    const ref = React.useRef<HTMLDivElement | null> (null);
    const isCliked = (e : any) => {
        if(ref.current && !ref.current.contains(e.target)){
            setIsOpen(false);
        }
    }
    React.useEffect(()=>{
        document.addEventListener('mousedown', isCliked);
        return ()=>{
            document.removeEventListener('mousedown', isCliked);
            
        }
    },[])
    return [isOpen , setIsOpen , ref]
};

export default useToggleHooks