import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Local Chef",
    content: "The purity of this milk is unmatched. I use it in all my signature desserts. The creaminess is just incredible!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Fitness Enthusiast",
    content: "Post-workout shakes taste so much better now. You can really tell the difference that grass-fed organic farming makes.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Mother of Two",
    content: "My kids finally love drinking their milk! It's refreshing and I feel good knowing exactly where it comes from.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Heart of the Community
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-primary-950 mb-6 leading-tight"
          >
            Loved by those who <br /> <span className="text-primary-500 italic">values quality.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-primary-50/30 p-10 rounded-[3rem] border border-primary-100/50 relative group hover:bg-white hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500"
            >
              <Quote className="absolute top-8 right-10 w-12 h-12 text-primary-200/50 group-hover:text-primary-200 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary-500 text-primary-500" />
                ))}
              </div>
              
              <p className="text-lg text-primary-900/80 mb-8 font-medium leading-relaxed italic">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-primary-100">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-lg" />
                <div>
                  <h4 className="font-black text-primary-950">{t.name}</h4>
                  <p className="text-xs text-primary-400 font-bold uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
