import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export function CTA() {
  const navigate = useNavigate()
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl mb-6 relative inline-block">
            Ready to get started?
            <span className="absolute -inset-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-2xl -z-10 animate-pulse"></span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            Create your custom neon sign today with our design team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={()=>{navigate("/customize")}} size="lg" className="bg-black hover:bg-gray-800 text-white border-0 px-8 group relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center">
                Start Design
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-50 px-8 group relative">
              <span className="absolute inset-0 border border-pink-500/0 group-hover:border-pink-500/50 rounded-md transition-all duration-300"></span>
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
