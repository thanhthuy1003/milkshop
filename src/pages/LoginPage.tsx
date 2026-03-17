import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { authApi } from '@/api/authApi';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authApi.login(data);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response));
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-primary-900/10 p-12 border border-white"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-primary-500/30">
            <LogIn className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-primary-950 mb-2">Welcome Back</h1>
          <p className="text-primary-400 font-medium text-sm italic">Fresh milk is just a login away</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary-900 ml-1">Username</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
              <input 
                {...register('username')}
                type="text" 
                placeholder="Enter your username"
                className="w-full pl-12 pr-6 py-4 bg-primary-50/50 border border-primary-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-primary-200"
              />
            </div>
            {errors.username && <p className="text-red-500 text-xs font-bold ml-1">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-sm font-bold text-primary-900">Password</label>
              <a href="#" className="text-xs font-bold text-primary-500 hover:text-primary-700">Forgot?</a>
            </div>
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

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-500/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
            {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-primary-50 text-center">
          <p className="text-sm text-primary-400 font-medium mb-6">Or continue with</p>
          <div className="flex gap-4">
            <button className="flex-1 py-3 border border-primary-100 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-primary-900 hover:bg-primary-50 transition-all">
              <Github className="w-4 h-4" />
              Github
            </button>
            <button className="flex-1 py-3 border border-primary-100 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-primary-900 hover:bg-primary-50 transition-all">
              <span className="text-blue-500 font-bold">G</span>
              Google
            </button>
          </div>
          <p className="mt-8 text-sm text-primary-900 font-medium">
            Don't have an account? <a href="/register" className="text-primary-600 font-black hover:underline px-1">Sign Up</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
