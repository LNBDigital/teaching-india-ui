import React, { useState } from "react";
import { FormBlackBtn } from "src/components/buttons/Button.js";
import {
  PopCountryCode,
  PopInput,
  PopPassword,
  PopSelect,
  PopupLabel,
  PopupMainHeading,
} from "src/components/form/Popup.jsx";
import { apiRequest } from "src/lib/api.js";
import { environment } from "src/lib/env.js";
import { DisplayFormErrors } from "src/lib/errors.js";
import LoginVerify from "../verify/login/LoginVerify.js";
import {
  DemoFormBoards,
  DemoFormClasses,
} from "src/components/form/DemoFormSelect.jsx";

type Props = {
  switchToLogin?: () => void;
};

type RegistrationResponse = {
  status: "success" | "error";
  [key: string]: unknown;
};

type ErrorResponse = {
  errors?: Record<string, string[]> | string;
  message?: string;
};

export default function Register({ switchToLogin }: Props) {
  const gender = ["male", "female"];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    phone_code: "91",
    phone_country: "IN",
    gender: "",
    password: "",
    board_id: null,
    class_id: null,
    school_name: "",
    father_name: "",
    mother_name: "",
    cf_turnstile_response: 12232,
  });
  const [errors, setErrors] = useState<Record<string, string[]> | undefined>(
    undefined
  );
  const [verifyScreen, setVerifyScreen] = useState(false);
  //setLoader
  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await apiRequest<RegistrationResponse>(
        `${environment.API_PROD}registration`,
        {
          body: JSON.stringify(formData),
          method: "POST",
        }
      );
      if (error) throw error;
      if (data && data.status === "success") {
        sessionStorage.setItem(
          "registerOTPData",
          JSON.stringify({ ...data, isLogin: false })
        );
        setVerifyScreen(true);
      }
    } catch (err: unknown) {
      const error = err as ErrorResponse;
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

  if (verifyScreen) return <LoginVerify />;

  return (
    <div className="max-h-[550px] pt-15 overflow-scroll">
      <PopupMainHeading
        content={{
          heading: "Create Your Free Account",
          subHeading: "Join thousands of students on their journey to success.",
        }}
      />
      <form onSubmit={submitData} className="w-full grid gap-3">
        <div className="grid">
          <PopupLabel content="Gender" />
          <div className="relative">
            <PopSelect select={formData.gender || "Select"}>
              {gender.map((gen) => (
                <li
                  key={gen}
                  className="capitalize"
                  onClick={() => setFormData({ ...formData, gender: gen })}
                >
                  {gen}
                </li>
              ))}
            </PopSelect>
            <DisplayFormErrors name="gender" errors={errors} />
          </div>
        </div>
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
            <PopCountryCode
              onChange={({ country_code, phone_country }) => {
                setFormData((prev) => ({
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
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <DisplayFormErrors name="email" errors={errors} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="grid">
            <PopupLabel content="Boards" />
            <DemoFormBoards
              onChange={(item: { id: number }) =>
                setFormData((prev) => ({ ...prev, board_id: item.id }))
              }
            />
            <DisplayFormErrors name="board_id" errors={errors} />
          </div>
          <div className="grid">
            <PopupLabel content="Class" />
            <DemoFormClasses
              onChange={(item: { id: number }) =>
                setFormData((prev) => ({ ...prev, class_id: item.id }))
              }
            />
            <DisplayFormErrors name="class_id" errors={errors} />
          </div>
        </div>
        <div className="grid">
          <PopupLabel content="School Name" />
          <PopInput
            placeholder="Enter your school name"
            name="school_name"
            value={formData.school_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, school_name: e.target.value }))
            }
          />
          <DisplayFormErrors name="school_name" errors={errors} />
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
        <div className="grid">
          <PopupLabel content="Create Password" />
          <PopPassword
            value={formData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <DisplayFormErrors name="password" errors={errors} />
        </div>
        <FormBlackBtn content="Create Account" />
      </form>

      <div className="mt-10">
        <p className="w-full text-[18px] text-center">
          Already have an account ?
          <button
            className="text-blue pl-2 cursor-pointer"
            onClick={switchToLogin}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
