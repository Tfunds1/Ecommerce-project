import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults/SearchResults";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import AccountLayout from "./pages/Account/AccountLayout";
import PersonalDetails from "./pages/Account/PersonalDetails";
import RecentlyViewed from "./pages/Account/RecentlyViewed";
import Wishlist from "./pages/Account/Wishlist";
import Addresses from "./pages/Account/Addresses";
import SavedCards from "./pages/Account/SavedCards";
import OffersGrid from "./pages/Offers/OffersGrid";
import { WishlistProvider } from "./pages/Wishlist/WishlistContext";
import WishlistGrid from "./pages/Wishlist/WishlistGrid";
import ExploreGrid from "./pages/Explore/ExploreGrid";
import OrderComfirmation from "./pages/OrderConfirmation";
// import ResetPasswordModal from "./components/auth/ResetPasswordModal";

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/explore" element={<ExploreGrid />}></Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route path="personal-details" element={<PersonalDetails />} />
            <Route path="orders" />
            <Route path="recently-viewed" element={<RecentlyViewed />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="saved-cards" element={<SavedCards />} />
          </Route>
          <Route path="/offers" element={<OffersGrid />} />
          <Route path="/wishlist" element={<WishlistGrid />} />
          <Route path="/order-confirmation" element={<OrderComfirmation />} />
          {/* <Route path="/reset-password" element={<ResetPasswordModal />} /> */}
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;
