import {  type ButtonHTMLAttributes, type PropsWithChildren } from "react"
import { useMacCheck } from "../../lib/global/global"



type CustomBlueBtn = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
export const CustomBlueBtn = ({children,...props}:CustomBlueBtn) =>{
    const isMac = useMacCheck();
    return(
        <button {...props} className="bg-lightBlue shadow-shadow1 rounded-4xl px-3 py-1 cursor-pointer"><span className={`${isMac ? "mt-1": "mb-[4px]"}`}>{children}</span></button>
    )
}

export const CustomBlueImgBtn = ({children,...props}:CustomBlueBtn) =>{
const isMac = useMacCheck();
    return(
        <button {...props} className="bg-lightBlue shadow-shadow1 rounded-4xl px-1 py-1 lg:pl-3 cursor-pointer w-fit flex items-center"><span className={`pl-3 text-xs lg:text-xl ${isMac ? "mt-1": "mb-[4px]"}`}>{children}</span> <img className="pl-4" src="/icons/right-arrow.svg" /></button>
    )
}