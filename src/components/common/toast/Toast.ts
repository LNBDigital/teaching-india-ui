"use client";
import { createContext, useContext } from "react";

interface Toast{
    id:string;
    message:string;
}

interface ToastContextType{
    addToast:(message:string)=>void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);
export const useToast = ()=> {
    const context = useContext(ToastContext);
    return context;
};
export default ToastContext;