import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../context/AuthContext";
import SearchInput from "../../components/search/SearchInput";

const ACCOUNT_LINKS = [
  { to: "/account/personal-details", label: "Personal details", end: true },
  { to: "/account/orders", label: "Orders" },
  { to: "/account/recently-viewed", label: "Recently viewed" },
  { to: "/account/wishlist", label: "Wishlist" },
  { to: "/account/addresses", label: "Addresses" },
  { to: "/account/saved-cards", label: "Saved cards" },
];

export default function AccountLayout() {
  const { signOut } = useAuth();

  return (
    <div className=" flex min-h-screen bg-white">
      <Sidebar />

      <main className=" mx-auto max-w-[1336px] min-h-[900px] px-[120px] py-[64px]">
        <div className="flex max-w-[1090px] gap-[64px]">
          <div className="flex w-[222px] flex-col gap-[32px]">
            <h1 className="text-[28px] font-semibold leading-[36px] text-[#171717]">
              My Account
            </h1>

            <nav className="flex flex-col gap-[16px]">
              {ACCOUNT_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `p-[8px] text-sm ${
                      isActive
                        ? "font-semibold text-[#171717]"
                        : "text-[#525252] hover:text-[#171717]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="w-[206px] border-t border-[#E5E5E5]" />

            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="flex cursor-pointer p-[8px]           text-sm text-[#525252] hover:text-[#171717]"
            >
              Sign Out
            </button>
          </div>

          <div className="flex-1">
            <Outlet />
          </div>
        </div>
        <div className="fixed  bottom-10 left-1/2 -translate-x-1/2 ">
          <SearchInput />
        </div>
      </main>
    </div>
  );
}
