import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import { motion } from 'framer-motion';
import { productApi, Product } from '@/api/productApi';
import { ArrowRight, Leaf, Truck, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.searchProducts({ pageSize: 6 });
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { icon: <Leaf className="w-8 h-8" />, title: 'Organic Farming', desc: 'Our cows are raised on certified organic pastures with love.' },
                { icon: <Truck className="w-8 h-8" />, title: 'Fast Delivery', desc: 'Same day delivery to ensure peak freshness for your family.' },
                { icon: <Award className="w-8 h-8" />, title: 'Award Winning', desc: 'Voted #1 dairy shop for five consecutive years by locals.' },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group text-center space-y-6 p-10 rounded-[3rem] hover:bg-primary-50/50 transition-colors"
                >
                  <div className="w-20 h-20 bg-primary-100/50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary-600 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-xl shadow-primary-500/5">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-primary-950">{feature.title}</h3>
                  <p className="text-primary-900/50 font-medium leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-32 bg-primary-50/30 rounded-[5rem] mx-4 md:mx-10 border border-primary-100/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="space-y-4">
                <span className="text-primary-600 font-black uppercase tracking-[0.3em] text-xs">Exquisite Selection</span>
                <h2 className="text-4xl md:text-6xl font-black text-primary-950 leading-tight">Seasonal <span className="text-primary-500 italic">Favorites.</span></h2>
              </div>
              <button className="px-8 py-4 bg-white text-primary-900 font-black rounded-2xl border border-primary-100 hover:bg-primary-950 hover:text-white transition-all shadow-xl shadow-primary-900/5 flex items-center gap-2 group">
                Explore All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 opacity-50">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-primary-100 rounded-[3rem] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard 
                      id={product.id}
                      name={product.name}
                      price={product.originalPrice}
                      salePrice={product.salePrice}
                      rating={4.8} // Backend might not have ratings per product explicitly in search
                      category={product.categoryName || 'Milk'}
                      thumbnail={product.thumbnail}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Testimonials />

        {/* Newsletter / CTA */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="bg-primary-950 rounded-[4rem] p-12 md:p-32 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,105,161,0.3)]">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary-600/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-[100px]" />
                
                <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12">
                    <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.1]">Join our farm <span className="text-primary-400 italic font-serif">premium</span> circle.</h2>
                    <p className="text-primary-100/60 text-lg font-medium max-w-xl mx-auto">Get exclusive updates, early access to new seasonal products, and special community deals.</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto p-2 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="flex-1 px-8 py-5 rounded-2xl bg-transparent text-white placeholder:text-white/30 focus:outline-none placeholder:font-bold"
                        />
                        <button className="px-10 py-5 bg-white text-primary-950 font-black rounded-2xl hover:bg-primary-50 transition-all shadow-xl">Join Now</button>
                    </form>
                    <div className="text-primary-400/50 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-4">
                      <span>No Spam</span>
                      <div className="w-1 h-1 bg-primary-800 rounded-full" />
                      <span>Weekly Updates</span>
                      <div className="w-1 h-1 bg-primary-800 rounded-full" />
                      <span>One-click Unsubscribe</span>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
