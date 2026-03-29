"use client";

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  BackgroundVariant,
  Panel,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Download, CheckCircle2, User, GitBranch,
  ChevronUp, ChevronDown, Plus, Pencil, Trash2,
  Save, X, Link2, Unlink, FileText, Image as ImageIcon,
  ExternalLink, Eye, ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  RefreshCw, Filter,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";

import documentMapping from '@/data/document-mapping.json';

// Type for document mapping entries
interface DocMapEntry {
  storagePath: string;
  publicUrl: string;
  type: 'pdf' | 'image';
  originalRelativePath: string;
}
const docMap = documentMapping as Record<string, DocMapEntry>;

// --- DUAL-THEME PALETTES ---
type GroupStatus = 'completed' | 'in_progress' | 'not_started';

const groupStatusConfig: Record<GroupStatus, { label: string; emoji: string }> = {
  completed:   { label: 'Hoàn thành',   emoji: '✅' },
  in_progress: { label: 'Đang triển khai', emoji: '🔄' },
  not_started: { label: 'Chưa bắt đầu',  emoji: '⏳' },
};

const groupStatusColors = {
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

const themes = {
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

// --- DOCUMENT HELPERS ---
interface ResolvedDoc {
  name: string;
  url: string;
  type: 'pdf' | 'image';
  category: 'reference' | 'document' | 'form';
}

function resolveDocUrl(filename: string): { url: string; type: 'pdf' | 'image' } | null {
  const entry = docMap[filename];
  if (entry) return { url: entry.publicUrl, type: entry.type };
  return null;
}

function getNodeDocuments(node: any): ResolvedDoc[] {
  const docs: ResolvedDoc[] = [];
  
  // Reference (main process PDF)
  if (node.data.reference) {
    const resolved = resolveDocUrl(node.data.reference);
    if (resolved) {
      docs.push({ name: node.data.reference, ...resolved, category: 'reference' });
    }
  }
  
  // Related documents
  if (node.data.documents && Array.isArray(node.data.documents)) {
    for (const docName of node.data.documents) {
      const resolved = resolveDocUrl(docName);
      if (resolved) {
        docs.push({ name: docName, ...resolved, category: 'document' });
      }
    }
  }
  
  // Forms
  if (node.data.forms && Array.isArray(node.data.forms)) {
    for (const formName of node.data.forms) {
      const resolved = resolveDocUrl(formName);
      if (resolved) {
        docs.push({ name: formName, ...resolved, category: 'form' });
      }
    }
  }
  
  return docs;
}

// --- DOCUMENT ROW COMPONENT ---
function DocumentRow({ doc, onPreview, isActive }: { doc: ResolvedDoc; onPreview: (doc: ResolvedDoc) => void; isActive: boolean }) {
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

// --- HELPER: Get process status from schema ---
function getProcessStatus(schema: any[], processId: string): GroupStatus | null {
  for (const group of schema) {
    for (const proc of group.processes) {
      if (proc.id === processId) return (proc.status as GroupStatus) || 'not_started';
    }
  }
  return null;
}

// --- SCHEMA & DATA GENERATOR ---
function generateNetwork(mapSchema: any[], isDark: boolean) {
  const t = isDark ? themes.dark : themes.light;
  const defaultStyle = {
    background: t.nodeBg,
    color: t.textColor,
    border: `1px solid ${t.borderColor}`,
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '13px',
    boxShadow: t.shadow,
    width: 260,
  };

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Layout constants
  const PADDING_X = 50;
  const PADDING_Y = 130;
  const COLUMN_SPACING = 330;
  const ROW_SPACING = 140;
  const GROUP_GAP_X = 80;         // horizontal gap between groups
  const GROUP_GAP_Y = 100;        // vertical gap between group rows
  const MAX_ROW_WIDTH = 8000;     // max width before wrapping to new row

  // ——— STEP 1: Pre-compute each group's size ———
  interface GroupLayout {
    def: any;
    width: number;
    height: number;
    x: number;
    y: number;
  }
  
  const groupLayouts: GroupLayout[] = mapSchema.map(def => {
    let maxSteps = 0;
    def.processes.forEach((proc: any) => {
      if (proc.steps.length > maxSteps) maxSteps = proc.steps.length;
    });
    const width = Math.max(def.processes.length * COLUMN_SPACING + 80, 500);
    const height = Math.max(maxSteps * ROW_SPACING + 180, 440);
    return { def, width, height, x: 0, y: 0 };
  });

  // ——— STEP 2: Auto-arrange groups in rows ———
  let cursorX = 0;
  let cursorY = 0;
  let rowMaxHeight = 0;

  groupLayouts.forEach(gl => {
    // Wrap to next row if this group would exceed max width
    if (cursorX > 0 && cursorX + gl.width > MAX_ROW_WIDTH) {
      cursorX = 0;
      cursorY += rowMaxHeight + GROUP_GAP_Y;
      rowMaxHeight = 0;
    }
    gl.x = cursorX;
    gl.y = cursorY;
    cursorX += gl.width + GROUP_GAP_X;
    if (gl.height > rowMaxHeight) rowMaxHeight = gl.height;
  });

  // ——— STEP 3: Generate nodes and edges ———
  const statusTheme = isDark ? groupStatusColors.dark : groupStatusColors.light;

  groupLayouts.forEach(({ def, width: calculatedWidth, height: calculatedHeight, x: groupX, y: groupY }) => {
    // Group container: neutral colors (no status on groups)
    nodes.push({
      id: `group-${def.group.id}`,
      data: { label: def.group.label },
      position: { x: groupX, y: groupY },
      className: 'light',
      style: {
        backgroundColor: t.groupBg,
        width: calculatedWidth,
        height: calculatedHeight,
        border: `1px solid ${t.groupBorder}`,
        borderRadius: '24px',
        color: t.groupTextColor,
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '24px',
        opacity: 0.9,
      },
      type: 'group',
    });

    nodes.push({
      id: `title-${def.group.id}`,
      parentId: `group-${def.group.id}`,
      position: { x: 30, y: 20 },
      draggable: false,
      selectable: false,
      data: { label: def.group.label },
      style: {
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        color: t.titleColor,
        fontSize: '20px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        width: calculatedWidth - 60,
        textAlign: 'left' as const,
      }
    });

    def.processes.forEach((proc: any, index: number) => {
      const baseX = PADDING_X + index * COLUMN_SPACING;
      const processHeight = proc.steps.length * ROW_SPACING + 30;

      // Determine process status color
      const procStatus: GroupStatus = proc.status || 'not_started';
      const psc = statusTheme[procStatus];
      const procStatusCfg = groupStatusConfig[procStatus];

      nodes.push({
        id: `proc-box-${proc.id}`,
        parentId: `group-${def.group.id}`,
        position: { x: baseX - 25, y: PADDING_Y - 60 },
        draggable: false,
        selectable: false,
        data: { label: `${procStatusCfg.emoji} ${proc.title}` },
        zIndex: -1,
        style: {
          width: 310,
          height: processHeight,
          backgroundColor: psc.bg,
          border: `2px solid ${psc.border}`,
          borderRadius: '16px',
          color: psc.titleColor,
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '16px',
          textAlign: 'center',
          pointerEvents: 'none',
        }
      });

      proc.steps.forEach((step: any, stepIndex: number) => {
        const nodeId = `n-${proc.id}-${stepIndex}`;
        const isStart = stepIndex === 0;
        const isEnd = stepIndex === proc.steps.length - 1;
        
        let nodeBorderColor = t.borderColor;
        if (isStart) nodeBorderColor = t.primaryBorder;
        if (isEnd) nodeBorderColor = t.endBorder;

        nodes.push({
          id: nodeId,
          position: { x: baseX, y: PADDING_Y + stepIndex * ROW_SPACING },
          parentId: `group-${def.group.id}`,
          extent: 'parent',
          data: { 
            label: stepIndex === 0 ? proc.title : step,
            description: proc.step_details?.[stepIndex]?.description 
              || `Chi tiết bước "${step}" của Quy trình gốc: ${proc.title}. Cần tích hợp với bản mềm ISO đang lưu trữ để số hóa cụ thể.`,
            actor: proc.step_details?.[stepIndex]?.actor 
              || (isStart ? 'Người khởi tạo' : 'Người duyệt (Đang bóc tách)'),
            stepForm: proc.step_details?.[stepIndex]?.form || null,
            status: isStart ? 'Bắt đầu' : (isEnd ? 'Kết thúc' : 'Thực thi'),
            reference: (proc as any).reference,
            forms: (proc as any).forms,
            documents: (proc as any).documents,
            _processId: proc.id,
            _stepIndex: stepIndex,
            _stepText: step,
            _isTaskNode: true,
          },
          style: {
            ...defaultStyle,
            border: `1px solid ${nodeBorderColor}`,
            fontWeight: isStart ? 'bold' : 'normal',
            color: isStart ? t.startText : t.textColor,
          }
        });

        if (stepIndex > 0) {
          const prevId = `n-${proc.id}-${stepIndex - 1}`;
          edges.push({
            id: `edge-${prevId}-${nodeId}`,
            source: prevId,
            target: nodeId,
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed, color: t.edgeColor },
            style: { stroke: t.edgeColor, strokeWidth: 1.5 }
          });
        }
      });
    });
  });

  return { initialNodes: nodes, initialEdges: edges };
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ProcessMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // --- Theme (with mounted guard to prevent hydration mismatch) ---
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme !== 'light' : true; // default dark during SSR
  const t = isDark ? themes.dark : themes.light;

  // --- Edit Mode ---
  const [editMode, setEditMode] = useState(false);

  // --- Edit Node Dialog ---
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({ label: '', description: '', actor: '' });

  // --- Add Node Dialog ---
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addForm, setAddForm] = useState({ label: '', description: '', actor: '' });

  // --- Delete Confirm Dialog ---
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<any>(null);

  // --- Edge Delete Dialog ---
  const [deleteEdgeDialogOpen, setDeleteEdgeDialogOpen] = useState(false);
  const [edgeToDelete, setEdgeToDelete] = useState<any>(null);

  // --- Connect Edge Mode ---
  const [connectMode, setConnectMode] = useState(false);

  // --- Document Preview ---
  const [previewDoc, setPreviewDoc] = useState<ResolvedDoc | null>(null);
  const [imageZoom, setImageZoom] = useState(1);

  // --- Status filter (checkboxes in legend) ---
  const [statusFilter, setStatusFilter] = useState<Record<GroupStatus, boolean>>({
    completed: true,
    in_progress: true,
    not_started: true,
  });
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Track raw schema for reference
  const schemaRef = useRef<any[]>([]);
  const edgesInitializedRef = useRef(false);

  // ---- LOAD DATA ----
  useEffect(() => {
    async function loadData() {
      try {
        const { data: groups, error } = await supabase
          .from('process_groups')
          .select('*, processes(*)');
          
        if (error) throw error;
        
        if (groups && groups.length > 0) {
          const formattedSchema = groups.map((g: any) => ({
             group: { id: g.id, label: g.label, x: g.x, y: g.y, width: g.width, height: g.height },
             processes: g.processes.map((p: any) => ({
                 id: p.id,
                 title: p.title,
                 steps: p.steps,
                 step_details: p.step_details,
                 reference: p.reference,
                 forms: p.forms,
                 documents: p.documents,
                 status: p.status || 'not_started',
             })).sort((a: any, b: any) => {
                 return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' })
             })
          })).sort((a: any, b: any) => a.group.x - b.group.x || a.group.y - b.group.y);
          
          schemaRef.current = formattedSchema;
          const { initialNodes, initialEdges } = generateNetwork(formattedSchema, isDark);

          // ---- Load saved node positions from Supabase ----
          const { data: savedPositions } = await supabase
            .from('node_positions')
            .select('*');

          if (savedPositions && savedPositions.length > 0) {
            const posMap = new Map(savedPositions.map((p: any) => [p.node_id, { x: p.x, y: p.y }]));
            initialNodes.forEach((node) => {
              const saved = posMap.get(node.id) as { x: number; y: number } | undefined;
              if (saved) {
                node.position = { x: saved.x, y: saved.y };
              }
            });
          }

          setNodes(initialNodes);

          // ---- Load saved edges from Supabase ----
          const { data: savedEdges } = await supabase
            .from('map_edges')
            .select('*');

          if (savedEdges && savedEdges.length > 0) {
            // Use saved edges (they include custom ones + deleted ones are absent)
            const restoredEdges = savedEdges.map((e: any) => ({
              id: e.id,
              source: e.source,
              target: e.target,
              animated: e.animated ?? true,
              markerEnd: { type: MarkerType.ArrowClosed, color: isDark ? themes.dark.edgeColor : themes.light.edgeColor },
              style: { stroke: isDark ? themes.dark.edgeColor : themes.light.edgeColor, strokeWidth: 1.5 },
            }));
            setEdges(restoredEdges);
            edgesInitializedRef.current = true;
          } else {
            // First time: seed edges from generated data
            setEdges(initialEdges);
            // Save generated edges to Supabase
            const edgeRows = initialEdges.map((e) => ({
              id: e.id,
              source: e.source,
              target: e.target,
              animated: true,
            }));
            if (edgeRows.length > 0) {
              await supabase.from('map_edges').upsert(edgeRows, { onConflict: 'id' });
            }
            edgesInitializedRef.current = true;
          }
        }
      } catch (err) {
        console.error('Failed to load process map schema from Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [setNodes, setEdges, isDark]);

  // ---- UPDATE PROCESS STATUS ----
  const handleUpdateProcessStatus = useCallback(async (processId: string, newStatus: GroupStatus) => {
    setIsUpdatingStatus(true);
    try {
      const { error } = await supabase
        .from('processes')
        .update({ status: newStatus })
        .eq('id', processId);
      
      if (error) throw error;

      // Update schemaRef
      schemaRef.current = schemaRef.current.map((group: any) => ({
        ...group,
        processes: group.processes.map((p: any) =>
          p.id === processId ? { ...p, status: newStatus } : p
        ),
      }));

      // Regenerate network to reflect color changes
      const { initialNodes, initialEdges } = generateNetwork(schemaRef.current, isDark);
      setNodes(initialNodes);
      setEdges(initialEdges);
    } catch (err) {
      console.error('Failed to update process status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  }, [isDark, setNodes, setEdges]);

  // ---- APPLY STATUS FILTER (hide/show nodes) ----
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        // Find if node belongs to a process and what status that process has
        const nodeId = node.id;
        // proc-box nodes
        if (nodeId.startsWith('proc-box-')) {
          const procId = nodeId.replace('proc-box-', '');
          const procStatus = getProcessStatus(schemaRef.current, procId);
          if (procStatus) {
            return { ...node, hidden: !statusFilter[procStatus] };
          }
        }
        // step nodes: n-{procId}-{stepIndex}
        if (nodeId.startsWith('n-')) {
          const parts = nodeId.split('-');
          // procId can have dashes so extract all but first and last
          const procId = parts.slice(1, -1).join('-');
          const procStatus = getProcessStatus(schemaRef.current, procId);
          if (procStatus) {
            return { ...node, hidden: !statusFilter[procStatus] };
          }
        }
        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        // edge source is like n-{procId}-{stepIndex}
        if (edge.source.startsWith('n-')) {
          const parts = edge.source.split('-');
          const procId = parts.slice(1, -1).join('-');
          const procStatus = getProcessStatus(schemaRef.current, procId);
          if (procStatus) {
            return { ...edge, hidden: !statusFilter[procStatus] };
          }
        }
        return edge;
      })
    );
  }, [statusFilter, setNodes, setEdges]);

  // ---- CONNECT EDGES (save to Supabase) ----
  const onConnect = useCallback(async (params: any) => {
    const edgeColor = isDark ? themes.dark.edgeColor : themes.light.edgeColor;
    const newEdge = {
      ...params,
      id: `edge-${params.source}-${params.target}`,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor },
      style: { stroke: edgeColor, strokeWidth: 1.5 }
    };
    setEdges((eds) => addEdge(newEdge, eds));
    // Persist
    await supabase.from('map_edges').upsert({
      id: newEdge.id,
      source: params.source,
      target: params.target,
      animated: true,
    }, { onConflict: 'id' });
  }, [setEdges, isDark]);

  // ---- SAVE NODE POSITION on drag end ----
  const onNodeDragStop = useCallback(async (_event: React.MouseEvent, node: any) => {
    setIsSaving(true);
    try {
      await supabase.from('node_positions').upsert({
        node_id: node.id,
        x: node.position.x,
        y: node.position.y,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'node_id' });
    } catch (err) {
      console.error('Failed to save node position:', err);
    } finally {
      setTimeout(() => setIsSaving(false), 500);
    }
  }, []);

  // Show a loading screen until mounted to avoid hydration mismatch on inline styles
  if (!mounted) {
    return (
      <div className="w-full h-full overflow-hidden relative bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Đang tải bản đồ quy trình...</div>
      </div>
    );
  }

  // ---- NODE CLICK ----
  const onNodeClick = (_event: React.MouseEvent, node: any) => {
    if (node.type === 'group') return;
    setSelectedNode(node);
    setSheetOpen(true);
  };

  // ---- EDGE CLICK (for delete in edit mode) ----
  const onEdgeClick = (_event: React.MouseEvent, edge: any) => {
    if (!editMode) return;
    setEdgeToDelete(edge);
    setDeleteEdgeDialogOpen(true);
  };

  // ---- EDIT NODE ----
  const handleOpenEditDialog = () => {
    if (!selectedNode) return;
    setEditForm({
      label: selectedNode.data.label || '',
      description: selectedNode.data.description || '',
      actor: selectedNode.data.actor || '',
    });
    setSheetOpen(false);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNode.id) {
          return {
            ...n,
            data: {
              ...n.data,
              label: editForm.label,
              description: editForm.description,
              actor: editForm.actor,
            },
          };
        }
        return n;
      })
    );
    setEditDialogOpen(false);
    setSelectedNode(null);
  };

  // ---- ADD NODE ----
  const handleOpenAddDialog = () => {
    setAddForm({ label: '', description: '', actor: '' });
    setAddDialogOpen(true);
  };

  const handleAddNode = async () => {
    const newId = `custom-node-${Date.now()}`;
    const newNode: Node = {
      id: newId,
      position: { x: Math.random() * 800 + 100, y: Math.random() * 400 + 100 },
      data: {
        label: addForm.label || 'Node mới',
        description: addForm.description || '',
        actor: addForm.actor || '',
        status: 'Tùy chỉnh',
        _isTaskNode: true,
      },
      style: {
        background: t.nodeBg,
        color: '#c084fc',
        border: '1px solid #a855f7',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '13px',
        boxShadow: t.shadow,
        width: 260,
        fontWeight: 'bold',
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setAddDialogOpen(false);
    // Save position to Supabase
    await supabase.from('node_positions').upsert({
      node_id: newId,
      x: newNode.position.x,
      y: newNode.position.y,
    }, { onConflict: 'node_id' });
  };

  // ---- DELETE NODE ----
  const handleOpenDeleteDialog = () => {
    if (!selectedNode) return;
    setNodeToDelete(selectedNode);
    setSheetOpen(false);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!nodeToDelete) return;
    const nodeId = nodeToDelete.id;
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => {
      const remaining = eds.filter((e) => e.source !== nodeId && e.target !== nodeId);
      return remaining;
    });
    setDeleteDialogOpen(false);
    setNodeToDelete(null);
    setSelectedNode(null);
    // Remove from Supabase
    await supabase.from('node_positions').delete().eq('node_id', nodeId);
    await supabase.from('map_edges').delete().or(`source.eq.${nodeId},target.eq.${nodeId}`);
  };

  const handleConfirmDeleteEdge = async () => {
    if (!edgeToDelete) return;
    const edgeId = edgeToDelete.id;
    setEdges((eds) => eds.filter((e) => e.id !== edgeId));
    setDeleteEdgeDialogOpen(false);
    setEdgeToDelete(null);
    // Remove from Supabase
    await supabase.from('map_edges').delete().eq('id', edgeId);
  };

  return (
    <div className="w-full h-full overflow-hidden relative" style={{ backgroundColor: t.bgColor }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={editMode ? onConnect : undefined}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onNodeDragStop={editMode ? onNodeDragStop : undefined}
        nodesDraggable={editMode}
        nodesConnectable={editMode}
        elementsSelectable={true}
        fitView
        fitViewOptions={{ padding: 0.1, minZoom: 0.05 }}
        className={isDark ? 'dark' : ''}
        minZoom={0.05}
        maxZoom={1.5}
      >
        <Controls showInteractive={false} className="!bg-card border-none fill-foreground text-foreground shadow-xl" />
        <Background gap={40} size={1} color={t.gridColor} variant={BackgroundVariant.Lines} />
        
        {/* ===== TOP-LEFT INFO PANEL ===== */}
        <Panel position="top-left" className="m-8 pointer-events-none">
          <div className={`bg-popover/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl transition-all duration-300 pointer-events-auto overflow-hidden ${isPanelExpanded ? 'p-6 max-w-sm' : 'p-3 w-auto'}`}>
            <div className="flex items-center justify-between gap-4">
              <div className={`flex items-center gap-3 ${isPanelExpanded ? 'mb-4' : ''}`}>
                <div className={`${isPanelExpanded ? 'w-12 h-12' : 'w-10 h-10'} transition-all bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20`}>
                  <GitBranch className={`${isPanelExpanded ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
                </div>
                {!isPanelExpanded && (
                  <h1 className="text-sm font-medium text-foreground whitespace-nowrap pr-2">Mạng lưới Vô cực TCKT</h1>
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
                <h1 className="text-2xl font-bold text-foreground mb-2">Trung tâm Kiểm soát Nghiệp vụ ISO</h1>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Phiên bản <strong>Mạng lưới Vô Cực</strong> mô tả toàn cảnh 18 quy trình ISO của P.TCKT. Cuộn chuột để thu phóng, click vào một công việc để xem chi tiết.
                </p>
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  <Badge variant="secondary" className="pointer-events-none border-none">18 Quy trình</Badge>
                  <Badge variant="secondary" className="pointer-events-none border-none">5 Phân hệ chính</Badge>
                </div>

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
        </Panel>

        {/* ===== TOP-RIGHT EDIT TOOLBAR ===== */}
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
                  onClick={handleOpenAddDialog}
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

      </ReactFlow>

      {/* ===== SIDE SHEET — Node Details (Wide + Document Viewer) ===== */}
      <Sheet open={sheetOpen} onOpenChange={(open) => { setSheetOpen(open); if (!open) { setPreviewDoc(null); setImageZoom(1); } }}>
        <SheetContent className="!bg-popover/95 backdrop-blur-3xl border-l border-border text-popover-foreground shadow-2xl sm:max-w-3xl p-0 flex flex-col h-full" showCloseButton={false}>
          {/* Fixed Header */}
          <SheetHeader className="p-6 pb-0 flex-shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <SheetTitle className="text-2xl font-bold flex items-start gap-3 text-foreground leading-tight">
                  <CheckCircle2 className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                  <span className="break-words">{selectedNode?.data?.label}</span>
                </SheetTitle>
                <SheetDescription className="text-muted-foreground text-sm mt-2 ml-10">
                  Khối thao tác thuộc hệ thống quy trình ISO P.TCKT.
                </SheetDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0 text-muted-foreground hover:text-foreground" onClick={() => setSheetOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>
          
          {selectedNode && (
            <Tabs defaultValue="details" className="flex-1 flex flex-col min-h-0 px-6 pt-4 pb-0">
              <TabsList variant="line" className="flex-shrink-0 w-full justify-start">
                <TabsTrigger value="details" className="gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Chi tiết
                </TabsTrigger>
                <TabsTrigger value="documents" className="gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  Tài liệu
                  {(() => {
                    const allDocs = getNodeDocuments(selectedNode);
                    return allDocs.length > 0 ? (
                      <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5 text-xs rounded-full">{allDocs.length}</Badge>
                    ) : null;
                  })()}
                </TabsTrigger>
              </TabsList>

              {/* === TAB: Details === */}
              <TabsContent value="details" className="flex-1 min-h-0 pt-4">
                <ScrollArea className="h-full">
                  <div className="space-y-5 pb-6 pr-3">
                    {/* Action buttons in edit mode */}
                    {editMode && selectedNode.data._isTaskNode && (
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs" onClick={handleOpenEditDialog}>
                          <Pencil className="w-3 h-3" /> Sửa nội dung
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-2 rounded-xl text-xs" onClick={handleOpenDeleteDialog}>
                          <Trash2 className="w-3 h-3" /> Xóa node
                        </Button>
                      </div>
                    )}

                    {/* Process Status Selector */}
                    {selectedNode.data._processId && (
                      <div className="bg-card/50 p-4 rounded-xl border border-border">
                        <h4 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
                          <RefreshCw className={`w-3.5 h-3.5 ${isUpdatingStatus ? 'animate-spin' : ''}`} />
                          Trạng thái quy trình
                        </h4>
                        {(() => {
                          const currentProcStatus = getProcessStatus(schemaRef.current, selectedNode.data._processId) || 'not_started';
                          const currentSc = (isDark ? groupStatusColors.dark : groupStatusColors.light)[currentProcStatus];
                          return (
                            <Select
                              value={currentProcStatus}
                              onValueChange={(val) => handleUpdateProcessStatus(selectedNode.data._processId, val as GroupStatus)}
                              disabled={isUpdatingStatus}
                            >
                              <SelectTrigger className="w-full h-10 rounded-xl px-3" style={{ borderColor: currentSc.border, borderWidth: '2px' }}>
                                <SelectValue>
                                  <span className="flex items-center gap-2">
                                    <span
                                      className="w-3 h-3 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: currentSc.border }}
                                    />
                                    <span className="font-medium">
                                      {groupStatusConfig[currentProcStatus].emoji} {groupStatusConfig[currentProcStatus].label}
                                    </span>
                                  </span>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {(['completed', 'in_progress', 'not_started'] as GroupStatus[]).map((status) => {
                                  const sc = (isDark ? groupStatusColors.dark : groupStatusColors.light)[status];
                                  const cfg = groupStatusConfig[status];
                                  return (
                                    <SelectItem key={status} value={status}>
                                      <span className="flex items-center gap-2">
                                        <span
                                          className="w-3 h-3 rounded-full flex-shrink-0"
                                          style={{ backgroundColor: sc.border }}
                                        />
                                        <span>{cfg.emoji} {cfg.label}</span>
                                      </span>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          );
                        })()}
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-sm px-4 py-1.5 uppercase tracking-wider font-semibold rounded-full">
                        Bước: {selectedNode.data.status}
                      </Badge>
                    </div>

                    <div className="bg-card/50 p-5 rounded-xl border border-border">
                      <h4 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <User className="w-4 h-4 text-muted-foreground"/>
                        Người thực hiện / Phụ trách
                      </h4>
                      <p className="text-foreground text-lg font-medium">{selectedNode.data.actor}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-muted-foreground mb-3 text-sm uppercase tracking-wider">Nội dung chi tiết</h4>
                      <p className="text-secondary-foreground leading-relaxed text-base bg-background/50 p-4 rounded-xl border border-border">
                        {selectedNode.data.description}
                      </p>
                    </div>

                    {selectedNode.data.stepForm && (
                      <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20">
                        <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2 text-xs uppercase tracking-wider">📎 Biểu mẫu liên quan bước này</h4>
                        {selectedNode.data.stepForm.split('\n').map((line: string, idx: number) => (
                          <p key={idx} className="text-emerald-700/80 dark:text-emerald-300/80 text-sm leading-relaxed">{line}</p>
                        ))}
                      </div>
                    )}

                    {!selectedNode.data.stepForm && !selectedNode.data.reference && (
                      <div className="pt-2">
                        <p className="text-amber-600/80 dark:text-amber-500/80 text-sm italic border-l-2 border-amber-500/50 pl-3">
                          (Dữ liệu hệ thống đang được chờ lệnh để quét sâu AI vào thư mục chứa file ISO định dạng Word/PDF tương ứng để bóc tách thêm).
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* === TAB: Documents === */}
              <TabsContent value="documents" className="flex-1 min-h-0 pt-4">
                <ScrollArea className="h-full">
                  <div className="space-y-4 pb-6 pr-3">
                    {(() => {
                      const allDocs = getNodeDocuments(selectedNode);
                      if (allDocs.length === 0) {
                        return (
                          <div className="flex flex-col items-center justify-center py-16 text-center">
                            <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
                            <p className="text-muted-foreground text-sm">Chưa có tài liệu nào được liên kết với bước này.</p>
                            <p className="text-muted-foreground/60 text-xs mt-1">Tài liệu ISO sẽ được hiển thị tại đây khi có dữ liệu.</p>
                          </div>
                        );
                      }

                      // Group by type
                      const refDocs = allDocs.filter(d => d.category === 'reference');
                      const formDocs = allDocs.filter(d => d.category === 'form');
                      const relatedDocs = allDocs.filter(d => d.category === 'document');

                      return (
                        <>
                          {/* Inline preview */}
                          {previewDoc && (
                            <div className="rounded-xl border border-primary/30 overflow-hidden bg-background">
                              <div className="flex items-center justify-between bg-primary/5 px-4 py-2 border-b border-primary/20">
                                <div className="flex items-center gap-2 min-w-0">
                                  <Eye className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span className="text-sm font-medium text-foreground truncate">{previewDoc.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {previewDoc.type === 'image' && (
                                    <>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => setImageZoom(z => Math.max(0.25, z - 0.25))}>
                                        <ZoomOut className="w-3.5 h-3.5" />
                                      </Button>
                                      <span className="text-xs text-muted-foreground w-10 text-center">{Math.round(imageZoom * 100)}%</span>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => setImageZoom(z => Math.min(3, z + 0.25))}>
                                        <ZoomIn className="w-3.5 h-3.5" />
                                      </Button>
                                    </>
                                  )}
                                  <a href={previewDoc.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </Button>
                                  </a>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => { setPreviewDoc(null); setImageZoom(1); }}>
                                    <X className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </div>
                              <div className="bg-muted/30">
                                {previewDoc.type === 'pdf' ? (
                                  <iframe
                                    src={previewDoc.url}
                                    className="w-full border-0"
                                    style={{ height: '60vh' }}
                                    title={previewDoc.name}
                                  />
                                ) : (
                                  <div className="overflow-auto p-4" style={{ maxHeight: '60vh' }}>
                                    <img
                                      src={previewDoc.url}
                                      alt={previewDoc.name}
                                      className="mx-auto transition-transform duration-200"
                                      style={{ transform: `scale(${imageZoom})`, transformOrigin: 'top center' }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Reference docs */}
                          {refDocs.length > 0 && (
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quy trình gốc</h4>
                              <div className="space-y-1.5">
                                {refDocs.map((doc, idx) => (
                                  <DocumentRow key={`ref-${idx}`} doc={doc} onPreview={(d) => { setPreviewDoc(d); setImageZoom(1); }} isActive={previewDoc?.url === doc.url} />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Related documents */}
                          {relatedDocs.length > 0 && (
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Văn bản liên quan</h4>
                              <div className="space-y-1.5">
                                {relatedDocs.map((doc, idx) => (
                                  <DocumentRow key={`doc-${idx}`} doc={doc} onPreview={(d) => { setPreviewDoc(d); setImageZoom(1); }} isActive={previewDoc?.url === doc.url} />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Form docs */}
                          {formDocs.length > 0 && (
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Biểu mẫu (Forms)</h4>
                              <div className="space-y-1.5">
                                {formDocs.map((doc, idx) => (
                                  <DocumentRow key={`form-${idx}`} doc={doc} onPreview={(d) => { setPreviewDoc(d); setImageZoom(1); }} isActive={previewDoc?.url === doc.url} />
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </SheetContent>
      </Sheet>

      {/* ===== DIALOG — Edit Node ===== */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="!bg-popover border-border text-popover-foreground rounded-2xl shadow-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Pencil className="w-5 h-5 text-primary" />
              Chỉnh sửa Node
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Cập nhật thông tin hiển thị cho khối thao tác này.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-secondary-foreground text-sm font-medium">Tiêu đề</Label>
              <Input
                value={editForm.label}
                onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                placeholder="Nhập tiêu đề node..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-secondary-foreground text-sm font-medium">Người thực hiện</Label>
              <Input
                value={editForm.actor}
                onChange={(e) => setEditForm({ ...editForm, actor: e.target.value })}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                placeholder="Nhập người thực hiện..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-secondary-foreground text-sm font-medium">Mô tả chi tiết</Label>
              <Textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl min-h-[120px]"
                placeholder="Nhập mô tả chi tiết cho bước này..."
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground rounded-xl" onClick={() => setEditDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" /> Hủy
            </Button>
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl gap-2" onClick={handleSaveEdit}>
              <Save className="w-4 h-4" /> Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DIALOG — Add Node ===== */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="!bg-popover border-border text-popover-foreground rounded-2xl shadow-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400" />
              Thêm Node mới
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Tạo một khối thao tác mới trên bản đồ quy trình. Node sẽ được đặt ở vị trí ngẫu nhiên, bạn có thể kéo thả để sắp xếp.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-secondary-foreground text-sm font-medium">Tiêu đề <span className="text-destructive">*</span></Label>
              <Input
                value={addForm.label}
                onChange={(e) => setAddForm({ ...addForm, label: e.target.value })}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                placeholder="VD: Xác nhận phiếu thu"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-secondary-foreground text-sm font-medium">Người thực hiện</Label>
              <Input
                value={addForm.actor}
                onChange={(e) => setAddForm({ ...addForm, actor: e.target.value })}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                placeholder="VD: Kế toán viên P.TCKT"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-secondary-foreground text-sm font-medium">Mô tả chi tiết</Label>
              <Textarea
                value={addForm.description}
                onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl min-h-[100px]"
                placeholder="Mô tả công việc cụ thể..."
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground rounded-xl" onClick={() => setAddDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" /> Hủy
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2" onClick={handleAddNode}>
              <Plus className="w-4 h-4" /> Thêm node
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DIALOG — Delete Node Confirm ===== */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="!bg-popover border-border text-popover-foreground rounded-2xl shadow-2xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-400" />
              Xóa Node
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Bạn có chắc muốn xóa node <strong className="text-foreground">&quot;{nodeToDelete?.data?.label}&quot;</strong>? Tất cả các edge kết nối với node này cũng sẽ bị xóa.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground rounded-xl" onClick={() => setDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" className="rounded-xl gap-2" onClick={handleConfirmDelete}>
              <Trash2 className="w-4 h-4" /> Xác nhận xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DIALOG — Delete Edge Confirm ===== */}
      <Dialog open={deleteEdgeDialogOpen} onOpenChange={setDeleteEdgeDialogOpen}>
        <DialogContent className="!bg-popover border-border text-popover-foreground rounded-2xl shadow-2xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Unlink className="w-5 h-5 text-orange-400" />
              Xóa Edge (Đường nối)
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Bạn có chắc muốn xóa đường nối giữa <strong className="text-foreground">{edgeToDelete?.source}</strong> → <strong className="text-foreground">{edgeToDelete?.target}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground rounded-xl" onClick={() => setDeleteEdgeDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" className="rounded-xl gap-2" onClick={handleConfirmDeleteEdge}>
              <Unlink className="w-4 h-4" /> Xác nhận xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
