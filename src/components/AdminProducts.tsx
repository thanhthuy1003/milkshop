import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Filter,
  Package,
  Plus,
  Search,
  Sparkles,
  Trash2,
  TriangleAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { productApi, Product } from '@/api/productApi';

type Stat = {
  label: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
  tone: 'primary' | 'emerald' | 'violet' | 'amber';
};

type ProductDraft = Omit<Product, 'id'> & { id?: string };

const STORAGE_KEYS = {
  created: 'milkshop_admin_products_created_v1',
  deleted: 'milkshop_admin_products_deleted_v1',
};

const productFormSchema = z.object({
  name: z.string().min(2, 'Tên sản phẩm tối thiểu 2 ký tự'),
  description: z.string().min(2, 'Mô tả tối thiểu 2 ký tự'),
  quantity: z.coerce.number().int().nonnegative('Số lượng phải >= 0'),
  originalPrice: z.coerce.number().nonnegative('Giá gốc phải >= 0'),
  salePrice: z.coerce.number().nonnegative('Giá sale phải >= 0'),
  thumbnail: z.string().min(2, 'Vui lòng nhập đường dẫn ảnh'),
  categoryName: z.string().optional(),
  brandName: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-[2.5rem] border border-primary-100/60 shadow-xl shadow-primary-900/5 ${className ?? ''}`}
    >
      {children}
    </div>
  );
};

const StatCard: React.FC<{ stat: Stat; index: number }> = ({ stat, index }) => {
  const { Icon } = stat;
  const toneStyles =
    stat.tone === 'emerald'
      ? { wrap: 'bg-emerald-50 border-emerald-100 shadow-emerald-500/10', icon: 'text-emerald-700' }
      : stat.tone === 'violet'
        ? { wrap: 'bg-violet-50 border-violet-100 shadow-violet-500/10', icon: 'text-violet-700' }
        : stat.tone === 'amber'
          ? { wrap: 'bg-amber-50 border-amber-100 shadow-amber-500/10', icon: 'text-amber-800' }
          : { wrap: 'bg-primary-50 border-primary-100 shadow-primary-500/10', icon: 'text-primary-700' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Card className="p-8 overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-100/50 blur-2xl" />
        <div className="relative flex items-start justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-primary-500">{stat.label}</p>
            <p className="text-3xl md:text-4xl font-black text-primary-950 leading-tight">{stat.value}</p>
          </div>
          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg ${toneStyles.wrap}`}>
            <Icon className={`w-6 h-6 ${toneStyles.icon}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Modal: React.FC<{
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-primary-950/30 backdrop-blur-sm"
        aria-label="Close"
      />
      <div className="relative h-full w-full flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-[2.5rem] border border-primary-100 shadow-2xl shadow-primary-900/20 overflow-hidden">
          <div className="p-8 border-b border-primary-100 flex items-start justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-primary-500">Admin</p>
              <h3 className="text-2xl font-black text-primary-950">{title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-white text-primary-950 font-black border border-primary-100 hover:bg-primary-50 transition-all"
            >
              Đóng
            </button>
          </div>
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

const AdminProducts: React.FC = () => {
  const dateLabel = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formatter.format(new Date());
  }, []);

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [apiProducts, setApiProducts] = useState<Product[]>([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const [createdProducts, setCreatedProducts] = useState<Product[]>([]);
  const [deletedProductIds, setDeletedProductIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      quantity: 0,
      originalPrice: 0,
      salePrice: 0,
      thumbnail: '',
      categoryName: '',
      brandName: '',
    },
  });

  useEffect(() => {
    const loadLocal = () => {
      const createdRaw = localStorage.getItem(STORAGE_KEYS.created);
      const deletedRaw = localStorage.getItem(STORAGE_KEYS.deleted);

      const createdParsed = createdRaw ? (JSON.parse(createdRaw) as Product[]) : [];
      const deletedParsed = deletedRaw ? (JSON.parse(deletedRaw) as string[]) : [];

      setCreatedProducts(Array.isArray(createdParsed) ? createdParsed : []);
      setDeletedProductIds(Array.isArray(deletedParsed) ? deletedParsed : []);
    };

    loadLocal();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.searchProducts({ pageSize: 50 });
        setApiProducts(data.products);
      } catch (error) {
        setApiProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const mergedProducts = useMemo(() => {
    const deleted = new Set(deletedProductIds);
    const base = apiProducts.filter((p) => !deleted.has(p.id));
    const created = createdProducts.filter((p) => !deleted.has(p.id));
    const map = new Map<string, Product>();
    for (const p of [...base, ...created]) map.set(p.id, p);
    return Array.from(map.values());
  }, [apiProducts, createdProducts, deletedProductIds]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mergedProducts;
    return mergedProducts.filter((p) => {
      const hay = `${p.name} ${p.categoryName ?? ''} ${p.brandName ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [mergedProducts, query]);

  const stats: Stat[] = useMemo(() => {
    const total = mergedProducts.length;
    const lowStock = mergedProducts.filter((p) => p.quantity <= 10).length;
    const onSale = mergedProducts.filter((p) => p.salePrice > 0 && p.salePrice < p.originalPrice).length;
    const created = createdProducts.length;

    return [
      { label: 'Tổng sản phẩm', value: `${total}`, Icon: Package, tone: 'primary' },
      { label: 'Sắp hết hàng', value: `${lowStock}`, Icon: TriangleAlert, tone: 'amber' },
      { label: 'Đang giảm giá', value: `${onSale}`, Icon: CheckCircle2, tone: 'emerald' },
      { label: 'Bạn vừa thêm', value: `${created}`, Icon: Box, tone: 'violet' },
    ];
  }, [createdProducts.length, mergedProducts]);

  const persistCreated = (items: Product[]) => {
    setCreatedProducts(items);
    localStorage.setItem(STORAGE_KEYS.created, JSON.stringify(items));
  };

  const persistDeleted = (ids: string[]) => {
    setDeletedProductIds(ids);
    localStorage.setItem(STORAGE_KEYS.deleted, JSON.stringify(ids));
  };

  const onCreate = async (values: ProductFormValues) => {
    const nowId = `tmp_${Date.now()}`;
    const draft: ProductDraft = {
      id: nowId,
      name: values.name,
      description: values.description,
      quantity: values.quantity,
      originalPrice: values.originalPrice,
      salePrice: values.salePrice,
      thumbnail: values.thumbnail,
      categoryName: values.categoryName?.trim() ? values.categoryName.trim() : undefined,
      brandName: values.brandName?.trim() ? values.brandName.trim() : undefined,
    };

    const product: Product = {
      id: draft.id ?? nowId,
      name: draft.name,
      description: draft.description,
      quantity: draft.quantity,
      originalPrice: draft.originalPrice,
      salePrice: draft.salePrice,
      thumbnail: draft.thumbnail,
      categoryName: draft.categoryName,
      brandName: draft.brandName,
    };

    const next = [product, ...createdProducts];
    persistCreated(next);
    reset();
    setIsCreateOpen(false);
  };

  const onDelete = async (product: Product) => {
    if (product.id.startsWith('tmp_')) {
      const nextCreated = createdProducts.filter((p) => p.id !== product.id);
      persistCreated(nextCreated);
      setDeleteTarget(null);
      return;
    }

    if (deletedProductIds.includes(product.id)) {
      setDeleteTarget(null);
      return;
    }

    persistDeleted([product.id, ...deletedProductIds]);
    setDeleteTarget(null);
  };

  return (
    <div className="bg-white">
      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[70%] h-[520px] bg-primary-50/60 rounded-bl-[10rem]" />
          <div className="absolute top-24 right-24 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-10 w-[32rem] h-[32rem] bg-primary-200/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-primary-100 text-primary-700 shadow-lg shadow-primary-900/5">
                <Sparkles className="w-4 h-4 text-primary-700" />
                <span className="text-xs font-black uppercase tracking-[0.25em]">Admin Products</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-primary-950 leading-tight">
                Quản lí <span className="text-primary-500 italic">sản phẩm</span>.
              </h1>
              <p className="text-primary-900/60 font-medium max-w-2xl">
                Thêm, xoá sản phẩm và kiểm tra tình trạng tồn kho theo giao diện admin.
              </p>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-primary-500">{dateLabel}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link
                to="/admin/dashboard"
                className="group px-8 py-4 bg-white text-primary-950 font-black rounded-2xl border border-primary-100 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all shadow-xl shadow-primary-900/5 flex items-center justify-center gap-2"
              >
                Về dashboard
                <ArrowRight className="w-4 h-4 text-primary-950 group-hover:text-white group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="px-8 py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-2"
              >
                Thêm sản phẩm
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <Card className="p-8">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-primary-500">Danh sách</p>
                <h2 className="text-2xl md:text-3xl font-black text-primary-950">Products</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                <div className="relative w-full sm:w-[24rem]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm theo tên, category, brand..."
                    className="w-full pl-11 pr-4 py-3 bg-primary-50/50 border border-primary-100 rounded-2xl text-sm font-bold text-primary-950 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-300"
                  />
                </div>

                <button
                  type="button"
                  className="group px-6 py-3 rounded-2xl bg-white text-primary-950 font-black border border-primary-100 shadow-lg shadow-primary-900/10 flex items-center justify-center gap-2 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all"
                >
                  Lọc
                  <Filter className="w-4 h-4 text-primary-950 group-hover:text-white" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-primary-100">
              <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-primary-50/50 text-xs font-black uppercase tracking-widest text-primary-700">
                <div className="col-span-5">Sản phẩm</div>
                <div className="col-span-2 text-right">Tồn kho</div>
                <div className="col-span-2 text-right">Giá</div>
                <div className="col-span-2">Nhóm</div>
                <div className="col-span-1 text-right">Action</div>
              </div>

              <div className="divide-y divide-primary-100/60">
                {isLoading ? (
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="px-6 py-6">
                      <div className="h-10 bg-primary-100/60 rounded-2xl animate-pulse" />
                    </div>
                  ))
                ) : (
                  filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-6 items-start lg:items-center hover:bg-primary-50/40 transition-colors"
                    >
                      <div className="lg:col-span-5 flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-primary-100 bg-primary-50 flex items-center justify-center">
                          {p.thumbnail ? (
                            <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-6 h-6 text-primary-600" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="font-black text-primary-950">{p.name}</div>
                          <div className="text-xs text-primary-900/50 font-bold line-clamp-1">{p.description}</div>
                        </div>
                      </div>

                      <div className="lg:col-span-2 lg:text-right">
                        <div className="inline-flex items-center justify-center min-w-14 px-3 py-2 rounded-2xl bg-white border border-primary-100 text-xs font-black text-primary-950">
                          {p.quantity}
                        </div>
                      </div>

                      <div className="lg:col-span-2 lg:text-right">
                        <div className="font-black text-primary-950">{p.salePrice > 0 ? `₫${p.salePrice.toLocaleString('vi-VN')}` : `₫${p.originalPrice.toLocaleString('vi-VN')}`}</div>
                        {p.salePrice > 0 && p.salePrice < p.originalPrice && (
                          <div className="text-xs font-black text-primary-900/40 line-through">{`₫${p.originalPrice.toLocaleString('vi-VN')}`}</div>
                        )}
                      </div>

                      <div className="lg:col-span-2">
                        <div className="text-sm font-bold text-primary-900">{p.categoryName ?? 'Milk'}</div>
                        <div className="text-xs font-black uppercase tracking-widest text-primary-900/40">{p.brandName ?? 'Milkshop'}</div>
                      </div>

                      <div className="lg:col-span-1 flex lg:justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(p)}
                          className="group px-5 py-3 rounded-2xl bg-white text-primary-950 font-black border border-primary-100 shadow-lg shadow-primary-900/10 flex items-center gap-2 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all"
                        >
                          Xoá
                          <Trash2 className="w-4 h-4 text-primary-950 group-hover:text-white" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {!isLoading && filteredProducts.length === 0 && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-black text-xs uppercase tracking-widest">
                  Không có kết quả
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      <Modal
        title="Thêm sản phẩm"
        open={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          reset();
        }}
      >
        <form onSubmit={handleSubmit(onCreate)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-black text-primary-900 ml-1">Tên sản phẩm</label>
              <input
                {...register('name')}
                className="w-full px-5 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-300 font-bold"
                placeholder="VD: Premium Blue Milk 1L"
              />
              {errors.name && <p className="text-red-500 text-xs font-bold ml-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-primary-900 ml-1">Ảnh (URL)</label>
              <input
                {...register('thumbnail')}
                className="w-full px-5 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-300 font-bold"
                placeholder="https://..."
              />
              {errors.thumbnail && <p className="text-red-500 text-xs font-bold ml-1">{errors.thumbnail.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-black text-primary-900 ml-1">Mô tả</label>
              <input
                {...register('description')}
                className="w-full px-5 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-300 font-bold"
                placeholder="Mô tả ngắn..."
              />
              {errors.description && <p className="text-red-500 text-xs font-bold ml-1">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-primary-900 ml-1">Số lượng</label>
              <input
                {...register('quantity')}
                inputMode="numeric"
                className="w-full px-5 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-bold"
              />
              {errors.quantity && <p className="text-red-500 text-xs font-bold ml-1">{errors.quantity.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-primary-900 ml-1">Giá gốc</label>
              <input
                {...register('originalPrice')}
                inputMode="decimal"
                className="w-full px-5 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-bold"
              />
              {errors.originalPrice && <p className="text-red-500 text-xs font-bold ml-1">{errors.originalPrice.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-primary-900 ml-1">Giá sale</label>
              <input
                {...register('salePrice')}
                inputMode="decimal"
                className="w-full px-5 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-bold"
              />
              {errors.salePrice && <p className="text-red-500 text-xs font-bold ml-1">{errors.salePrice.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-primary-900 ml-1">Category</label>
              <input
                {...register('categoryName')}
                className="w-full px-5 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-300 font-bold"
                placeholder="VD: Milk"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-primary-900 ml-1">Brand</label>
              <input
                {...register('brandName')}
                className="w-full px-5 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-300 font-bold"
                placeholder="VD: Milkshop"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                reset();
                setIsCreateOpen(false);
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white text-primary-950 font-black rounded-2xl border border-primary-100 hover:bg-primary-50 transition-all shadow-lg shadow-primary-900/5"
            >
              Huỷ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 px-8 py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Đang tạo...' : 'Tạo sản phẩm'}
              {!isSubmitting && <ArrowUpRight className="w-4 h-4 text-white" />}
            </button>
          </div>
        </form>
      </Modal>

      <Modal title="Xác nhận xoá" open={deleteTarget !== null} onClose={() => setDeleteTarget(null)}>
        <div className="space-y-6">
          <div className="p-6 rounded-[2rem] border border-primary-100 bg-primary-50/40">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-primary-500">Bạn sắp xoá</div>
            <div className="mt-2 text-xl font-black text-primary-950">{deleteTarget?.name}</div>
            <div className="mt-1 text-sm font-bold text-primary-900/60">{deleteTarget?.categoryName ?? 'Milk'}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="w-full sm:w-auto px-8 py-4 bg-white text-primary-950 font-black rounded-2xl border border-primary-100 hover:bg-primary-50 transition-all shadow-lg shadow-primary-900/5"
            >
              Huỷ
            </button>
            <button
              type="button"
              onClick={() => {
                if (deleteTarget) void onDelete(deleteTarget);
              }}
              className="w-full sm:flex-1 px-8 py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-2"
            >
              Xoá sản phẩm
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="text-xs font-bold text-primary-900/50">
            Lưu ý: đây là flow UI demo, dữ liệu thêm/xoá được lưu trên trình duyệt.
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProducts;
