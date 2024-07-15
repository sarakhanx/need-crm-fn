'use client'
import React from "react"

const CreateVatHeaderComponent = ({CustomerAddress , DocumentData}: any) => {
    const [address , setAddress] = React.useState<any>()
    const [docData , setDocData] = React.useState<any>()

    React.useEffect(()=>{
        setAddress(CustomerAddress)
        setDocData(DocumentData)
        // console.log(CustomerAddress)
    },[CustomerAddress, DocumentData])

    return (
        <>
        <div className="flex flex-col justify-between">
        <div className="flex justify-between">
            <div className="flex-col whitespace-pre-wrap">
            {address?.logo ? (<div className="w-72"><img src={`${address?.logo}`} className="rounded-md overflow-hidden"/></div>) : (address?.address)}
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex justify-between"><h1>เลขที่&nbsp;:&nbsp;</h1><p>{docData?.id}</p></div>
                <div className="flex justify-between"><h1>วันที่&nbsp;:&nbsp;</h1><p>{docData?.date}</p></div>
            </div>
        </div>
        </div>
        </>
    )
}

export default CreateVatHeaderComponent;