"use client";
import { useState } from "react";
import LoginEmail from "./LoginEmail";
import LoginPhone from "./LoginPhone";
import { PopupBelowContent } from "src/components/form/Popup";

interface Type {
  switchToRegister: () => void;
}

export default function LoginSwitcher({ switchToRegister }: Type) {
  const [useEmailLogin, setUseEmailLogin] = useState(false);
  //for disable below content in verify screen
  const [disable,setDisable] = useState(false);

  return (
    <div>
      {useEmailLogin ? (
        <LoginEmail successVerifyScreen={()=>setDisable(true)} switchToPhone={() => setUseEmailLogin(false)} />
      ) : (
        <LoginPhone successVerifyScreen={()=>setDisable(true)} switchToEmail={() => setUseEmailLogin(true)} />
      )}

     {!disable && (
       <PopupBelowContent
        btn1={{
          text1: "Login with",
          text2: useEmailLogin ? "Phone" : "Email",
          props: {
            onClick: () => setUseEmailLogin((prev) => !prev),
          },
        }}
        btn2={{
          text1: "New to Elevia?",
          text2: "Create an Account",
          props: { onClick: switchToRegister },
        }}
      />
     ) }
    </div>
  );
}
