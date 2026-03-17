import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-primary-50/50 rounded-bl-[10rem] -z-10" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl -z-10 animate-pulse" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-bold uppercase tracking-widest text-primary-600 bg-primary-50 rounded-full border border-primary-100">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-ping" />
              Pure Blue Freshness
            </span>
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] mb-8 text-primary-950">
              Refined <br /> 
              <span className="text-primary-500">Nature's</span> Best.
            </h1>
            <p className="text-lg md:text-xl text-primary-900/60 mb-12 leading-relaxed max-w-lg">
              Experience the refreshing purity of our organic milk. Sourced from happy cows roaming on azure pastures. 
              Delivered fresh to your doorstep every morning.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <button className="px-10 py-5 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-500/20 transition-all flex items-center gap-3 group">
                Shop Selection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-3 text-primary-900 font-bold group">
                <span className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-primary-100 shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 text-primary-600 fill-current" />
                </span>
                Our Farm Story
              </button>
            </div>
            
            <div className="mt-16 flex items-center gap-8 border-t border-primary-50 pt-10">
              <div>
                <p className="text-3xl font-bold text-primary-950">12k+</p>
                <p className="text-sm text-primary-400 font-medium uppercase tracking-wider">Happy Clients</p>
              </div>
              <div className="w-px h-10 bg-primary-100" />
              <div>
                <p className="text-3xl font-bold text-primary-950">100%</p>
                <p className="text-sm text-primary-400 font-medium uppercase tracking-wider">Organic Pure</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative z-10 w-full aspect-square rounded-[4rem] overflow-hidden shadow-2xl shadow-primary-900/10 border-8 border-white">
              <img 
                src="/src/assets/hero-milk-blue.png" 
                alt="Premium Milk" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 p-6 bg-white rounded-3xl shadow-2xl border border-primary-50 z-20 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🥛</span>
                </div>
                <div>
                  <p className="font-bold text-primary-950">Daily Fresh</p>
                  <p className="text-xs text-primary-400">Guaranteed quality</p>
                </div>
              </div>
            </motion.div>
            
            <div className="absolute -bottom-6 -left-6 p-8 bg-primary-600 text-white rounded-[2.5rem] shadow-2xl z-20 max-w-[200px]">
              <p className="text-3xl font-bold mb-1">4.9</p>
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => <span key={i} className="text-xs font-bold text-yellow-400 italic">★</span>)}
              </div>
              <p className="text-xs font-medium text-primary-100">Average customer rating for our dairy products</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
