import React from 'react';
import { Star, Heart, Plus } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  rating: number;
  thumbnail?: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, salePrice, rating, category, thumbnail }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] p-5 border border-primary-50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/50 rounded-bl-[4rem] -z-10 group-hover:bg-primary-100/50 transition-colors" />
      
      <button className="absolute top-6 right-6 z-10 p-2.5 bg-white/70 backdrop-blur-md rounded-2xl text-primary-300 hover:text-red-500 hover:bg-white transition-all shadow-sm">
        <Heart className="w-5 h-5" />
      </button>
      
      <div className="aspect-square bg-primary-50/30 rounded-[2rem] mb-6 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700">
        {thumbnail ? (
          <img src={thumbnail} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary-100 font-black text-4xl opacity-20 select-none">
            MILK
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary-50 text-[10px] font-black text-primary-600 uppercase tracking-widest rounded-lg border border-primary-100">
            {category}
          </span>
          <div className="flex items-center gap-1 text-orange-400">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] font-black text-primary-950">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="font-extrabold text-primary-950 text-xl leading-tight group-hover:text-primary-600 transition-colors line-clamp-1">
          {name}
        </h3>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {salePrice && (
              <span className="text-xs text-primary-300 line-through font-bold">${price.toFixed(2)}</span>
            )}
            <span className="text-2xl font-black text-primary-950 tracking-tighter">
              ${(salePrice || price).toFixed(2)}
            </span>
          </div>
          <button className="w-14 h-14 bg-primary-600 text-white rounded-2xl hover:bg-primary-950 transition-all transform flex items-center justify-center shadow-lg shadow-primary-500/20 active:scale-95 group-hover:rotate-[360deg] duration-700">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
