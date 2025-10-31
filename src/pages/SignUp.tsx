import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { name, email, password, confirmPassword } = formData;
      if (password !== confirmPassword) {
        alert("password are not same");
        return;
      }
      const res = await signup(email, password, confirmPassword, name);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Faild to signup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white border border-gray-200 p-8 group hover:border-purple-200 transition-all duration-300">
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <h1 className="text-3xl mb-2">Create Account</h1>
              <p className="text-sm text-gray-600">
                Join us and light up your space
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="border-gray-200 focus:border-purple-300 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="border-gray-200 focus:border-purple-300 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="border-gray-200 focus:border-purple-300 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  className="border-gray-200 focus:border-purple-300 transition-colors"
                />
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative">Create Account</span>
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-black hover:text-purple-600 transition-colors underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
