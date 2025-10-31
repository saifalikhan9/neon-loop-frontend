import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BounceLoader } from "@/components/ui/laoder";
import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router";

function Layout() {
  const { isLoading } = useAuth();

  return (
    <div className="min-h-screen  bg-white selection:bg-black selection:text-white">
      {isLoading ? (
        <BounceLoader />
      ) : (
        <>
          <Header />
          <div className="min-h-screen flex-1 items-center justify-center bg-gray-50 py-8">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Layout;
