import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";

type ToastType = "success" | "warning" | "error";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, message };
    
    setToasts((prev) => [...prev, newToast]);
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getBorderColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "border-l-green-600";
      case "warning":
        return "border-l-orange-600";
      case "error":
        return "border-l-red-600";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`bg-white rounded-lg shadow-lg border-l-4 ${getBorderColor(
              toast.type
            )} p-4 min-w-[320px] max-w-md animate-in slide-in-from-right`}
          >
            <div className="flex items-start gap-3">
              {getIcon(toast.type)}
              <p className="flex-1 text-sm text-gray-900">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
