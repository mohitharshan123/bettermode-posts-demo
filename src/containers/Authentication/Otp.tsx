import { useRef, useState } from "react";

const OTP_LENGTH = 6;

const Otp: React.FC<{ onOtpComplete: (otp: string) => void }> = ({
  onOtpComplete,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );

  const inputRefs = Array.from({ length: OTP_LENGTH }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    setOtpValues(newOtpValues);

    if (newOtpValues.join("").length === OTP_LENGTH) {
      onOtpComplete(newOtpValues.join(""));
    }

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }

    if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
      <div className="flex gap-x-5">
        {Array.from({ length: OTP_LENGTH }, (_, index) => (
          <input
            autoFocus={index === 0}
            key={index}
            ref={inputRefs[index]}
            className="font-bold text-2xl h-10 block w-[38px] text-center border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            type="text"
            placeholder="○"
            maxLength={1}
            value={otpValues[index]}
            onChange={(e) => handleChange(index, e)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
    </div>
  );
};

export default Otp;
