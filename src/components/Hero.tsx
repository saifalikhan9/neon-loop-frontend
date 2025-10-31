import { Button } from "./ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Subtle animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"
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
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 relative z-10">
        <motion.div
          className="mb-8 inline-flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Zap className="w-4 h-4 text-pink-500" />
          <span className="text-sm uppercase tracking-wider text-gray-500">
            Premium Custom Neon
          </span>
        </motion.div>

        <motion.h1
          className="mb-8 mt-8   "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="relative bg-clip-text text-transparent bg-gradient-to-b from-pink-500 to-purple-500 text-6xl sm:text-7xl md:text-8xl after:absolute after:size-50 after:top-0 after:left-80   after:bg-gradient-to-r after:from-pink-500/20 after:to-purple-500/20 after:blur-2xl after:-z-10 after:animate-pulse ">
            Light Up Your World
          </span>
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Transform any space with custom neon signs. From business signage to
          home décor.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-black hover:bg-gray-800 text-white border-0 px-8 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <Link to={"/customize"} className="relative flex items-center">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-3xl mx-auto pt-12 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { number: "500+", label: "Designs" },
            { number: "10K+", label: "Customers" },
            { number: "24/7", label: "Support" },
            { number: "100%", label: "Quality" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center group cursor-default"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl mb-1 relative inline-block">
                {stat.number}
                <span className="absolute -inset-2 bg-pink-500/0 group-hover:bg-pink-500/10 rounded-lg transition-all duration-300 -z-10"></span>
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
