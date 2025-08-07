import React from "react"

interface Type{
    changeBg?:boolean;
    heading:React.ReactNode;
    className?:string;
    children:React.ReactNode;
}

export default function DashboardWrapper({changeBg=false,heading,className,children}:Type){
return(
       <div className={`pb-15 px-3 lg:px-18 ${changeBg ? "bg-peach2" : "bg-black"} ${className}`}>
        <div className="container mx-auto">
            <h3 className={`uppercase text-2xl  md:text-[42px] mt-15 mb-4 lg:my-15 border-b-2 border-black ${changeBg ? "text-black" : "text-peach2"} `}>{heading}</h3>
            {children}
        </div>
        </div>
)
}