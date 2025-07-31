"use client";
import React, { FormEvent, useState } from "react";
import {
  PopInput,
  PopCountryCode,
  PopupMainHeading,
} from "src/components/form/Popup";
import { FormBlackBtn } from "src/components/buttons/Button";
import { environment } from "src/lib/env";
import { ApiTypeError, ApiTypeStatus } from "src/lib/types/api";
import { apiRequest } from "src/lib/api";
import { DisplayFormErrors } from "src/lib/errors";
import LoginVerify from "../verify/login/LoginVerify";

type PropData = {
  switchToEmail: () => void;
  //disable below content in verify screen
  successVerifyScreen:(val:boolean) => void;
};

export default function LoginPhone({ switchToEmail,successVerifyScreen }: PropData) {
  const [verifyScreen, setVerifyScreen] = useState(false);
  const [phoneData, setPhoneData] = useState({
    phone: "",
    phone_code: "91",
    phone_country: "IN",
    cf_turnstile_response: "1234",
  });
  const [errors, setErrors] = useState<Record<string, string[]> | undefined>();
  const [loader, setLoader] = useState(false);

  const submitData = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(undefined);
    setLoader(true);
    try {
      const { data, error } = await apiRequest<ApiTypeStatus>(
        `${environment.API_PROD}login`,
        {
          body: JSON.stringify(phoneData),
          method: "POST",
        }
      );

      if (error) throw error;

      if (data?.status === "success") {
        sessionStorage.setItem(
          "registerOTPData",
          JSON.stringify({ ...phoneData, isLogin: true })
        );
        setVerifyScreen(true);
        successVerifyScreen(true);
      }
    } catch (err: unknown) {
      const error = err as ApiTypeError;
      console.log(error,"err")
      if (typeof error?.errors === "object") {
        setErrors(error.errors);
      } else {
        alert(error?.message || "Something went wrong");
      }
    } finally {
      setLoader(false);
    }
  };

  if (verifyScreen) return <LoginVerify  />;
  console.log(phoneData,"sd")

  return (
    <div>
      <PopupMainHeading
        content={{
          heading: "Login with Mobile",
          subHeading: "Enter your phone number to continue learning.",
        }}
      />

      <form onSubmit={submitData} className="w-full grid gap-5">
        <div className="grid">
          <div className="flex gap-2">
            <PopCountryCode
              onChange={({ country_code, phone_country }:{country_code:string,phone_country:string}) => {
                setPhoneData((prev) => ({
                  ...prev,
                  country_code,
                  phone_country,
                }));
              }}
            />
            <PopInput
              className="w-full"
              placeholder="Enter your phone number"
              type="tel"
              name="phone"
              value={phoneData.phone}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
                setPhoneData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          </div>
          <DisplayFormErrors errors={errors} name="phone" />
        </div>

        <div className="flex flex-col gap-3 items-end">
          <FormBlackBtn
            type="submit"
            content={loader ? "Sending..." : "Send Code"}
          />
        </div>
      </form>
    </div>
  );
}
