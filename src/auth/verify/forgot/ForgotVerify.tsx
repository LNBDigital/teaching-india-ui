import { FormEvent, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import ResetPassword from "src/auth/forgot-password/ResetPassword";
import { FormBlackBtn } from "src/components/buttons/Button";
import { FormOtpInput, FormResendOtp } from "src/components/form/OtherFormInput";
import { PopupMainHeading } from "src/components/form/Popup";
import { apiRequest } from "src/lib/api";
import { environment } from "src/lib/env";
import { DisplayFormErrors } from "src/lib/errors";
import { ApiTypeError, ApiTypeStatus } from "src/lib/types/api";

// Types
interface FormData {
  phone_code: string;
  phone_country: string;
  phone: string;
  type: string;
}

interface OtpData {
  otp: string;
  phone: string;
  cf_turnstile_response:number;
}


export default function ForgotVerify() {
  const [formData, setFormData] = useState<FormData>({
    phone_code: "",
    phone_country: "",
    phone: "",
    type: "whatsapp",
  });

  const [otpData, setOtpData] = useState<OtpData>({
    otp: "",
    phone: "",
    cf_turnstile_response:1223
  });

  const [resenOtpVal, setResendOtpVal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]> | undefined>(undefined);
  const [newErrors, setNewErrors] = useState<Record<string, string[]> | undefined>(undefined);
  const [success,setSuccess] = useState(false);
    //setLoader
  const [loader,setLoader] = useState(false);
  useEffect(() => {
    const objectData = sessionStorage.getItem("registerOTPData");
    if (objectData) {
      try {
        const parseData = JSON.parse(objectData);
        const data = parseData.data ?? parseData;
        setFormData({
          phone_code: data.phone_code ?? "",
          phone_country: data.phone_country ?? "",
          phone: data.phone ?? "",
          type: "whatsapp",
        });
        setOtpData((prev) => ({ ...prev, phone: data.phone ?? "" }));
        setResendOtpVal(false);
      } catch (error) {
        console.error("Parsing error:", error);
      }
    }
  }, []);

  const submitOTP = async (e: FormEvent) => {
    e.preventDefault();
     setLoader(true);
    setErrors(undefined);
    if (!otpData.phone || !otpData.otp) return alert("Missing phone or OTP");

    try {
      const { data, error } = await apiRequest<ApiTypeStatus>(
        `${environment.API_PROD}forget-password/verify/phone`,
        {
          body: JSON.stringify(otpData),
          method: "POST",
        }
      );
      if (error) throw error;
      if (data && data.status === "success") {
         setLoader(false);
              sessionStorage.clear();
              
              setSuccess(true);
      }
    } catch (error: unknown) {
      const err = error as ApiTypeError;
        setLoader(false);
      if (typeof err.errors === "object") {
        setErrors(err.errors as Record<string, string[]>);
      } else {
        alert(err.message || "Something went wrong");
      }
    }
  };

  const resendOtp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await apiRequest<ApiTypeStatus>(
        `${environment.API_PROD}resend-otp`,
        {
          body: JSON.stringify(formData),
          method: "POST",
        }
      );

      if (error) throw error;

      if (data && data.status === "success") {
        console.log("OTP sent successfully");
        setResendOtpVal(true);
      }
    } catch (error: unknown) {
      const err = error as ApiTypeError;
      if (typeof err.errors === "object") {
        setNewErrors(err.errors as Record<string, string[]>);
      } else {
        alert(err.message || "Something went wrong");
      }
    }
  };

  if (success) return <ResetPassword phone={formData.phone} />

  return (
    <div className="flex flex-col gap-3 items-center my-10">
      <p className="text-(--blackColor5) text-[18px] text-center flex flex-col gap-1 items-center ">
        Enter the 4-digit code sent to your <br />
        <span className="flex items-center gap-2">
          <FaWhatsapp className="text-green-600 w-6 h-full" /> Whatsapp Number
        </span>
      </p>
      <span>
        +{formData.phone_code + " " + formData.phone}
      </span>

      <div>
        <form
          onSubmit={submitOTP}
          className="flex flex-col gap-5 w-sm items-center justify-center border-t-1 border-(--borderColor1) pt-4"
        >
          <input type="hidden" name="phone" value={otpData.phone ?? ""} />
          <DisplayFormErrors name="phone" errors={errors} />

          <FormOtpInput
            length={4}
            onOtpSubmit={(otp: string) =>
              setOtpData((prev) => ({ ...prev, otp }))
            }
          />
          <DisplayFormErrors name="otp" errors={errors} />

          <FormBlackBtn content={loader ?  "Verifying..." : "Verify & Continue"  } />
        </form>
      </div>

      <FormResendOtp onSubmit={resendOtp} value={resenOtpVal}>
        <input value={formData.phone_code} type="hidden" />
        <input value={formData.phone} type="hidden" />
        <input value={formData.type} type="hidden" />
      </FormResendOtp>
      <DisplayFormErrors name="phone" errors={newErrors} />
    </div>
  );
}
