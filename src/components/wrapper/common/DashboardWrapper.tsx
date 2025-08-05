import React from "react"

interface Type{
    changeBg?:boolean;
    heading:React.ReactNode;
    className?:string;
    children:React.ReactNode;
}

export default function DashboardWrapper({changeBg=false,heading,className,children}:Type){
return(
       <div className={`px-8 pb-15 container mx-auto ${changeBg ? "bg-peach2" : "bg-black"} ${className}`}>
            <h3 className={`uppercase text-2xl  md:text-[3rem] mt-15 mb-4 lg:my-15 border-b-2 border-black ${changeBg ? "text-black" : "text-peach2"} `}>{heading}</h3>
            {children}
        </div>
)
}