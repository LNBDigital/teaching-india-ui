import { useEffect, useRef, useState } from "react";
import { getHelperData } from "src/lib/getApi";
import { FormSelect } from "./FormSelect";

export const FormResendOtp = ({ children, onSubmit, value }) => {
  const [count, setCount] = useState(30);

  useEffect(() => {
    if (count === 0) return;
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count, value]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (count === 0 && !value) {
      setCount(30); // reset counter only on submit when allowed
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-2 mt-4"
    >
      <button
        className={count ? "text-gray-400" : "cursor-pointer text-(--brownColor)"}
        type="submit"
        disabled={count > 0 || value}
      >
        {count > 0 ? `Resend OTP ${count}` : "Resend OTP"}
      </button>
      {children}
    </form>
  );
};

export const FormOtpInput = ({ length = 4, onOtpSubmit, ...props }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    onOtpSubmit(newOtp.join(""));
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        onOtpSubmit(newOtp.join(""));
      } else if (index > 0) {
        inputRef.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onOtpSubmit(newOtp.join(""));
      }
    }
  };

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  return (
    <div className="flex gap-5">
      {otp.map((value, index) => (
        <input
          {...props}
          key={index}
          ref={(ref) => (inputRef.current[index] = ref)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onChange={(e) => handleChange(index, e)}
          className="w-[50px] h-[50px] border-2 text-center rounded border-(--borderColor1) focus:border-blue-500 outline-none"
          autoComplete="one-time-password"
        />
      ))}
    </div>
  );
};

export const PopBoards = ({ onChange }) => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState({
    id: null,
    name: ""
  });

  useEffect(() => {
    getHelperData("boards").then((data) => setData(data));
  }, []);

  const handler = (item) => {
    const id = item.board_id;
    const name = item.name;
    setUpdate({ id: id, name: name });
    onChange({ id: id, name: name });
  };

  return (
    <FormSelect select={update.name}>
      {data.map((item, index) => (
        <li key={item.board_id || index} onClick={() => handler(item)}>
          {item.name || item.board_id}
        </li>
      ))}
    </FormSelect>
  );
};