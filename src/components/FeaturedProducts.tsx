
import { ImageWithFallback } from "@/figma/ImageWithFallback";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Love Sign",
    price: 199,
    image: "https://images.unsplash.com/photo-1558557363-03e8960b90ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwc2lnbnMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjAxNjczMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Wave Design",
    price: 249,
    image: "https://images.unsplash.com/photo-1645295977630-0474a5d386cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwcGluayUyMGJsdWV8ZW58MXx8fHwxNzYwMTY3MzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Logo Sign",
    price: 349,
    image: "https://images.unsplash.com/photo-1581351123518-0efb79b94e78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBuZW9uJTIwc2lnbnxlbnwxfHx8fDE3NjAxNjczMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    name: "Bar Sign",
    price: 299,
    image: "https://images.unsplash.com/photo-1704047629120-8f7db4ea23ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwc2lnbiUyMHNob3B8ZW58MXx8fHwxNzYwMTY3MzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      className="group bg-white overflow-hidden border border-gray-200 hover:border-black transition-all duration-300 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Subtle neon glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
      
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Like button */}
        <motion.button
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => setLiked(!liked)}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`w-4 h-4 transition-all duration-300 ${liked ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`} />
        </motion.button>
      </div>

      <div className="p-6 relative z-10">
        <h3 className="mb-2 group-hover:text-pink-600 transition-colors duration-300">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm relative">
            ${product.price}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-pink-500 group-hover:w-full transition-all duration-500"></span>
          </span>
          <button className="text-sm underline hover:no-underline hover:text-pink-600 transition-colors duration-300">
            View
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4 relative inline-block">
            Featured Designs
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
            Explore our curated collection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
