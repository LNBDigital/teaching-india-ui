import type React from "react"
import { CustomBlueBtn } from "./buttons/button"

type customLi = {
    children:React.ReactNode
}
export const CustomLinks = ({children}:customLi)=>{
    return(
    <li className="text-white">{children}</li>
    )
}
function Header() {

  return (
    <div className="bg-black px-14 py-10 mt-5 mx-5 rounded-t-xl sticky top-[0%] z-30">
      <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <img src="/home/logo.svg" />
        <ul className="flex gap-8">
       <CustomLinks >Home</CustomLinks>
        <CustomLinks >Courses</CustomLinks>
         <CustomLinks >Pricing</CustomLinks>
          <CustomLinks >About</CustomLinks>
        </ul>
        <CustomBlueBtn>Login</CustomBlueBtn>
      </div>
      </div>
    </div>
  )
}

export default Header;