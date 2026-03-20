import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  DollarSign,
  Package,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

type Stat = {
  label: string;
  value: string;
  change: string;
  Icon: React.ComponentType<{ className?: string }>;
  tone: 'primary' | 'emerald' | 'violet' | 'amber';
};

type OrderStatus = 'Paid' | 'Pending' | 'Cancelled';

type Order = {
  code: string;
  customer: string;
  items: number;
  total: string;
  status: OrderStatus;
};

type InventoryItem = {
  name: string;
  sku: string;
  stock: number;
  target: number;
};

const StatusPill: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const styles =
    status === 'Paid'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : status === 'Pending'
        ? 'bg-amber-50 text-amber-700 border-amber-100'
        : 'bg-rose-50 text-rose-700 border-rose-100';

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black border ${styles}`}>
      {status}
    </span>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-[2.5rem] border border-primary-100/60 shadow-xl shadow-primary-900/5 ${className ?? ''}`}>
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
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-primary-50/60 border border-primary-100 text-primary-900">
              <TrendingUp className="w-4 h-4 text-primary-700" />
              <span className="text-xs font-black">{stat.change}</span>
            </div>
          </div>
          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg ${toneStyles.wrap}`}>
            <Icon className={`w-6 h-6 ${toneStyles.icon}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const dateLabel = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formatter.format(new Date());
  }, []);

  const stats: Stat[] = [
    { label: 'Đơn hôm nay', value: '128', change: '+12.4% tuần này', Icon: ShoppingBag, tone: 'primary' },
    { label: 'Doanh thu', value: '₫48.2M', change: '+8.1% tuần này', Icon: DollarSign, tone: 'emerald' },
    { label: 'Khách hàng', value: '2,914', change: '+4.6% tuần này', Icon: Users, tone: 'violet' },
    { label: 'Sản phẩm', value: '86', change: '+3 mới', Icon: Package, tone: 'amber' },
  ];

  const orders: Order[] = [
    { code: 'MS-24031', customer: 'Nguyễn Minh Anh', items: 5, total: '₫1,240,000', status: 'Paid' },
    { code: 'MS-24030', customer: 'Trần Quốc Huy', items: 2, total: '₫420,000', status: 'Pending' },
    { code: 'MS-24029', customer: 'Lê Thuỳ Dương', items: 7, total: '₫1,980,000', status: 'Paid' },
    { code: 'MS-24028', customer: 'Phạm Gia Bảo', items: 1, total: '₫120,000', status: 'Cancelled' },
    { code: 'MS-24027', customer: 'Võ Khánh Linh', items: 4, total: '₫860,000', status: 'Paid' },
  ];

  const inventory: InventoryItem[] = [
    { name: 'Premium Blue Milk 1L', sku: 'MLK-1L-BL', stock: 18, target: 40 },
    { name: 'Organic Yogurt Cup', sku: 'YGT-CP-OG', stock: 22, target: 50 },
    { name: 'Farm Butter 200g', sku: 'BTR-200-FM', stock: 12, target: 30 },
    { name: 'Cheese Slice Pack', sku: 'CHS-SL-10', stock: 26, target: 60 },
  ];

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
                <span className="text-xs font-black uppercase tracking-[0.25em]">Milkshop Dashboard</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-primary-950 leading-tight">
                Tổng quan <span className="text-primary-500 italic">vận hành</span>.
              </h1>
              <p className="text-primary-900/60 font-medium max-w-2xl">
                Theo dõi đơn hàng, doanh thu, khách hàng và tồn kho trong một giao diện đồng bộ với Milkshop.
              </p>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-primary-500">{dateLabel}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link
                to="/"
                className="group px-8 py-4 bg-white text-primary-950 font-black rounded-2xl border border-primary-100 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all shadow-xl shadow-primary-900/5 flex items-center justify-center gap-2"
              >
                Về trang chủ
                <ArrowRight className="w-4 h-4 text-primary-950 group-hover:text-white group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-2">
                Thông báo
                <Bell className="w-4 h-4 text-white" />
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
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <Card className="xl:col-span-7 p-8">
              <div className="flex items-center justify-between gap-6 mb-8">
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-primary-500">Đơn hàng</p>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-950">Đơn gần đây</h2>
                </div>
                <button className="group px-6 py-3 rounded-2xl bg-white text-primary-950 font-black border border-primary-100 shadow-lg shadow-primary-900/10 flex items-center gap-2 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all">
                  Xem tất cả
                  <ArrowUpRight className="w-4 h-4 text-primary-950 group-hover:text-white" />
                </button>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-primary-100">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-primary-50/50 text-xs font-black uppercase tracking-widest text-primary-700">
                  <div className="col-span-4">Mã</div>
                  <div className="col-span-4">Khách</div>
                  <div className="col-span-2 text-right">SP</div>
                  <div className="col-span-2 text-right">Trạng thái</div>
                </div>
                <div className="divide-y divide-primary-100/60">
                  {orders.map((order) => (
                    <div key={order.code} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-primary-50/40 transition-colors">
                      <div className="col-span-4">
                        <div className="font-black text-primary-950">{order.code}</div>
                        <div className="text-xs text-primary-900/50 font-bold">{order.total}</div>
                      </div>
                      <div className="col-span-4">
                        <div className="font-bold text-primary-900">{order.customer}</div>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="inline-flex items-center justify-center min-w-10 px-3 py-2 rounded-2xl bg-white border border-primary-100 text-xs font-black text-primary-950">
                          {order.items}
                        </span>
                      </div>
                      <div className="col-span-2 text-right">
                        <StatusPill status={order.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="xl:col-span-5 space-y-8">
              <Card className="p-8">
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-primary-500">Tồn kho</p>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-950">Cảnh báo nhập thêm</h2>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-950 border border-primary-950 flex items-center justify-center text-white shadow-lg shadow-primary-900/20">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  {inventory.map((item) => {
                    const ratio = Math.max(0, Math.min(1, item.stock / item.target));
                    const percent = Math.round(ratio * 100);
                    const isLow = item.stock <= Math.ceil(item.target * 0.45);
                    return (
                      <div key={item.sku} className="p-5 rounded-[2rem] border border-primary-100/70 bg-white hover:bg-primary-50/40 transition-colors">
                        <div className="flex items-start justify-between gap-6">
                          <div className="space-y-1">
                            <div className="font-black text-primary-950">{item.name}</div>
                            <div className="text-xs font-bold text-primary-900/50">{item.sku}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-black text-primary-950">{item.stock}</div>
                            <div className="text-xs font-bold text-primary-900/50">mục tiêu {item.target}</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="h-2 rounded-full bg-primary-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isLow ? 'bg-rose-500' : 'bg-primary-600'}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs font-black">
                            <span className="text-primary-700">{percent}%</span>
                            <span className={`${isLow ? 'text-rose-600' : 'text-primary-900/50'}`}>
                              {isLow ? 'Cần nhập thêm' : 'Ổn định'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-8 overflow-hidden relative">
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-100/50 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-2">
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-primary-500">Gợi ý</p>
                      <h2 className="text-2xl md:text-3xl font-black text-primary-950">Việc nên làm hôm nay</h2>
                      <p className="text-primary-900/60 font-medium">
                        Tập trung vào các mặt hàng sắp hết và tối ưu đơn giao sớm.
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-primary-950 text-white flex items-center justify-center shadow-lg shadow-primary-900/20">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    {[
                      { title: 'Đẩy chiến dịch “Milk Morning”', detail: 'Tăng hiển thị cho nhóm sản phẩm 1L và set gia đình.' },
                      { title: 'Rà soát đơn Pending', detail: 'Nhắc thanh toán hoặc xác nhận lịch giao.' },
                      { title: 'Cập nhật tồn kho', detail: 'Nhập thêm butter và yogurt để tránh out-of-stock.' },
                    ].map((item) => (
                      <div key={item.title} className="p-5 rounded-[2rem] bg-white border border-primary-100/70 flex items-start justify-between gap-6">
                        <div className="space-y-1">
                          <div className="font-black text-primary-950">{item.title}</div>
                          <div className="text-xs font-bold text-primary-900/50">{item.detail}</div>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-primary-950 border border-primary-950 flex items-center justify-center shadow-lg shadow-primary-900/15">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Link
                      to="/"
                      className="w-full px-8 py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-2"
                    >
                      Về trang bán hàng
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-black text-primary-900/50">
                      <span className="w-2 h-2 bg-primary-400 rounded-full" />
                      Dữ liệu demo UI, sẵn sàng để nối API sau
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
