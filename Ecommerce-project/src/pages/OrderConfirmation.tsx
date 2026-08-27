export default function OrderComfirmation() {
  return (
    <div className="max-w-[1440]">
      <div className="py-[64px] px-[200px]">
        <div className="flex flex-col gap-[16px] items-center justify-center">
          <h1 className="font-[600] font-semibold text-[32px] leading-[40px] tracking-[-0.05em] text-[#171717]">
            Thank you for your purchase!
          </h1>
          <p className="font-[400] text-xl leading-[24px] text-[#262626]">
            An order confirmation has been sent to markjones@gmail.com
          </p>
          <p className="font-[400] text-[20px] leading-[28px]">
            Your order number is{" "}
            <span className="text-[#404040] font-semibold">1294</span>
          </p>
        </div>
      </div>
    </div>
  );
}
