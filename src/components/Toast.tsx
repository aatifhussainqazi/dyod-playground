import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
      <div className="px-5 py-2.5 rounded-2xl bg-ink text-white font-heading font-bold text-xs sm:text-sm shadow-pop-lg flex items-center gap-2 border-2 border-white">
        <span>{message}</span>
      </div>
    </div>
  );
};
