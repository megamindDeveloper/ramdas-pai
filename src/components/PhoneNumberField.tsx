"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // default styles

export default function PhoneNumberField() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div className="w-full max-w-xs">
      <PhoneInput
        international
        defaultCountry="IN" // default India
        value={value}
        onChange={setValue}
        placeholder="Enter phone number"
        className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#8a6c4d]"
      />
      <p className="text-xs text-gray-500 mt-2">
        Format: +971 50 123 4567, +44 7123 456789
      </p>
    </div>
  );
}
