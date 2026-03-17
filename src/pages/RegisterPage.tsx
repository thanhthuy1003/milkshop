import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { authApi } from '@/api/authApi';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await authApi.signUp(data);
      alert('Registration successful! Please check your email for verification.');
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl shadow-primary-900/10 p-12 border border-white"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-primary-500/30">
            <UserPlus className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-primary-950 mb-2">Create Account</h1>
          <p className="text-primary-400 font-medium text-sm">Join the freshest community in town</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-bold text-primary-900 ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
              <input 
                {...register('username')}
                type="text" 
                placeholder="Choose a username"
                className="w-full pl-12 pr-6 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-200"
              />
            </div>
            {errors.username && <p className="text-red-500 text-xs font-bold ml-1">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary-900 ml-1">First Name</label>
            <input 
              {...register('firstName')}
              type="text" 
              placeholder="First name"
              className="w-full px-6 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-200"
            />
            {errors.firstName && <p className="text-red-500 text-xs font-bold ml-1">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary-900 ml-1">Last Name</label>
            <input 
              {...register('lastName')}
              type="text" 
              placeholder="Last name"
              className="w-full px-6 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-200"
            />
            {errors.lastName && <p className="text-red-500 text-xs font-bold ml-1">{errors.lastName.message}</p>}
          </div>

          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-sm font-bold text-primary-900 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
              <input 
                {...register('email')}
                type="email" 
                placeholder="your@email.com"
                className="w-full pl-12 pr-6 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-200"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs font-bold ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-sm font-bold text-primary-900 ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
              <input 
                {...register('phoneNumber')}
                type="tel" 
                placeholder="090 123 4567"
                className="w-full pl-12 pr-6 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-200"
              />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-xs font-bold ml-1">{errors.phoneNumber.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary-900 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
              <input 
                {...register('password')}
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-6 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-200"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs font-bold ml-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary-900 ml-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
              <input 
                {...register('confirmPassword')}
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-6 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-200"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs font-bold ml-1">{errors.confirmPassword.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-500/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 col-span-2 mt-4"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
            {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-primary-900 font-medium">
          Already have an account? <a href="/login" className="text-primary-600 font-black hover:underline px-1">Sign In</a>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
