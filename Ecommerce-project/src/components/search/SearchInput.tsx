import { useState } from "react";

import { useNavigate } from "react-router-dom";

import arrowUpIcon from "../../assets/icons/ri_arrow-up-long-line.svg";

import historyLineIcon from "../../assets/icons/ri_history-line.svg";

import searchIcon from "../../assets/icons/ri_search-line.svg";

const suggestions = [
  "Help me build a cozy bedroom",

  "Create a minimal skincare routine",

  "Deals under ₦100,000",
];

export default function SearchInput({
  className = "",
  showSuggestions = false,
}: {
  className?: string;
  showSuggestions?: boolean;
}) {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const runSearch = (term: string) => {
    const trimmed = term.trim();

    if (!trimmed) return;

    setIsOpen(false);

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className={`relative w-[568px] ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => {
          if (showSuggestions) {
            setIsOpen(true);
          }
        }}
        onBlur={() => {
          if (showSuggestions) {
            setIsOpen(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            runSearch(query);
          }
        }}
        placeholder="Search products..."
        className={`h-[68px] w-[568px] border-t border-l border-r border-[#E5E5E5] bg-white px-[24px] py-[10px] text-[18px] leading-[24px] text-[#171717] shadow-[0px_2px_4px_0px_#0000001A] outline-none placeholder:text-[18px] placeholder:text-[#A3A3A3] ${
          showSuggestions && isOpen
            ? "rounded-t-[34px] rounded-b-none"
            : "rounded-full"
        }`}
      />

      <button
        type="button"
        aria-label="Search"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => runSearch(query)}
        className="absolute right-2 top-1/2 flex h-[48px] w-[48px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#262626]"
      >
        <img
          src={showSuggestions && isOpen ? arrowUpIcon : searchIcon}
          alt=""
          className="h-[20px] w-[20px] brightness-0 invert"
        />
      </button>
      {showSuggestions && isOpen && (
        <div className="absolute z-10 flex w-full flex-col gap-[10px] overflow-hidden rounded-b-[24px] border-b border-l border-r border-[#E5E5E5] bg-white pb-[24px] pt-[8px] text-left shadow-[0px_10px_40px_-10px_#0000001A]">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setQuery(suggestion);
                runSearch(suggestion);
              }}
              className="flex w-full cursor-pointer items-center gap-3 px-5 py-2.5 text-sm text-[#404040] hover:bg-[#FAFAFA]"
            >
              <img src={historyLineIcon} alt="" className="w-[15px] h-[15px]" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
