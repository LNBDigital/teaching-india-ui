"use client";
import React, { useCallback, useState } from "react";
import ToastContext from "./Toast";

interface Toast {
  id: string;
  message: string;
}

interface ToastContextType{
    addToast:(message:string)=>void;
    toasts:Toast[];
}

export default function ToastProvider({ children }: {children:React.ReactNode}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  //add toast
const addToast = useCallback((message: string) => {
  const id = Date.now().toString();
  setToasts((prev) => [...prev, { id, message }]);

  setTimeout(() => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, 4000); // 3 seconds
}, []);

  const value: ToastContextType ={
    addToast,
    toasts
  }
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-10 right-4 z-50 space-y-2">
        {toasts.map(({id, message}) => (
          <div key={id} className="bg-black text-white px-4 py-2 rounded shadow">
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
