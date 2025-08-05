import Cookies from "js-cookie"
import React, { ButtonHTMLAttributes, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

interface SideBarType{
    closeWrap:(param:boolean)=>void;

}

const SideBar:React.FC<SideBarType> = ({closeWrap}) =>{
    const navigation = useNavigate();
    const handleLogOut = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
       Cookies.remove("authToken");
        navigation("/");
    }
    const className= "hover:text-lightBlue4 cursor-pointer"
    return(
        <div className="flex z-10 flex-col items-start bg-white absolute right-8 top-17 py-4 pl-3 pr-8 rounded-md">
            <button className={className}>Edit Profile</button>
            <button onClick={handleLogOut} className={className}>Log Out</button>
        </div>
    )
}

export default function DashboardHeader(){
    const [showBar,setShowBar] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(()=>{
        const outsideHandler = (e:MouseEvent)=>{
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setShowBar(false);
            }
        }
        const scrollHandler = (e:Event)=>{
            e.preventDefault();
            if (window.scrollY > 30) {
                setShowBar(false)
            }
        }
        document.addEventListener("mousedown",outsideHandler);
        window.addEventListener("scroll",scrollHandler)
        return()=>{
             document.removeEventListener("mousedown",outsideHandler);
             window.removeEventListener("scroll",scrollHandler)
        };
    },[])

    return( 
        <div ref={ref} className="flex relative items-center bg-black justify-between py-4 px-8">
            <h3 className="font-temporary text-[26px] text-lightBlue4">elevia</h3>
            <h4 className="text-[18px] text-lightBlue4">Dashboard</h4>
            <button className="cursor-pointer" onClick={()=>setShowBar((prev)=>(!prev))} >
                <img className="w-10" src="/dashboard/home/user.png" />
            </button>
            {
                showBar &&  <SideBar closeWrap={()=>setShowBar(false)} />
            }
        </div>
    )
} 