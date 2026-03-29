"use client";

import React from 'react';
import { Panel } from '@xyflow/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GitBranch, ChevronUp, ChevronDown, Filter,
} from "lucide-react";

import { GroupStatus, AVAILABLE_MODULES, groupStatusConfig, groupStatusColors } from './types';

interface InfoPanelProps {
  isPanelExpanded: boolean;
  setIsPanelExpanded: (v: boolean) => void;
  selectedModule: string;
  setSelectedModule: (v: string) => void;
  isDark: boolean;
  statusFilter: Record<GroupStatus, boolean>;
  setStatusFilter: React.Dispatch<React.SetStateAction<Record<GroupStatus, boolean>>>;
}

export function InfoPanel({
  isPanelExpanded,
  setIsPanelExpanded,
  selectedModule,
  setSelectedModule,
  isDark,
  statusFilter,
  setStatusFilter,
}: InfoPanelProps) {
  return (
    <Panel position="top-left" className="m-8 pointer-events-none flex flex-col sm:flex-row items-start gap-4">
      <div className={`bg-popover/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl transition-all duration-300 pointer-events-auto overflow-hidden ${isPanelExpanded ? 'p-6 max-w-sm' : 'p-3 w-auto'}`}>
        <div className="flex items-center justify-between gap-4">
          <div className={`flex items-center gap-3 ${isPanelExpanded ? 'mb-4' : ''}`}>
            <div className={`${isPanelExpanded ? 'w-12 h-12' : 'w-10 h-10'} transition-all bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20`}>
              <GitBranch className={`${isPanelExpanded ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
            </div>
            {!isPanelExpanded && (
              <h1 className="text-sm font-medium text-foreground whitespace-nowrap pr-2">
                {AVAILABLE_MODULES.find(m => m.id === selectedModule)?.name || 'Mạng lưới số hóa'}
              </h1>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`hover:bg-muted text-muted-foreground hover:text-foreground rounded-full h-8 w-8 ${isPanelExpanded ? 'mb-auto -mt-2 -mr-2' : ''}`}
            onClick={() => setIsPanelExpanded(!isPanelExpanded)}
          >
            {isPanelExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
        
        {isPanelExpanded && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <h1 className="text-xl font-bold text-foreground mb-3 mt-1 tracking-tight">Trung tâm số hóa DAU</h1>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Quản lý tổng quan về trạng thái tiến trình số hóa phân hệ <strong className="text-foreground">{AVAILABLE_MODULES.find(m => m.id === selectedModule)?.name}</strong>.
            </p>

            {selectedModule === 'finance' && (
              <div className="animate-in fade-in slide-in-from-top-1 mb-4 flex flex-wrap gap-2 text-[11px] font-medium">
                <Badge variant="secondary" className="pointer-events-none border border-blue-500/20 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">18 Quy trình thao tác</Badge>
                <Badge variant="secondary" className="pointer-events-none border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">5 Vùng dữ liệu</Badge>
              </div>
            )}

            {/* Status Legend with Filter Checkboxes */}
            <div className="border-t border-border pt-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Filter className="w-3 h-3 text-muted-foreground" />
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Lọc theo trạng thái</p>
              </div>
              <div className="space-y-1">
                {(['completed', 'in_progress', 'not_started'] as GroupStatus[]).map((status) => {
                  const sc = (isDark ? groupStatusColors.dark : groupStatusColors.light)[status];
                  const cfg = groupStatusConfig[status];
                  const isChecked = statusFilter[status];
                  return (
                    <label
                      key={status}
                      className={`flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/50 ${!isChecked ? 'opacity-40' : ''}`}
                      onClick={() => setStatusFilter(prev => ({ ...prev, [status]: !prev[status] }))}
                    >
                      <div
                        className="w-4 h-4 rounded-[5px] border-2 flex-shrink-0 flex items-center justify-center transition-all"
                        style={{
                          borderColor: sc.border,
                          backgroundColor: isChecked ? sc.border : 'transparent',
                        }}
                      >
                        {isChecked && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-foreground font-medium select-none">{cfg.emoji} {cfg.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== MODULE SELECTOR DROPDOWN (NEXT TO INFO PANEL) ===== */}
      <div className="pointer-events-auto bg-popover/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-1.5 w-[300px] animate-in fade-in slide-in-from-left-4 duration-500">
        <Select value={selectedModule} onValueChange={(val) => setSelectedModule(val || 'finance')}>
          <SelectTrigger className="w-full bg-background/50 border-none shadow-none h-10 font-medium transition-all hover:bg-muted/80 focus:ring-0 rounded-xl px-4 text-sm">
            <SelectValue placeholder="Chọn phân hệ...">
              {AVAILABLE_MODULES.find(m => m.id === selectedModule)?.name || 'Chọn phân hệ...'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} sideOffset={4} className="max-h-[60vh] rounded-xl border border-border shadow-2xl min-w-[280px]">
            {AVAILABLE_MODULES.map(module => (
               <SelectItem key={module.id} value={module.id} className="cursor-pointer text-xs sm:text-sm py-2">
                  {module.name}
               </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Panel>
  );
}
