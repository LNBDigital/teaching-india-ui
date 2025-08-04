import React, {  type ButtonHTMLAttributes, type PropsWithChildren } from "react"
import { useMacCheck } from "../../lib/global/global"
import { Link, LinkProps } from "react-router-dom";


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

export const FormBlackBtn = ({ content, type="submit", ...props }:CustomBlueBtn) => {
  return (
    <button
      className="bg-black w-full py-2 rounded-sm mt-4 text-white text-[16px] font-semibold hover:bg-black cursor-pointer"
      type={type}
      {...props}
    >
      {content}
    </button>
  );
};

interface SimpleBluBtnProps extends Omit<LinkProps, 'to'> {
  link: string;
  className?: string;
  children: React.ReactNode;
}

export const SimpleBluBtn: React.FC<SimpleBluBtnProps> = ({
  link,
  className = '',
  children,
  ...props
}) => {
  return (
    <Link
      to={link}
      {...props}
      className={`bg-lightBlue5 py-1 px-16 text-white rounded-md ${className}`}
    >
      {children}
    </Link>
  );
};