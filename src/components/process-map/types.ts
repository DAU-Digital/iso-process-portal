// ============================================================
// TYPES, CONSTANTS & THEME CONFIG
// ============================================================

import documentMapping from '@/data/document-mapping.json';

// --- Document Mapping ---
export interface DocMapEntry {
  storagePath: string;
  publicUrl: string;
  type: 'pdf' | 'image';
  originalRelativePath: string;
}
export const docMap = documentMapping as Record<string, DocMapEntry>;

// --- Status Types ---
export type GroupStatus = 'completed' | 'in_progress' | 'not_started';

export const groupStatusConfig: Record<GroupStatus, { label: string; emoji: string }> = {
  completed:   { label: 'Hoàn thành',   emoji: '✅' },
  in_progress: { label: 'Đang triển khai', emoji: '🔄' },
  not_started: { label: 'Chưa bắt đầu',  emoji: '⏳' },
};

export const groupStatusColors = {
  dark: {
    completed:   { bg: 'rgba(22, 163, 74, 0.10)', border: '#22c55e', text: '#86efac', titleColor: '#bbf7d0' },
    in_progress: { bg: 'rgba(245, 158, 11, 0.10)', border: '#f59e0b', text: '#fcd34d', titleColor: '#fef08a' },
    not_started: { bg: 'rgba(100, 116, 139, 0.10)', border: '#64748b', text: '#94a3b8', titleColor: '#cbd5e1' },
  },
  light: {
    completed:   { bg: 'rgba(22, 163, 74, 0.06)', border: '#16a34a', text: '#166534', titleColor: '#15803d' },
    in_progress: { bg: 'rgba(245, 158, 11, 0.06)', border: '#d97706', text: '#92400e', titleColor: '#b45309' },
    not_started: { bg: 'rgba(100, 116, 139, 0.06)', border: '#94a3b8', text: '#64748b', titleColor: '#475569' },
  },
};

// --- Dual Theme Palettes ---
export const themes = {
  dark: {
    bgColor: '#0c1222',
    nodeBg: '#131d33',
    groupBg: 'rgba(19, 29, 51, 0.6)',
    textColor: '#edf0f7',
    primaryBorder: '#4f7bea',
    borderColor: '#2a3654',
    endBorder: '#2dd66f',
    startText: '#6fa3f7',
    groupBorder: '#2a3654',
    groupTextColor: '#8a95ab',
    titleColor: '#d8dfe9',
    procBoxBg: 'rgba(19, 29, 51, 0.35)',
    procBoxBorder: '#3d5078',
    procBoxText: '#b0bcce',
    edgeColor: '#3d5078',
    gridColor: '#2a3654',
    shadow: '0 4px 12px -2px rgb(0 0 0 / 0.4), 0 1px 3px rgb(0 0 0 / 0.2)',
  },
  light: {
    bgColor: '#f8fafc',
    nodeBg: '#ffffff',
    groupBg: 'rgba(241, 245, 249, 0.8)',
    textColor: '#1e293b',
    primaryBorder: '#3b82f6',
    borderColor: '#e2e8f0',
    endBorder: '#16a34a',
    startText: '#2563eb',
    groupBorder: '#cbd5e1',
    groupTextColor: '#64748b',
    titleColor: '#334155',
    procBoxBg: 'rgba(241, 245, 249, 0.6)',
    procBoxBorder: '#94a3b8',
    procBoxText: '#475569',
    edgeColor: '#94a3b8',
    gridColor: '#e2e8f0',
    shadow: '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 1px 3px rgb(0 0 0 / 0.06)',
  },
};

// --- Resolved Document Type ---
export interface ResolvedDoc {
  name: string;
  url: string;
  type: 'pdf' | 'image';
  category: 'reference' | 'document' | 'form';
}

// --- Process Schema & Map Types ---
import { Node as ReactFlowNode, Edge as ReactFlowEdge } from '@xyflow/react';

export interface ProcessSchemaGroup {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ProcessSchemaDetails {
  description?: string;
  actor?: string;
  form?: string;
}

export interface ProcessSchemaProcess {
  id: string;
  title: string;
  steps: string[];
  step_details: ProcessSchemaDetails[];
  reference?: string;
  forms?: string[];
  documents?: string[];
  status?: GroupStatus;
}

export interface ProcessSchemaMapItem {
  group: ProcessSchemaGroup;
  processes: ProcessSchemaProcess[];
}

export type ProcessNodeData = {
  label: string;
  description?: string;
  actor?: string;
  status?: string;
  _processId?: string;
  _stepIndex?: number;
  _stepText?: string;
  _isTaskNode?: boolean;
  reference?: string;
  forms?: string[] | string;
  documents?: string[] | string;
  stepForm?: string;
  [key: string]: unknown;
};

export type ProcessNode = ReactFlowNode<ProcessNodeData>;
export type ProcessEdge = ReactFlowEdge;

// --- Available Modules ---
export const AVAILABLE_MODULES = [
  { id: 'KHAO THI', name: 'Khảo thí' },
  { id: 'P.CTSV', name: 'Phòng Công tác Sinh viên (CTSV)' },
  { id: 'P.DAOTAO', name: 'Phòng Đào tạo' },
  { id: 'P.HC-TH', name: 'Phòng Hành chính - Tổng hợp (HC-TH)' },
  { id: 'P.HTQT-TT', name: 'Phòng Hợp tác Quốc tế & Truyền thông (HTQT-TT)' },
  { id: 'P.KH-CN', name: 'Phòng Khoa học Công nghệ (KH-CN)' },
  { id: 'P.QLDA và QTTB', name: 'Phòng Quản lý Dự án & Quản trị Thiết bị' },
  { id: 'P.TCKT', name: 'Phòng Tài chính Kế toán (TCKT)' },
  { id: 'P.TCNS', name: 'Phòng Tổ chức Nhân sự (TCNS)' },
  { id: 'P.TTPC', name: 'Phòng Thanh tra - Pháp chế (TTPC)' },
  { id: 'P.Tuyensinh', name: 'Phòng Tuyển sinh' },
];
