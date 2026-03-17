import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-primary-50 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <a href="/" className="text-2xl font-bold tracking-tight text-white">
              MILK<span className="text-primary-400">SHOP</span>
            </a>
            <p className="text-primary-300 leading-relaxed max-w-xs">
              Providing premium, fresh dairy products from our family-owned farms directly to your doorstep.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white text-primary-300">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Weekly Deals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white text-primary-300">Customer Service</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white text-primary-300">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-primary-300">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3 text-primary-300">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>contact@milkshop.com</span>
              </li>
              <li className="flex items-center gap-3 text-primary-300">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>123 Farm Road, Dairy Valley</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-primary-400 text-sm">
          <p>© 2024 Milkshop. All rights reserved. Crafted with care for your health.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
