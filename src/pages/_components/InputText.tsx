import React, { useRef, useImperativeHandle, forwardRef, useState } from "react";

interface InputTextProps {
  validateInput: (value: string) => boolean;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ validateInput }, ref) => {
    const textRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");

    // Expose the internal ref to the parent via the forwarded ref
    useImperativeHandle(ref, () => textRef.current as HTMLInputElement);

    const handleInputChange = () => {
      if (textRef.current) {
        const value = textRef.current.value;

        if (!validateInput(value)) {
          setError("This value is not in the database.");
        } else {
          setError("");
        }
      }
    };

    return (
      <div className="space-y-2">
        <div
          className={`w-[399px] h-[56px] flex items-center px-[16px] rounded-[10px] ${
            error
              ? "border-red-500 text-red-500"
              : "border-[#D9D9D9] text-[#9A9A9A]"
          }`}
        >
          <input
            ref={textRef}
            className="w-full text-[16px] leading-[24px] bg-transparent focus:outline-none focus:ring-0"
            type="text"
            placeholder="Enter username"
            onChange={handleInputChange}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    );
  }
);

export default InputText;
