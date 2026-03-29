"use client";

import React from 'react';
import { FileText, Image as ImageIcon, Eye } from "lucide-react";
import { ResolvedDoc } from './types';

interface DocumentRowProps {
  doc: ResolvedDoc;
  onPreview: (doc: ResolvedDoc) => void;
  isActive: boolean;
}

export function DocumentRow({ doc, onPreview, isActive }: DocumentRowProps) {
  const isPdf = doc.type === 'pdf';
  return (
    <div
      className={`group flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
        isActive
          ? 'border-primary/40 bg-primary/5 shadow-sm'
          : 'border-border hover:border-primary/20 hover:bg-muted/50'
      }`}
      onClick={() => onPreview(doc)}
    >
      <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
        isPdf ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
      }`}>
        {isPdf ? <FileText className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
        <p className="text-xs text-muted-foreground">
          {isPdf ? 'PDF Document' : 'Hình ảnh biểu mẫu'}
        </p>
      </div>
      <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Eye className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}
