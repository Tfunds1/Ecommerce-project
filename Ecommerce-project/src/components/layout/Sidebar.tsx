import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/logos/logo.png";
import homeline from "../../assets/icons/ri_home-5-line.svg";
import homeFill from "../../assets/icons/ri_home-5-fill.svg";
import exploreLine from "../../assets/icons/ri_apps-2-line.svg";
import exploreFill from "../../assets/icons/ri_apps-2-fill.svg";
import cartLine from "../../assets/icons/ri_shopping-cart-line.svg";
import cartFill from "../../assets/icons/ri_shopping-cart-fill.svg";
import offersLine from "../../assets/icons/ri_discount-percent-line.svg";
import offersFill from "../../assets/icons/ri_discount-percent-fill.svg";
import heartLine from "../../assets/icons/ri_heart-3-line.svg";
import heartFill from "../../assets/icons/ri_heart-3-fill.svg";
import userLineIcon from "../../assets/icons/ri_user-line.svg";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import SignInModal from "../auth/SignInModal";
import SignUpModal from "../auth/SignUpModal";
import ResetPasswordModal from "../auth/ResetPasswordModal";

type NavItem = {
  label: string;
  iconLine: string;
  iconFill: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: "Home", iconLine: homeline, iconFill: homeFill, path: "/" },
  {
    label: "Explore",
    iconLine: exploreLine,
    iconFill: exploreFill,
    path: "/explore",
  },
  { label: "Cart", iconLine: cartLine, iconFill: cartFill, path: "/cart" },
  {
    label: "Offers",
    iconLine: offersLine,
    iconFill: offersFill,
    path: "/offers",
  },
  {
    label: "Wishlist",
    iconLine: heartLine,
    iconFill: heartFill,
    path: "/wishlist",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState<
    "signin" | "signup" | "reset" | null
  >(null);

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
                  src={isActive ? item.iconFill : item.iconLine}
                  alt=""
                  className=" transition-opacity"
                />
                {item.label === "Cart" && itemCount > 0 && (
                  <span className="absolute -top-1.5 right-[-1px] flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#EF4444] text-[11px] font-[500] leading-[16px] tracking-[0.5px] text-white">
                    {itemCount}
                  </span>
                )}
                <span
                  className={`text-[14px] leading-[20px] ${
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
          <div className="flex h-[40px] w-[40px] border border-[#E5E5E5] items-center justify-center rounded-full bg-[#F5F5F5]           text-[23px]  text-[#525252]">
            F
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setAuthOpen("signin")}
          className="mt-auto flex cursor-pointer flex-col items-center gap-1.5"
        >
          <img src={userLineIcon} alt="" className="w-[16px] h-[21px]" />
          <span className="          text-sm font-[400] text-[#525252] leading-[20px]">
            Sign in
          </span>
        </button>
      )}

      {authOpen === "signin" && (
        <SignInModal
          onClose={() => setAuthOpen(null)}
          onSignUp={() => setAuthOpen("signup")}
          onForgotPassword={() => setAuthOpen("reset")}
        />
      )}

      {authOpen === "signup" && (
        <SignUpModal
          onClose={() => setAuthOpen(null)}
          onSignIn={() => setAuthOpen("signin")}
        />
      )}

      {authOpen === "reset" && (
        <ResetPasswordModal
          onClose={() => setAuthOpen(null)}
          onSignIn={() => setAuthOpen("signin")}
        />
      )}
    </aside>
  );
}
