import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/SignUp";
import { CustomizePage } from "./pages/Customize";
import Cart from "./pages/Cart";
import { CheckoutPage } from "./pages/Checkout";
import AboutPage from "./pages/About";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signUp" element={<SignupPage />} />
          <Route path="customize" element={<CustomizePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<Orders />} />

        </Route>
      </Routes>
    </>
  );
};

export default App;
