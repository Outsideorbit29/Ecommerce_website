export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4 tracking-tighter">AcmeStore</h3>
          <p className="text-sm">Premium products for a premium lifestyle. We deliver quality and modern aesthetics straight to your doorstep.</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Discount</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe for updates and exclusive offers.</p>
          <div className="flex">
            <input type="email" placeholder="Email" className="bg-slate-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full" />
            <button className="bg-white text-black px-4 py-2 rounded-r-md font-medium">Join</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} AcmeStore. All rights reserved.</p>
      </div>
    </footer>
  );
}
