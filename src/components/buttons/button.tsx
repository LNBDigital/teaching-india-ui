import {  type ButtonHTMLAttributes, type PropsWithChildren } from "react"
import { useMacCheck } from "../../lib/global/global"



type CustomBlueBtn = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
export const CustomBlueBtn = ({children,...props}:CustomBlueBtn) =>{
    const isMac = useMacCheck();
    return(
        <button {...props} className="bg-lightBlue shadow-shadow1 rounded-4xl px-3 py-1 cursor-pointer lg:tracking-[0.06em]"><span className={`${isMac ? "mt-1": "mb-[4px]"}`}>{children}</span></button>
    )
}

export const CustomBlueImgBtn = ({children,...props}:CustomBlueBtn) =>{
const isMac = useMacCheck();
    return(
        <button {...props} className="bg-lightBlue shadow-shadow1 rounded-4xl px-2 py-1 lg:w-[265px] lg:pl-3 cursor-pointer w-fit justify-end flex items-center"><span className={`pl-4 text-xs lg:text-xl lg:tracking-[0.06em] ${isMac ? "mt-1": "mb-[4px]"}`}>{children}</span> <img className="pl-5" src="/icons/right-arrow.svg" /></button>
    )
}