import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { BounceLoader } from "@/components/ui/laoder";

export function LoginPage() {
  const { isLoading, login,isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(user, token);
  const location = useLocation();

  // Get the page user was trying to visit (default "/")
  const from = location.state?.from?.pathname || "/";
  console.log(from);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await login(email, password);
      navigate(`${from}`, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  if (isLoading) {
    return <BounceLoader/>
  }
  if (isAuthenticated) {
    return <Navigate to={from} replace /> 
  }



  return (
    <div className=" px-4 py-20">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="w-full mx-auto max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white border border-gray-200 p-8 group hover:border-pink-200 transition-all duration-300">
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-pink-500" />
              </div>
              <h1 className="text-3xl mb-2">Welcome Back</h1>
              <p className="text-sm text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-200 focus:border-pink-300 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-200 focus:border-pink-300 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative">Sign In</span>
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-black hover:text-pink-600 transition-colors underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
