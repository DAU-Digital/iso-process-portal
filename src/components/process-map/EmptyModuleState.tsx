"use client";

import React from 'react';
import { GitBranch } from "lucide-react";
import { AVAILABLE_MODULES } from './types';

interface EmptyModuleStateProps {
  selectedModule: string;
  hasData: boolean;
}

export function EmptyModuleState({ selectedModule, hasData }: EmptyModuleStateProps) {
  if (hasData) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="bg-popover/80 backdrop-blur-xl border border-border rounded-3xl p-8 flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.1)] max-w-sm text-center animate-in zoom-in-95 fade-in duration-500">
        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-border shadow-black/5">
          <GitBranch className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold font-cal mb-3 text-foreground tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">Nền tảng Tương lai</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Mạng lưới quy trình của <strong className="text-foreground">{AVAILABLE_MODULES.find(m => m.id === selectedModule)?.name}</strong> hiện đang nằm trong lộ trình triển khai số hoá và sẽ sớm được ra mắt trên cổng thông tin.
        </p>
      </div>
    </div>
  );
}
