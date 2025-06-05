import type React from "react"

type rulesBox = {
    spanContent:number,
    headingContent:string,
    subHeading:string
}

export const RulesBox = ({spanContent=1,headingContent="Teaching that ignites curosity",subHeading="lorem23"}:rulesBox)=>{
    return(
        <div className="flex flex-col max-w-[640px] bg-white p-[25px] rounded-xl">
            <div className="flex items-center gap-6">
                <span className="px-[15px] py-[10px] text-[24px] bg-blue text-white rounded-full tracking-[3px]">0{spanContent}</span>
                <h4 className="text-[36px] leading-[48px] max-w-[28rem]">{headingContent}</h4>
            </div>
            <div>
                <p className="text-[24px] leading-[48px] py-5">{subHeading}</p>
            </div>
        </div>
    )
}

type potentialBox = {
    spanNumb:React.ReactNode,
    content:React.ReactNode,
}

export const PotentialBox = ({spanNumb=9,content="lorem"}:potentialBox)=>{
    return(
        <div className="bg-blue2 p-4 rounded-xl border-2 border-black flex flex-col gap-5 w-[240px] shadow-shadow2">
            <span className="text-[56px]">{spanNumb}</span>
            <span className="text-[32px] leading-[10px]">Class</span>
            <p className="line-clamp-1">{content}</p>
            <hr className="w-full border-[1.2px] border-black" />
            <button className="bg-blue p-2 text-white rounded-[20px] border border-black">Start Now</button>
        </div>
    )
}