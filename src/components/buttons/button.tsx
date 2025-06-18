import { type ButtonHTMLAttributes, type PropsWithChildren } from "react"

type CustomBlueBtn = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
export const CustomBlueBtn = ({children,...props}:CustomBlueBtn) =>{
    return(
        <button {...props} className="bg-lightBlue shadow-shadow1 rounded-4xl px-3 py-1 tracking-[2px] cursor-pointer">{children}</button>
    )
}

export const CustomBlueImgBtn = ({children,...props}:CustomBlueBtn) =>{
    return(
        <button {...props} className="bg-lightBlue shadow-shadow1 rounded-4xl px-2 py-1 pl-3 tracking-[2px] cursor-pointer w-fit flex items-center"><span className="mt-1">{children}</span> <img className="pl-4" src="/icons/right-arrow.svg" /></button>
    )
}