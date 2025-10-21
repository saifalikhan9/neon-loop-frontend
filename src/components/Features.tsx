import { Zap, Palette, Shield, Truck } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Palette,
    title: "Custom Designs",
    description: "Create your own unique sign or choose from our collection.",
    color: "from-pink-500 to-purple-500"
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "LED technology lasting up to 50,000 hours.",
    color: "from-purple-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    description: "Comprehensive warranty and lifetime support.",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Worldwide shipping on all orders.",
    color: "from-blue-500 to-pink-500"
  }
];

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                className="text-center group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex mb-4 relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-500`}></div>
                  <div className="relative p-3 rounded-full border border-gray-200 group-hover:border-pink-200 transition-all duration-300">
                    <Icon className="w-6 h-6 group-hover:text-pink-600 transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="mb-2 group-hover:text-pink-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
