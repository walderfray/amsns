import { create } from 'zustand';

const useToastStore = create((set) => ({
  toast: null, // { message, type: 'info' | 'success' | 'error', id }
  
  showToast: (message, type = 'info') => {
    const id = Date.now();
    set({ toast: { message, type, id } });

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      set((state) => {
        // Only dismiss if it's the same toast (check ID)
        if (state.toast?.id === id) {
          return { toast: null };
        }
        return state;
      });
    }, 3000);
  },

  hideToast: () => set({ toast: null }),
}));

export default useToastStore;
