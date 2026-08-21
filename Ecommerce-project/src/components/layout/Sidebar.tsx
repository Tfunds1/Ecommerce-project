import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/logos/logo.png";
import homeIcon from "../../assets/icons/ri_home-5-fill.png";
import exploreIcon from "../../assets/icons/ri_apps-2-line.png";
import cartIcon from "../../assets/icons/ri_shopping-cart-line.png";
import offersIcon from "../../assets/icons/ri_discount-percent-line.png";
import wishlistIcon from "../../assets/icons/ri_heart-3-line.png";
import userLineIcon from "../../assets/icons/ri_user-line.png";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import SignInModal from "../auth/SignInModal";

type NavItem = {
  label: string;
  icon: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: "Home", icon: homeIcon, path: "/" },
  { label: "Explore", icon: exploreIcon, path: "/explore" },
  { label: "Cart", icon: cartIcon, path: "/cart" },
  { label: "Offers", icon: offersIcon, path: "/offers" },
  { label: "Wishlist", icon: wishlistIcon, path: "/wishlist" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <aside className="sticky top-0 flex h-screen w-[99px] shrink-0 flex-col items-center border-r border-gray-100 px-[16px] py-[24px]">
      <img src={logo} alt="UD Stores" className="h-[40px] w-[54px]" />

      <div className="mt-[28px] h-px w-[67px] bg-[#E5E5E5]" />

      <nav className="mt-10 flex flex-col items-center gap-[32px]">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className="relative flex flex-col items-center gap-1.5"
          >
            {({ isActive }) => (
              <>
                <img
                  src={item.icon}
                  alt=""
                  className={`h-[24px] w-[24px] transition-[filter,opacity] ${
                    isActive
                      ? "opacity-100 [filter:brightness(0)_saturate(100%)]"
                      : "opacity-60"
                  }`}
                />
                {item.label === "Cart" && itemCount > 0 && (
                  <span className="absolute -top-1.5 right-[-1px] flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#EF4444] text-[11px] font-[500] leading-[16px] tracking-[0.5px] text-white">
                    {itemCount}
                  </span>
                )}
                <span
                  className={`font-['DM_Sans'] text-[14px] leading-[20px] ${
                    isActive
                      ? "font-semibold text-[#171717]"
                      : "font-medium text-[#525252]"
                  }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {user ? (
        <button
          type="button"
          onClick={() => navigate("/account")}
          className="mt-auto flex cursor-pointer flex-col items-center gap-1.5"
        >
          <div className="flex h-[40px] w-[40px] border border-[#E5E5E5] items-center justify-center rounded-full bg-[#F5F5F5] font-['DM_Sans'] text-[23px]  text-[#525252]">
            F
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setAuthOpen(true)}
          className="mt-auto flex cursor-pointer flex-col items-center gap-1.5"
        >
          <img src={userLineIcon} alt="" className="w-[24px] h-[24px]" />
          <span className="font-['DM_Sans'] text-sm font-[400] text-[#525252] leading-[20px]">
            Sign in
          </span>
        </button>
      )}

      {authOpen && <SignInModal onClose={() => setAuthOpen(false)} />}
    </aside>
  );
}
