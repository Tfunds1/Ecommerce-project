import type React from "react";

type CheckoutStepShellProps = {
  number: number;
  title: string;
  isOpen: boolean;
  summary: React.ReactNode[];
  onEdit: () => void;
  children?: React.ReactNode; // the open form
};

export default function CheckoutStepShell({
  number,
  title,
  isOpen,
  summary,
  onEdit,
  children,
}: CheckoutStepShellProps) {
  return (
    <div>
      <div className="flex items-start gap-[16px]">
        <div className="flex h-6 items-center">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5E5E5] text-xs font-medium text-[#171717]">
            {number}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-[18px] font-[400] leading-[24px] text-[#262626]">
            {title}
          </h2>
          {!isOpen && (
            <button
              type="button"
              onClick={onEdit}
              className="cursor-pointer font-[500] text-sm font-medium text-[#262626] underline"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {!isOpen && summary.length > 0 && (
        <div className="mt-1 flex flex-col gap-0.5 pl-[36px]">
          {summary.map((line, i) => (
            <p key={i} className="text-sm text-[#525252]">
              {line}
            </p>
          ))}
        </div>
      )}

      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}
