"use client";
import React, { FormEvent, useState } from "react";
import {
  PopupLabel,
  PopInput,
  PopPassword,
  PopupMainHeading,
} from "src/components/form/Popup";
import { FormBlackBtn } from "src/components/buttons/Button";
import { environment } from "src/lib/env";
import { ApiTypeError, ApiTypeStatus } from "src/lib/types/api";
import { DisplayFormErrors } from "src/lib/errors";
import { apiRequest } from "src/lib/api";

interface FnType {
  switchToPhone: () => void;
}

export default function LoginEmail({ switchToPhone }: FnType) {
  const [emailData, setEmailData] = useState({
    email: "",
    password: "",
    cf_turnstile_response: "",
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
          body: JSON.stringify(emailData),
          method: "POST",
        }
      );

      if (error) throw error;

      if (data?.status === "success") {
        if (data.data?.token) {
          sessionStorage.setItem("authToken", data.data.token);
        }

        if (data?.redirect_to) {
          window.location.href = `/${data.redirect_to}`;
        }
      }
    } catch (err: unknown) {
      const error = err as ApiTypeError;
      if (typeof error?.errors === "object") {
        setErrors(error.errors);
      } else {
        alert(error?.message || "Something went wrong");
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <PopupMainHeading
        content={{
          heading: "Welcome Back",
          subHeading: "Access your learning dashboard using your email.",
        }}
      />

      <form onSubmit={submitData} className="w-full grid gap-5">
        <div className="grid">
          <PopupLabel content={"Email"} />
          <PopInput
            value={emailData.email}
            type="email"
            name="email"
            onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
              setEmailData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter your email"
          />
          <DisplayFormErrors errors={errors} name="email" />
        </div>

        <div className="grid">
          <PopupLabel content={"Password"} />
          <PopPassword
            value={emailData.password}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
              setEmailData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <DisplayFormErrors errors={errors} name="password" />
        </div>

        <div className="flex flex-col gap-3 items-end">
          <span className="cursor-pointer text-sm text-brown-500">
            Forgot Password?
          </span>
          <FormBlackBtn
            type="submit"
            content={loader ? "Logging in..." : "Login"}
          />
        </div>
      </form>
    </div>
  );
}
