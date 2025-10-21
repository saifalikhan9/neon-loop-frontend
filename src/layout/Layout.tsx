import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Header />
      <div className="py-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
