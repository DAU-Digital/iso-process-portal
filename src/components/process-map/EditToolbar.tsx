"use client";

import React from 'react';
import { Panel } from '@xyflow/react';
import { Button } from "@/components/ui/button";
import {
  Pencil, Plus, Link2, Save, LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface EditToolbarProps {
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  connectMode: boolean;
  setConnectMode: (v: boolean) => void;
  isSaving: boolean;
  onAddNode: () => void;
  onLogout: () => void;
}

export function EditToolbar({
  editMode,
  setEditMode,
  connectMode,
  setConnectMode,
  isSaving,
  onAddNode,
  onLogout,
}: EditToolbarProps) {
  return (
    <Panel position="top-right" className="m-8">
      <div className="flex items-center gap-2 bg-popover/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-2">
        <Button
          variant={editMode ? "default" : "ghost"}
          size="sm"
          className={`gap-2 rounded-xl text-xs font-semibold transition-all ${editMode 
            ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20' 
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
          onClick={() => setEditMode(!editMode)}
        >
          <Pencil className="w-3.5 h-3.5" />
          {editMode ? 'Đang chỉnh sửa' : 'Chỉnh sửa'}
        </Button>

        {editMode && (
          <>
            <div className="w-px h-6 bg-border" />
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 rounded-xl text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
              onClick={onAddNode}
            >
              <Plus className="w-3.5 h-3.5" />
              Thêm node
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              onClick={() => setConnectMode(!connectMode)}
            >
              <Link2 className="w-3.5 h-3.5" />
              {connectMode ? 'Tắt nối' : 'Nối edge'}
            </Button>
          </>
        )}

        <div className="w-px h-6 bg-border" />
        <ThemeToggle />
        
        <div className="w-px h-6 bg-border" />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          onClick={onLogout}
          title="Đăng xuất khỏi hệ thống"
        >
          <LogOut className="w-4 h-4" />
        </Button>

        {/* Save indicator */}
        {editMode && isSaving && (
          <>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-1.5 text-xs text-amber-400 animate-pulse px-2">
              <Save className="w-3.5 h-3.5" />
              <span>Đang lưu...</span>
            </div>
          </>
        )}
      </div>
      {editMode && (
        <p className="text-[10px] text-purple-400/80 mt-2 text-center animate-pulse">
          ✨ Chế độ chỉnh sửa — Kéo node, click edge để xóa, kéo handle để nối • Tự động lưu vào Supabase
        </p>
      )}
    </Panel>
  );
}
