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
      <div className="container mx-auto">
          <div className=" flex fixed top-0  w-full p-4 h-screen bg-[rgba(0,0,0,0.5)] inset-0 z-40 flex-col items-center justify-center">
  <div className="relative bg-peach3 w-full max-w-6xl max-h-[700px] rounded-xl shadow-lg overflow-hidden flex flex-col gap-15 xl:gap-30 md:flex-row">
             <div className="">
               <img src="/popup-creative.svg" className="hidden lg:block"  />
                  <button
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setShowPopup(false)}
              >
                <CircleX className="text-blue" />
              </button>
             </div>
              <div className="w-full max-w-2xl px-4 py-5 xl:px-20 flex flex-col justify-around">
              {!registerSwitch &&   <LoginSwitcher switchToRegister={()=>setRegisterSwitch(true)}  />}
              {registerSwitch && <Register switchToLogin={()=>setRegisterSwitch(false)} />}
            </div>
          </div>
          </div>
      </div>
    );
  }
