import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Café Owner",
    content: "The custom neon sign transformed our café. The quality is outstanding."
  },
  {
    name: "Michael Chen",
    role: "Homeowner",
    content: "The team was helpful with the design process. Final product exceeded expectations."
  },
  {
    name: "Emma Williams",
    role: "Event Planner",
    content: "We use their signs for events. Always reliable and beautiful. Highly recommend."
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4">
            Customer Reviews
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white border border-gray-200 hover:border-pink-200 transition-all duration-300 relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
              
              <Quote className="w-8 h-8 text-gray-200 group-hover:text-pink-200 transition-colors duration-300 mb-4" />
              
              <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>

              <div className="relative z-10">
                <div className="mb-1 group-hover:text-pink-600 transition-colors duration-300">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
