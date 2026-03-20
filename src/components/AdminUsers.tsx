import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Ban,
  CheckCircle2,
  Filter,
  Mail,
  Search,
  Shield,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

type UserRole = 'Admin' | 'Staff' | 'Customer';
type UserStatus = 'Active' | 'Suspended' | 'Invited';

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
};

type Stat = {
  label: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
  tone: 'primary' | 'emerald' | 'violet' | 'amber';
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-[2.5rem] border border-primary-100/60 shadow-xl shadow-primary-900/5 ${className ?? ''}`}
    >
      {children}
    </div>
  );
};

const StatusPill: React.FC<{ status: UserStatus }> = ({ status }) => {
  const styles =
    status === 'Active'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : status === 'Invited'
        ? 'bg-amber-50 text-amber-700 border-amber-100'
        : 'bg-rose-50 text-rose-700 border-rose-100';

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black border ${styles}`}>
      {status}
    </span>
  );
};

const RolePill: React.FC<{ role: UserRole }> = ({ role }) => {
  const styles =
    role === 'Admin'
      ? 'bg-primary-50 text-primary-700 border-primary-100'
      : role === 'Staff'
        ? 'bg-violet-50 text-violet-700 border-violet-100'
        : 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black border ${styles}`}>
      {role}
    </span>
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

const AdminUsers: React.FC = () => {
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

  const users = useMemo<UserRow[]>(
    () => [
      { id: 'u_001', name: 'Nguyễn Minh Anh', email: 'minhanh@milkshop.vn', role: 'Admin', status: 'Active', lastLogin: 'Hôm nay, 09:12' },
      { id: 'u_002', name: 'Trần Quốc Huy', email: 'huy.tran@milkshop.vn', role: 'Staff', status: 'Active', lastLogin: 'Hôm qua, 18:40' },
      { id: 'u_003', name: 'Lê Thuỳ Dương', email: 'duong.le@gmail.com', role: 'Customer', status: 'Active', lastLogin: '2 ngày trước' },
      { id: 'u_004', name: 'Phạm Gia Bảo', email: 'giabao@gmail.com', role: 'Customer', status: 'Suspended', lastLogin: '14 ngày trước' },
      { id: 'u_005', name: 'Võ Khánh Linh', email: 'khanhlinh@milkshop.vn', role: 'Staff', status: 'Invited', lastLogin: 'Chưa đăng nhập' },
    ],
    [],
  );

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));
  }, [query, users]);

  const stats: Stat[] = [
    { label: 'Tổng user', value: `${users.length}`, Icon: Users, tone: 'primary' },
    { label: 'Đang hoạt động', value: `${users.filter((u) => u.status === 'Active').length}`, Icon: CheckCircle2, tone: 'emerald' },
    { label: 'Admin', value: `${users.filter((u) => u.role === 'Admin').length}`, Icon: Shield, tone: 'violet' },
    { label: 'Bị khoá', value: `${users.filter((u) => u.status === 'Suspended').length}`, Icon: Ban, tone: 'amber' },
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
                <span className="text-xs font-black uppercase tracking-[0.25em]">Admin Users</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-primary-950 leading-tight">
                Quản lí <span className="text-primary-500 italic">người dùng</span>.
              </h1>
              <p className="text-primary-900/60 font-medium max-w-2xl">
                Tạo user, phân quyền, theo dõi trạng thái tài khoản và lịch sử đăng nhập.
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
              <button className="px-8 py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-2">
                Thêm user
                <UserPlus className="w-4 h-4 text-white" />
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
                <h2 className="text-2xl md:text-3xl font-black text-primary-950">Users</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                <div className="relative w-full sm:w-[22rem]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm theo tên, email, role..."
                    className="w-full pl-11 pr-4 py-3 bg-primary-50/50 border border-primary-100 rounded-2xl text-sm font-bold text-primary-950 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-300"
                  />
                </div>

                <button className="group px-6 py-3 rounded-2xl bg-white text-primary-950 font-black border border-primary-100 shadow-lg shadow-primary-900/10 flex items-center justify-center gap-2 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all">
                  Lọc
                  <Filter className="w-4 h-4 text-primary-950 group-hover:text-white" />
                </button>

                <button className="group px-6 py-3 rounded-2xl bg-white text-primary-950 font-black border border-primary-100 shadow-lg shadow-primary-900/10 flex items-center justify-center gap-2 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all">
                  Mời
                  <Mail className="w-4 h-4 text-primary-950 group-hover:text-white" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-primary-100">
              <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-primary-50/50 text-xs font-black uppercase tracking-widest text-primary-700">
                <div className="col-span-4">User</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-3">Last login</div>
                <div className="col-span-1 text-right">Action</div>
              </div>

              <div className="divide-y divide-primary-100/60">
                {filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-6 items-start lg:items-center hover:bg-primary-50/40 transition-colors"
                  >
                    <div className="lg:col-span-4">
                      <div className="font-black text-primary-950">{u.name}</div>
                      <div className="text-xs text-primary-900/50 font-bold">{u.email}</div>
                    </div>
                    <div className="lg:col-span-2 flex items-center gap-3">
                      <RolePill role={u.role} />
                    </div>
                    <div className="lg:col-span-2 flex items-center gap-3">
                      <StatusPill status={u.status} />
                    </div>
                    <div className="lg:col-span-3">
                      <div className="text-sm font-bold text-primary-900">{u.lastLogin}</div>
                      <div className="text-xs font-black uppercase tracking-widest text-primary-900/40">{u.id}</div>
                    </div>
                    <div className="lg:col-span-1 flex lg:justify-end">
                      <button className="group px-5 py-3 rounded-2xl bg-white text-primary-950 font-black border border-primary-100 shadow-lg shadow-primary-900/10 flex items-center gap-2 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all">
                        Xem
                        <ArrowUpRight className="w-4 h-4 text-primary-950 group-hover:text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredUsers.length === 0 && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-black text-xs uppercase tracking-widest">
                  Không có kết quả
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AdminUsers;
