import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://it360-webhooks.eastus.cloudapp.azure.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

interface TokenResponse {
  token: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface TimeEntry {
  cl_time_entry_id: string;
  status: string;
  notes: string;
  cw_time_entry_id: number;
  dt_start: string;
  dt_end: string;
  number_updates: number;
  cw_ticket_id: number;
  dt_created: string;
  dt_modified: string;
  cl_user: string;
  cw_user: number;
}

export interface TimeSheetResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TimeEntry[];
}

const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    if (error.response?.status === 403) {
      throw new Error('Access denied. Please check your credentials.');
    }
    if (error.response?.status === 401) {
      throw new Error('Session expired. Please login again.');
    }
    
    throw new Error(error.response?.data?.detail || 'An error occurred. Please try again.');
  }
  throw error;
};

export const authApi = {
  register: async (data: RegisterData): Promise<TokenResponse> => {
    try {
      const formData = new FormData();
      formData.append('username', data.email);
      formData.append('email', data.email);
      formData.append('password', data.password);

      const response = await api.post<TokenResponse>('/apis/register', formData);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
  
  login: async (data: LoginData): Promise<TokenResponse> => {
    try {
      const response = await api.post<TokenResponse>('/apis/login', {
        username: data.email,
        password: data.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
};

export const timesheetApi = {
  getTimesheets: async (params?: { 
    status?: string;
    page?: number;
    start_date?: string;
    end_date?: string;
    order_by?: string;
  }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.get<TimeSheetResponse>('/apis/timesheets', {
        headers: {
          Authorization: `Token ${token}`,
        },
        params,
      });
      
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});