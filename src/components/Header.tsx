import { useCart } from "@/hooks/useCart";
import { Button } from "./ui/button";
import { ShoppingCart, Menu, User, X, Package2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Logo from "./Logo";
import Navitem from "./navitem";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const NavItems = [
  { title: "Customize", link: "/customize" },
  { title: "About", link: "/about" },
];

export function Header() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const { items } = useCart();
  const { logout, isAuthenticated } = useAuth();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Close menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
          !target.closest("[data-mobile-menu]") &&
          !target.closest("[data-menu-button]")
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NavItems.map((el, i) => (
              <Navitem key={i} to={el.link} navTitle={el.title} />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/cart")}
              className="relative group"
            >
              <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
              <span className="absolute inset-0 rounded-full bg-neutral-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
            </Button>
            {isAuthenticated && (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="relative group hidden sm:inline-flex"
              >
                <Link to={"/orders"}>
                  <Package2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute inset-0 rounded-full bg-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                </Link>
              </Button>
            )}
            {isAuthenticated ? (
              <Button
                size={"sm"}
                variant="destructive"
                className="hidden sm:inline-flex"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/login")}
                className="relative group hidden sm:inline-flex"
              >
                <User className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute inset-0 rounded-full bg-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
              </Button>
            )}

            <Button
              data-menu-button
              onClick={() => setOpen(!isOpen)}
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        data-mobile-menu
        className={`md:hidden absolute right-4 top-20 w-48 rounded-lg shadow-lg bg-white/95 backdrop-blur-lg border border-gray-200 overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-2">
          {NavItems.map((el) => (
            <Link
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              to={el.link}
              key={el.title}
              onClick={() => setOpen(false)}
            >
              {el.title}
            </Link>
          ))}
          <div className="border-t border-gray-200 my-2" />

          {isAuthenticated ? (
            <Button
              variant="destructive"
              className="mx-2 my-2"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="justify-start px-4"
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
            >
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
