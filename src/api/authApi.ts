import axiosInstance from './axiosConfig';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequest {
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await axiosInstance.post<LoginResponse>('/authentication/login', data);
    return response.data;
  },
  signUp: async (data: SignUpRequest) => {
    const response = await axiosInstance.post('/authentication/sign-up', data);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },
};
