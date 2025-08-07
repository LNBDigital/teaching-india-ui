import { useEffect, useState } from "react";
import { FormSelect } from "./FormSelect";
import { getHelperData } from "src/lib/getApi";

export const PopupMainHeading = ({ content = { heading, subHeading } }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <p className="text-[24px] font-medium text-black6">{content.heading}</p>
      <span>{content.subHeading}</span>
    </div>
  );
};

export const PopupBelowContent = ({
  btn1 = { text1: "Default 1", text2: "Click here",
    props: {
      onClick: () => {}
    } },
  btn2 = { text1: "Default 2", text2: "Click here too" ,
    props: {
      onClick: () => {}
    }}
}) => {
  return (
    <div className="w-full mt-7">
      <div className="relative flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-black">OR</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <p  className="w-full text-[22px] my-7 text-center">
        {btn1.text1}
        <button {...btn1.props} className="text-blue pl-2 cursor-pointer">{btn1.text2}</button>
      </p>
        <p  className="w-full text-[18px] text-center">
        {btn2.text1}
        <span {...btn2.props} className="text-blue pl-2 cursor-pointer">{btn2.text2}</span>
      </p>
    </div>
  );
};

export const Input = ({ type = "text", name, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      className="text-[16px] bg-(--whiteColor1) placeholder:text-(--blackColor5) border-1 rounded-(--border1) border-blue p-2"
      placeholder={placeholder}
      required
    />
  );
};

export const Select = ({}) => {
  return (
    <div className="flex relative">
      <select
        required
        className="p-2 border-1 appearance-none rounded-(--border1) border-blue text-[16px] w-full text-(--blackColor5)"
      >
        <option value="select">Select</option>
        <option value="1">Value1</option>
        <option value="2">Value2</option>
      </select>
      <img
        className="absolute cursor-pointer pointer-events-none right-3 bottom-2"
        src="/icons/dropdown.svg"
        alt="svg"
      />
    </div>
  );
};

/* Components for Popup Signup (login and register) */

export const PopupLabel = ({ content, className = "" }) => {
  return (
    <label className={`font-medium text-[17px] text-black ${className}`}>
      {content}
    </label>
  );
};

export const PopInput = ({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  disabled=false,
  className = "",
  ...props
}) => {
  const handleKeyDown = (e) => {
    if (
      !/[0-9]/.test(e.key) &&
      ![
        "Backspace",
        "ArrowLeft",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Delete",
        "Enter",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  };
  return (
    <input
      required
      value={value}
      onChange={onChange}
      onKeyDown={type === "tel" ? handleKeyDown : undefined}
      className={`${className} ${disabled ? "bg-gray-100" : "bg-white"} text-black2 pl-2 border-1 placeholder:text-[18px] placeholder:text-black5 placeholder:font-extralight border-lightBlue2 py-2 rounded-lg font-normal text-[18px]`}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      {...props}
    />
  );
};

export const PopPassword = ({ value, placeholder="Create password", onChange, name = "password" }) => {
  const [showpswd, setShowPswd] = useState(false);
  return (
    <div className="relative">
      <PopInput
        className="w-full"
        placeholder={placeholder}
        name={name}
        type={showpswd ? "text" : "password"}
        value={value}
        onChange={onChange}
      />
      <button type="button" onClick={() => setShowPswd((prev) => !prev)}>
        <img
          className="absolute top-3 right-4 cursor-pointer"
          src={showpswd ? "/icons/eye.svg" : "/icons/hiddeneye.svg"}
          alt="Show Password"
        />
      </button>
    </div>
  );
};

export const PopSelect = ({
  className = "border-[1.5px] border-blue rounded-lg",
  textClassName = "",
  ulClassname = "",
  children,
  select = {},
  text = "select",
}) => {
  const [open, setOpen] = useState(false);
  function handleToggle() {
    setOpen(!open);
  }
  return (
    <div className="relative w-full">
      <div
        onClick={handleToggle}
        className={`cursor-pointer w-full text-black bg-white pl-2 py-2 font-normal text-[18px] ${className} `}
      >
        <span className={`capitalize ${textClassName}`}>{select || text}</span>
        <img
          className="absolute pointer-events-none right-3 bottom-1"
          src="/icons/dropdown.svg"
          alt="svg"
        />
      </div>
      {open && (
        <ul
          onClick={() => setOpen(false)}
          className={`absolute capitalize formselect flex flex-col gap-1 z-10 bg-white border-1 border-blue w-full p-2 cursor-pointer rounded-md ${ulClassname}`}
        >
          {children}
        </ul>
      )}
    </div>
  );
};

export const PopCountryCode = ({ onChange }) => {
  const [result, setResult] = useState([]);
  const [select, isSelect] = useState({
    phone_code: 91,
    phone_country: "IN",
  });
  useEffect(() => {
    getHelperData("phone-code").then((data) => setResult(data));
  }, []);

  useEffect(() => {
    onChange?.(select);
  }, [select]);

  const handleValue = (item) => {
    const updated = {
      phone_code: item.phoneCode,
      phone_country: item.iso2,
    };
    isSelect(updated);
  };
  return (
    <div className="w-[3cm] h-auto">
      <FormSelect
        select={`+${select.phone_code}` || "Select"}
      >
        {result.map((item, index) => {
          return (
            <li key={index} onClick={() => handleValue(item)}>
              +{item.phoneCode}
            </li>
          );
        })}
      </FormSelect>
    </div>
  );
};
