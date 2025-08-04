import React from "react"

interface Type{
    changeBg?:boolean;
    heading:string;
    className?:string;
    children:React.ReactNode;
}

export default function DashboardWrapper({changeBg=false,heading,className,children}:Type){
return(
       <div className={`px-8 py-15 h-screen container mx-auto ${changeBg ? "bg-peach2" : "bg-black"} ${className}`}>
            <h3 className={`uppercase text-2xl md:text-3xl xl:text-[3rem] mb-2 xl:mb-8 ${changeBg ? "text-black" : "text-peach2"} `}>{heading}</h3>
            {children}
        </div>
)
}