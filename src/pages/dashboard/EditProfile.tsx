import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ErrorResponse } from "react-router-dom";
import { FormBlackBtn } from "src/components/buttons/Button";
import {
  DemoFormBoards,
  DemoFormClasses,
} from "src/components/form/DemoFormSelect";
import { FormGender } from "src/components/form/DemoFormStatic";
import {
  PopCountryCode,
  PopInput,
  PopupLabel,
  PopupMainHeading,
} from "src/components/form/Popup";
import { apiRequest } from "src/lib/api";
import { environment } from "src/lib/env";
import { DisplayFormErrors } from "src/lib/errors";
import { getPrefetchData } from "src/lib/getApi";
import { ApiTypeError, ApiTypeStatus } from "src/lib/types/api";

interface Register {
  name: string;
  email: string;
  phone: string;
  phone_code: string;
  father_name: string;
  mother_name: string;
  cf_turnstile_response: string | number;
}

export default function EditProfile() {
  const [formData, setFormData] = useState<Partial<Register>>({});
  const [errors, setErrors] = useState<Record<string, string[]> | undefined>(
    undefined
  );
  const [loader,setLoader]= useState(false);
    // prefill data
  useEffect(()=>{
    getPrefetchData<Register>("user/edit").then((data)=> setFormData(data));
  },[])

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true)
    try {
      const { data, error } = await apiRequest<ApiTypeStatus>(
        `${environment.API_PROD}user/edit`,
        {
          body: JSON.stringify(formData),
          method: "PUT"
        },
        {
             "Authorization" : `Bearer ${Cookies.get("authToken")}`
        }
      );
      if (error) throw error;
      if (data && data.status === "success") {
        window.alert("success");
        setLoader(false)
      }
    } catch (err: unknown) {
      const error = err as ApiTypeError;
      console.log(error, "err");
      setLoader(false);
      if (typeof error?.errors === "object") {
        setErrors(error.errors as Record<string, string[]>);
      } else if (typeof error?.errors === "string") {
        alert(error.errors);
      } else if (error?.message) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="md:p-10 flex justify-center">
        <form onSubmit={submitData} className="w-full md:max-w-3/4 grid gap-5 bg-white1 shadow-xl p-10 rounded-md">
        <PopupMainHeading content={{ heading: "Edit your profile ", subHeading: "Right below" }} />
          <div className="grid">
            <PopupLabel content="Full Name" />
            <PopInput
              placeholder="Enter your full name"
              name="name"
              maxlength={32}
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <DisplayFormErrors name="name" errors={errors} />
          </div>
          <div className="grid">
            <PopupLabel content="Phone Number" />
            <div className="flex justify-between gap-2">
             <PopInput
                className="w-18"
                placeholder="code"
                type="tel"
                name="phone"
                value={"+" + formData.phone_code}
                disabled
                onChange={()=>null}
              />
              <PopInput
                className="w-full"
                placeholder="Enter your phone number"
                type="tel"
                name="phone"
                value={formData.phone}
                disabled
                onChange={()=>null}
              />
            </div>
            <DisplayFormErrors name="phone" errors={errors} />
          </div>
          <div className="grid">
            <PopupLabel content="Email Address" />
            <PopInput
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              disabled
              onChange={()=>null}
            />
            <DisplayFormErrors name="email" errors={errors} />
          </div>

          <div className="grid">
            <PopupLabel content="Father Name" />
            <PopInput
              placeholder="Enter your father name"
              name="father_name"
              value={formData.father_name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, father_name: e.target.value }))
              }
            />
            <DisplayFormErrors name="father_name" errors={errors} />
          </div>
          <div className="grid">
            <PopupLabel content="Mother Name" />
            <PopInput
              placeholder="Enter your mother name"
              name="mother_name"
              value={formData.mother_name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, mother_name: e.target.value }))
              }
            />
            <DisplayFormErrors name="mother_name" errors={errors} />
          </div>
          <FormBlackBtn content={loader ? "Submitting" :"Submit"} />
        </form>
      </div>
    </div>
  );
}
