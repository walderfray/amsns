import React from "react";
import useToastStore from "../store/useToastStore";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const Toast = () => {
  const { toast, hideToast } = useToastStore();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case "success":
        return "border-green-500 bg-white";
      case "error":
        return "border-red-500 bg-white";
      default:
        return "border-blue-500 bg-white";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[100] animate-fade-in-down">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-l-4 ${getStyles()} min-w-[300px] max-w-md`}
      >
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1 text-sm font-medium text-gray-800">
          {toast.message}
        </div>
        <button
          onClick={hideToast}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
