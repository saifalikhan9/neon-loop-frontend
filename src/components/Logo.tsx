import { cn } from "@/lib/utils";
import { Link } from "react-router";
import logo from "@/assets/NeonLoop.png"

function Logo() {
  return (
    <Link
      to={"/"}
      className={cn(
        "flex items-center relative ",
        "after:[] after:w-0 after:h-0.5 ",
        "after:absolute after:left-0 after:bottom-0",
        "after:transition-all after:duration-300",
        "after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full "
      )}
    >
      <span className="text-xl relative cursor-pointer">
       <img className="size-13  my-px" src={logo} alt="" />
        {/* <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-500"></span> */}
      </span>
    </Link>
  );
}

export default Logo;