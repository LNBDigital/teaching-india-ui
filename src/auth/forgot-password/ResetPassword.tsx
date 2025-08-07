import {
  PopPassword,
  PopupLabel,
  PopupMainHeading,
} from "src/components/form/Popup";
import { DisplayFormErrors } from "src/lib/errors";
import React, { FormEvent, useState } from "react";
import { FormBlackBtn } from "src/components/buttons/Button";
import { ApiTypeError, ApiTypeStatus } from "src/lib/types/api";
import { environment } from "src/lib/env";
import { apiRequest } from "src/lib/api";
import LoginSwitcher from "../login/LoginSwitcher";
import Register from "../registration/Register";

interface FormType {
  phone: number | string | null;
  password?: string;
  confirm_password?: string;
}
export default function ResetPassword({ phone }: FormType) {
  const [formData, setFormData] = useState<FormType>({
    phone: phone,
    password: "",
    confirm_password: "",
  });
  const [registerSwitch, setRegisterSwitch] = useState(false);
  console.log(formData, "sdd");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]> | undefined>(
    undefined
  );
  const [success, setSuccess] = useState(false);
  // Submit Register Data
  const submitData = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(undefined);
    setLoader(true);
    try {
      const { data, error } = await apiRequest<ApiTypeStatus>(
        `${environment.API_PROD}reset-password`,
        {
          body: JSON.stringify(formData),
          method: "POST",
        }
      );

      if (error) throw error;

      if (data?.status === "success") {
        setLoader(false);
        setSuccess(true);
      }
    } catch (err: unknown) {
      const error = err as ApiTypeError;
      console.log(error, "err");
      if (typeof error?.errors === "object") {
        setErrors(error.errors);
      } else {
        alert(error?.message || "Something went wrong");
      }
    }
  };
  if (success)
    return (
      <>
        {!registerSwitch && (
          <LoginSwitcher switchToRegister={() => setRegisterSwitch(true)} />
        )}
        {registerSwitch && (
          <Register switchToLogin={() => setRegisterSwitch(false)} />
        )}
      </>
    );
  return (
    <div>
      <PopupMainHeading
        content={{
          heading: "Forgot Your Password?",
          subHeading:
            "Enter your email to receive a link and create a new password.",
        }}
      />

      <form className="grid gap-4" onSubmit={submitData}>
        <div className="grid">
          <PopupLabel content="Create New Password" />
          <PopPassword
            value={formData?.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <DisplayFormErrors name="password" errors={errors} />
        </div>
        <div className="grid">
          <PopupLabel content="Re-Enter Password" />
          <PopPassword
            placeholder="Re-enter password"
            value={formData?.confirm_password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({
                ...prev,
                confirm_password: e.target.value,
              }))
            }
          />
          <DisplayFormErrors name="password" errors={errors} />
        </div>
        <FormBlackBtn
          type="submit"
          content={loader ? "Reseting Password" : "Reset Password"}
        />
      </form>
    </div>
  );
}
