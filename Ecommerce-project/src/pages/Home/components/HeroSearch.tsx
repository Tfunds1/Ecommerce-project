import logoIcon from "../../../assets/logos/logo 2.svg";
import SearchInput from "../../../components/search/SearchInput";

export default function HeroSearch() {
  return (
    <section className="mx-auto flex w-full max-w-[1341px] flex-col items-center px-[44px] pb-[48px] pt-[120px]">
      <div className="flex w-full max-w-[600px] flex-col items-center gap-5 text-center">
        <img src={logoIcon} alt="" className="h-[49px] w-[68px]" />

        <h1 className="max-w-[481px] font-['DM_Sans'] text-[32px] leading-[40px] tracking-[-0.05em] text-[#171717]">
          What can I find for your <span className="font-bold">home</span>{" "}
          today?
        </h1>

        <SearchInput />
      </div>
    </section>
  );
}
