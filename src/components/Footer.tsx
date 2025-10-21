export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Shop */}
          <div>
            <h3 className="text-sm mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Custom Signs</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Business</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Home</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-black transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">About</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm mb-4">Follow</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© 2025 NeonGlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
