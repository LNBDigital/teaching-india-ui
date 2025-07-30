import {  type ButtonHTMLAttributes, type PropsWithChildren } from "react"
import { useMacCheck } from "../../lib/global/global"
import ButtonLoader from "src/components/common/loader/ButtonLoader";



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

export const FormButtonWhite = ({ children, className = ``, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className={`border text-blue font-semibold border-blue px-2 py-2 flex items-center justify-center rounded-md gap-3 w-2/6 md:w-2/9 cursor-pointer ${className}`}
    >
      <img
        alt="image"
        src="/icons/left.svg"
        {...props}
      />
      {children}
    </button>
  );
};

export const FormButtonBlue = ({ textContent, className = ``, ...props }) => {
  return (
    <button
      className={`bg-blue text-(--whiteColor1) font-semibold px-2 py-2 flex items-center justify-center rounded-md gap-3 w-2/6 md:w-2/9 cursor-pointer ${className}`}
      {...props}
    >
      {textContent}
      <img alt="image" src="/icons/right.svg" />
    </button>
  );
};

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

export const SimpleBlueBtn = ({
  loader = false,
  className = "",
  children,
  ...props
}) => {
  return (
    !loader ? (
      <button
        {...props}
        type="submit"
        className={`bg-blue w-full p-2 rounded-md text-white uppercase cursor-pointer ${className}`}
      >
        {children}
      </button>
    ): (
      <ButtonLoader />
    )
  );
};
