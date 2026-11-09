import React from 'react';

export const FloatingShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Top Left Yellow Star */}
      <div className="absolute -top-6 -left-6 w-28 h-28 bg-sunny rounded-full opacity-60 blur-xl animate-float-slow" />
      
      {/* Top Right Sky Blob */}
      <div className="absolute top-12 -right-8 w-40 h-40 bg-sky rounded-full opacity-50 blur-2xl animate-float-medium" />
      
      {/* Floating geometric decorative elements */}
      <div className="absolute top-24 left-[8%] hidden md:block animate-float-slow opacity-80">
        <div className="w-10 h-10 border-4 border-ink rounded-xl bg-sunny transform -rotate-12 flex items-center justify-center font-heading text-lg font-bold shadow-pop-sm">
          ✦
        </div>
      </div>

      <div className="absolute top-40 right-[10%] hidden md:block animate-float-medium opacity-80" style={{ animationDelay: '1.5s' }}>
        <div className="w-12 h-12 border-4 border-ink rounded-full bg-mint flex items-center justify-center font-heading text-xl shadow-pop-sm">
          🧪
        </div>
      </div>

      <div className="absolute top-[60%] left-[5%] hidden lg:block animate-float-slow opacity-80" style={{ animationDelay: '2.5s' }}>
        <div className="w-11 h-11 border-4 border-ink rounded-xl bg-coral transform rotate-12 flex items-center justify-center text-lg shadow-pop-sm">
          💡
        </div>
      </div>

      <div className="absolute top-[75%] right-[7%] hidden lg:block animate-float-medium opacity-80" style={{ animationDelay: '0.8s' }}>
        <div className="w-10 h-10 border-4 border-ink rounded-full bg-lavender flex items-center justify-center font-heading text-lg font-bold shadow-pop-sm">
          ∑
        </div>
      </div>

      {/* Floating small stars */}
      <div className="absolute top-1/3 left-[20%] hidden xl:block text-coral text-2xl font-bold opacity-60 animate-wiggle">
        ★
      </div>
      <div className="absolute top-2/3 right-[18%] hidden xl:block text-sunny-dark text-xl font-bold opacity-70 animate-float-slow">
        ▲
      </div>
    </div>
  );
};
