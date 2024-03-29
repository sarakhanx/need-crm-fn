import { cn } from "../lib/utils"
import { ReactNode } from "react"

const Maxwidth = ({
    className ,
    children
} : {
    className? : string | undefined | null ,
    children : ReactNode
}) =>{
    return <div className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-20',className
        )}>
            {children}
    </div>
}

export default Maxwidth