import React from "react"

type customPara = {
    children:React.ReactNode,
    className?: string
};
export const CustomHead = ({children, className}:customPara)=>{
    return(
        <h3 className={`${className ? className: "text-peach text-center lg:text-left"} lg:text-[42px]`}>{children}</h3>
    )
}
export const CustomPara = ({children, className}:customPara)=>{
    return(
        <p className={`text-[12px] lg:text-[38px] leading-(38px) font-normal ${className ? className : "text-peach text-center lg:text-justify"}`}>{children}</p>
    )
}