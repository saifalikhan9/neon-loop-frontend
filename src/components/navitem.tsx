import type React from "react";
import { Link } from "react-router";

function Navitem({ to, navTitle,key }: { to: string; navTitle: string,key :React.Key| string | number }) {
  return (
    <Link
    key={key}
      to={`${to}`}
      className="text-sm text-gray-600 hover:text-black transition-all duration-300 relative group  after:[] after:w-0 after:h-px after:bg-black hover:after:w-full after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300"
    >
      {navTitle}
      {/* <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span> */}
    </Link>
  );
}

export default Navitem;
