
import { PopInput, PopupLabel } from "src/components/form/Popup";
import { DisplayFormErrors } from "src/lib/errors";
import {  useState } from "react";
import { SimpleBlueBtn } from "src/components/buttons/Button";

interface FormType{
    email:string;
    cf_turnstile_response:number | null
}
export default function ResetPassword(){
    const [formData,setFormData] = useState<FormType>({
      email:"",
      cf_turnstile_response:12412
    })
    const [errors, setErrors] = useState<Record<string, string[]> | undefined>(undefined);
      // Submit Register Data

    return(

        <form className="grid gap-4">
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
                   <SimpleBlueBtn>Reset Password</SimpleBlueBtn>
        </form>
    )
}