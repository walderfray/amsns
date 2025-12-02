import useToastStore from '../store/useToastStore';

const useToast = () => {
  const { showToast, hideToast } = useToastStore();
  
  return {
    toast: useToastStore((state) => state.toast),
    showToast,
    hideToast,
    info: (message) => showToast(message, 'info'),
    success: (message) => showToast(message, 'success'),
    error: (message) => showToast(message, 'error'),
  };
};

export default useToast;
