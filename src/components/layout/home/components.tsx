import type React from "react"
import { useMacCheck } from "../../../lib/global/global"

type rulesBox = {
    spanContent:number,
    headingContent:string,
    subHeading:string
}

export const RulesBox = ({spanContent=1,headingContent="Teaching that ignites curosity",subHeading="lorem23"}:rulesBox)=>{
    const isMac = useMacCheck();
    return(
        <div className="flex flex-col max-w-[640px] bg-white p-[25px] rounded-xl">
            <div className="flex items-center gap-2 lg:gap-6">
                <span className={`w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] text-md lg:text-[24px] flex items-center justify-center bg-blue text-white rounded-full tracking-[2px] ${isMac ? "lg:pt-1": "lg:pb-2 "}`}>0{spanContent}</span>
                <h4 className="text-xl lg:text-[23px] max-w-[28rem]">{headingContent}</h4>
            </div>
            <div>
                <p className="text-md lg:text-[14.5px]  py-5">{subHeading}</p>
            </div>
        </div>
    )
}

type potentialBox = {
    spanNumb:React.ReactNode,
    content:React.ReactNode,
}

export const PotentialBox = ({spanNumb=9,content="lorem"}:potentialBox)=>{
    const isMac = useMacCheck();
    return(
        <div className="bg-blue2 p-4 rounded-3xl border-2 border-black flex flex-col gap-5 w-[240px] shadow-shadow2">
            <span className="text-[56px]">{spanNumb}</span>
            <span className="text-[32px] leading-[10px]">Class</span>
            <p className="line-clamp-1">{content}</p>
            <hr className="w-full border-[1.2px] border-black" />
            <button className={`bg-blue p-2 text-white rounded-[20px] border border-black ${isMac}`}>Start Now</button>
        </div>
    )
}