import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { authApi } from '../api/auth';
import useAuthStore from '../store/useAuthStore';
import useToast from './useToast';

// ... existing mutations ...

export const useUserQuery = () => {
  const { token, setUser, logout } = useAuthStore();

  const query = useQuery({
    queryKey: ['user', token],
    queryFn: authApi.getMe,
    enabled: !!token,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.error) {
      // If 401, logout
      if (query.error?.status === 401) {
        logout();
      }
    }
  }, [query.error, logout]);

  return query;
};


export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setLogin } = useAuthStore();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setLogin(data);
      success('Login successful!');
      navigate('/kyc');
    },
    onError: (err) => {
      const message = err?.detail || err?.message || 'Login failed';
      error(message);
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      success('Registration successful! Please log in.');
      navigate('/login');
    },
    onError: (err) => {
      const message = err?.detail || err?.message || 'Registration failed';
      error(message);
    },
  });
};

export const useForgotPasswordMutation = () => {
  const { success, error } = useToast();

  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      success('If the email exists, a reset link has been sent.');
    },
    onError: (err) => {
      const message = err?.detail || err?.message || 'Failed to send reset email';
      error(message);
    },
  });
};

export const useResetPasswordMutation = () => {
  const { success, error } = useToast();

  return useMutation({
    mutationFn: ({ token, newPassword }) => {
      return authApi.resetPassword(token, newPassword);
    },
    onSuccess: () => {
      success('Password reset successfully!');
    },
    onError: (err) => {
      const message = err?.detail || err?.message || 'Failed to reset password';
      error(message);
    },
  });
};
