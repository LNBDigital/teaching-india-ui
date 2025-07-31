"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { apiRequest } from "src/lib/api";
import { environment } from "src/lib/env";
import { ApiTypeError, ApiTypeStatus } from "src/lib/types/api";
 import Cookies from "js-cookie";
import { PopCountryCode, PopInput } from "src/components/form/Popup";
import { FaWhatsapp } from "react-icons/fa6";
import { DisplayFormErrors } from "src/lib/errors";
import { FormOtpInput, FormResendOtp } from "src/components/form/OtherFormInput";
import { FormBlackBtn } from "src/components/buttons/Button";

// Types
interface FormData {
  user_id: string;
  phone_code: string;
  phone_country: string;
  phone: string;
  type: string;
}

interface OtpData {
  otp: string;
  phone: string;
  cf_turnstile_response: number;
}

export default function LoginVerify() {
  const [formData, setFormData] = useState<FormData>({
    user_id: "",
    phone_code: "",
    phone_country: "",
    phone: "",
    type: "whatsapp",
  });
  const [otpData, setOtpData] = useState<OtpData>({
    otp: "",
    phone: "",
    cf_turnstile_response: 1213
  });
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]> | undefined>(
    undefined
  );
  const [newErrors, setNewErrors] = useState<
    Record<string, string[]> | undefined
  >(undefined);
  //setLoader
  const [loader, setLoader] = useState(false);
  //function to open editphonenumber screen
  const [editPhone, setEditPhone] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  //show updatenumber
  useEffect(() => {
    const objectData = sessionStorage.getItem("registerOTPData");
    if (objectData) {
      try {
        const parseData = JSON.parse(objectData);
        const data = parseData.data ?? parseData;
        if (parseData.isLogin) {
          setIsLogin(parseData.isLogin);
        }
        setFormData({
          user_id: data.user_id ?? "",
          phone_code: data.phone_code ?? "",
          phone_country: data.phone_country ?? "",
          phone: data.phone ?? "",
          type: "whatsapp",
        });
        setOtpData((prev) => ({ ...prev, phone: data.phone ?? "" }));
        setOtpSuccess(false);
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
        `${environment.API_PROD}verify/phone`,
        {
          body: JSON.stringify(otpData),
          method: "POST",
        }
      );

      if (error) throw error;

      if (data && data.status === "success") {
        if (data.data.token) {
          Cookies.set("authToken", data.data.token);
          
        }
        if (data.redirect_to) {
          setLoader(false);
          window.location.href = `/${data.redirect_to}`;
        }

        return; // optional, but clarifies early exit
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

const updateNumber = async (e: FormEvent) => {
  e.preventDefault();
  // Prevent update if phone hasn't changed
  if (otpData.phone === formData.phone) {
    setEditPhone(false);
    return;
  }
  try {
    const endpoint = isLogin
      ? `${environment.API_PROD}login`
      : `${environment.API_PROD}registration`;

    const method = isLogin ? "POST" : "PUT";

    const { data, error } = await apiRequest<ApiTypeStatus>(endpoint, {
      body: JSON.stringify(formData),
      method,
    });

    if (error) throw error;

    if (data && data.status === "success") {
      setOtpData((prev) => ({ ...prev, phone: formData.phone }));
      setEditPhone(false);
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


  const resendOtp = async (e: React.FormEvent) => {
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
        setOtpSuccess(true);
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

  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-(--blackColor5) text-[18px] text-center flex flex-col gap-1 items-center ">
        Enter the 4-digit code sent to your <br />
        <span className="flex items-center gap-2">
          <FaWhatsapp className="text-green-600 w-6 h-full" /> Whatsapp Number
        </span>
      </p>

      <span>
        {editPhone ? (
          <>
            <form
              onSubmit={updateNumber}
              className="flex flex-col items-center justify-center max-w-[15cm]"
            >
              <div className="flex max-h-12">
                <PopCountryCode
                  onChange={(item: {
                    country_code: string;
                    phone_country: string;
                  }) =>
                    setFormData((prev) => ({
                      ...prev,
                      country_code: item.country_code,
                      phone_country: item.phone_country,
                    }))
                  }
                />
                <PopInput
                  placeholder="Enter your number"
                  className="w-full rounded-tr-xl rounded-br-xl rounded-none"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>
              <div className="inline-flex gap-3 py-3">
                <button type="submit" className="text-(--brownColor)">
                  Submit
                </button>
                <button type="button" onClick={() => setEditPhone(false)}>
                  Cancel
                </button>
              </div>
            </form>
            <div className="flex justify-center">
              <DisplayFormErrors name="phone" errors={newErrors} />
            </div>
          </>
        ) : (
          <>
            {`+${formData.phone_code} ${formData.phone}`}
            <button
              onClick={() => setEditPhone(true)}
              className={`pl-4 text-(--brownColor)`}
            >
              Edit
            </button>
          </>
        )}
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

          <FormBlackBtn
            type="submit"
            content="Verify & Continue"
          />
        </form>
      </div>

      <FormResendOtp onSubmit={resendOtp} value={otpSuccess}>
        <input value={formData.phone_code} type="hidden" />
        <input value={formData.phone} type="hidden" />
        <input value={formData.type} type="hidden" />
      </FormResendOtp>

      <span className="text-(--blackColor5) text-[16px] text-center">
        Your phone number is only used for verification and <br /> will remain
        confidential.
      </span>
    </div>
  );
}
