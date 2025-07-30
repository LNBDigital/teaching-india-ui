  import { useEffect, useState } from "react";
  import { CircleX } from "lucide-react";
  import LoginSwitcher from "./login/LoginSwitcher";
import Register from "./registration/Register";

  export default function Page({setShowPopup}:{setShowPopup:(value:boolean)=>void}) {
  const [registerSwitch, setRegisterSwitch] = useState(false);
  useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [registerSwitch]);
    return (
      <div className="container mx-a">
          <div className=" flex absolute top-0  w-full h-screen bg-[rgba(0,0,0,0.5)] inset-x-0 z-40 flex-col items-center justify-center">
            <div className="relative bg-peach3 max-w-[1000px] max-h-[800px] rounded-xl shadow-(--shadow1) w-[90%] overflow-y-auto flex justify-between items-center">
             <div className="">
               <img src="/popup-creative.svg"  />
                  <button
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setShowPopup(false)}
              >
                <CircleX className="text-blue" />
              </button>
             </div>
              <div className="w-full max-w-2xl px-20 flex flex-col justify-end">
              {!registerSwitch &&   <LoginSwitcher switchToRegister={()=>setRegisterSwitch(true)}  />}
              {registerSwitch && <Register switchToLogin={()=>setRegisterSwitch(false)} />}
            </div>
          </div>
          </div>
      </div>
    );
  }
