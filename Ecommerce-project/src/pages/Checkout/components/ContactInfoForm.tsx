import { useState } from "react";
import type { ContactInfo } from "../type";

const inputCls =
  "h-12 w-full rounded-[10px] border border-[#A3A3A3] px-4 placeholder:text-base placeholder:text-[#A3A3A3] outline-none focus:border-[#171717]";
const labelCls = "text-sm text-[#171717]";

type ContactInfoFormProps = {
  initialValue: ContactInfo;
  onSave: (value: ContactInfo) => void;
};

export default function ContactInfoForm({
  initialValue,
  onSave,
}: ContactInfoFormProps) {
  const [draft, setDraft] = useState<ContactInfo>(initialValue);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelCls}>
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={draft.email}
          onChange={(e) => setDraft({ ...draft, email: e.target.value })}
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className={labelCls}>
          Mobile Number
        </label>
        <input
          id="phone"
          type="tel"
          value={draft.phone}
          onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
          className={inputCls}
        />
      </div>

      <button
        type="button"
        onClick={() => onSave(draft)}
        className="mt-1 cursor-pointer self-start rounded-full bg-[#171717] px-6 py-2.5 text-sm font-medium text-white"
      >
        Save
      </button>
    </div>
  );
}
