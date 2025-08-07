
import { PopInput, PopupLabel, PopupMainHeading } from "src/components/form/Popup";
import { DisplayFormErrors } from "src/lib/errors";
import {  FormEvent, useState } from "react";
import { FormBlackBtn } from "src/components/buttons/Button";
import { ApiTypeError, ApiTypeStatus } from "src/lib/types/api";
import { environment } from "src/lib/env";
import { apiRequest } from "src/lib/api";
import ForgotVerify from "../verify/forgot/ForgotVerify";

interface FormType{
    email:string;
    cf_turnstile_response:number | null
}
export default function ForgotPassword(){
    const [formData,setFormData] = useState<FormType>({
      email:"",
      cf_turnstile_response:12412
    })
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]> | undefined>(undefined);
    const [forgotVerifyScreen,setForgotVerifyScreen] = useState(false);
      // Submit Register Data
      const submitData = async (e: FormEvent) => {
          e.preventDefault();
          setErrors(undefined);
          setLoader(true);
          try {
            const { data, error } = await apiRequest<ApiTypeStatus>(
              `${environment.API_PROD}forget-password`,
              {
                body: JSON.stringify(formData),
                method: "POST",
              }
            );
      
            if (error) throw error;
      
            if (data?.status === "success") {
              sessionStorage.setItem("registerOTPData",JSON.stringify(data.data))
              setForgotVerifyScreen(true);
              setLoader(false)
            }
          } catch (err: unknown) {
            const error = err as ApiTypeError;
            console.log(error,"err")
            if (typeof error?.errors === "object") {
              setErrors(error.errors);
            } else {
              alert(error?.message || "Something went wrong");
            }
          }
        }; 

        if(forgotVerifyScreen) return <ForgotVerify />

    return(
      <div>
         <PopupMainHeading
                content={{
                  heading: "Forgot Your Password?",
                  subHeading: "Enter your email to receive a link and create a new password.",
                }}
              />
 
        <form className="grid gap-4" onSubmit={submitData}>
                    <div className="grid">
                      <PopupLabel content="Email Address" />
                      <PopInput
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                      />
                      <DisplayFormErrors name="email" errors={errors} />
                    </div>
                   <FormBlackBtn
                               type="submit"
                               content={loader ? "Reseting Password" : "Reset Password"}
                             />
        </form>
             </div>
    )
}