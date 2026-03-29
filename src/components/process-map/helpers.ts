// ============================================================
// HELPER FUNCTIONS — Document resolution, network generation
// ============================================================

import { MarkerType, Node, Edge } from '@xyflow/react';
import {
  GroupStatus,
  ResolvedDoc,
  docMap,
  themes,
  groupStatusColors,
} from './types';

// --- Resolve Document URL ---
export function resolveDocUrl(filename: string): { url: string; type: 'pdf' | 'image' } | null {
  const entry = docMap[filename];
  if (entry) return { url: entry.publicUrl, type: entry.type };
  return null;
}

// --- Get All Documents for a Node ---
export function getNodeDocuments(node: any): ResolvedDoc[] {
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

// --- Get Process Status from Schema ---
export function getProcessStatus(schema: any[], processId: string): GroupStatus | null {
  for (const group of schema) {
    for (const proc of group.processes) {
      if (proc.id === processId) return (proc.status as GroupStatus) || 'not_started';
    }
  }
  return null;
}

// --- Generate ReactFlow Network from Schema ---
export function generateNetwork(mapSchema: any[], isDark: boolean) {
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
  const COLUMN_SPACING = 330;
  const ROW_SPACING = 140;
  const PROC_GAP_X = 40;       // Horizontal gap between process columns
  const PROC_GAP_Y = 60;       // Vertical gap between process rows in grid
  const PADDING_X = 60;
  const PADDING_Y = 80;
  const PROC_TITLE_HEIGHT = 50;

  // ——— STEP 1: Flatten all processes from all groups ———
  const allProcesses: any[] = [];
  mapSchema.forEach(def => {
    def.processes.forEach((proc: any) => {
      allProcesses.push(proc);
    });
  });

  // Single horizontal row: all processes in one line
  const GRID_COLS = allProcesses.length;
  const procDimensions = allProcesses.map(proc => {
    const colWidth = 280;
    const colHeight = PROC_TITLE_HEIGHT + proc.steps.length * ROW_SPACING + 40;
    return { proc, colWidth, colHeight };
  });

  // ——— STEP 3: Arrange processes in a grid layout ———
  const statusTheme = isDark ? groupStatusColors.dark : groupStatusColors.light;

  // Calculate grid row heights (max height in each row)
  const gridRows: { procs: typeof procDimensions; maxHeight: number }[] = [];
  for (let i = 0; i < procDimensions.length; i += GRID_COLS) {
    const rowProcs = procDimensions.slice(i, i + GRID_COLS);
    const maxHeight = Math.max(...rowProcs.map(p => p.colHeight));
    gridRows.push({ procs: rowProcs, maxHeight });
  }

  // Calculate the total container size
  const totalWidth = PADDING_X * 2 + GRID_COLS * COLUMN_SPACING + (GRID_COLS - 1) * PROC_GAP_X;
  let totalHeight = PADDING_Y;
  gridRows.forEach(row => {
    totalHeight += row.maxHeight + PROC_GAP_Y;
  });
  totalHeight += PADDING_Y;

  // ——— STEP 4: Create a single unified group container ———
  const UNIFIED_GROUP_ID = 'unified-finance';
  nodes.push({
    id: `group-${UNIFIED_GROUP_ID}`,
    data: { label: 'Hệ thống Quy trình ISO — Phòng Tài chính Kế toán' },
    position: { x: 0, y: 0 },
    className: 'light',
    style: {
      backgroundColor: t.groupBg,
      width: totalWidth,
      height: totalHeight,
      border: `1px solid ${t.groupBorder}`,
      borderRadius: '24px',
      color: t.groupTextColor,
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '22px 30px',
    },
    type: 'group',
    selectable: false,
    draggable: false,
  });

  // ——— STEP 5: Place each process and its steps inside the unified container ———
  let gridRowY = PADDING_Y + 30; // offset for the group title

  gridRows.forEach((row) => {
    row.procs.forEach((item, colIndex) => {
      const { proc } = item;
      const procStatus: GroupStatus = proc.status || 'not_started';
      const statusColors = statusTheme[procStatus];
      const procX = PADDING_X + colIndex * (COLUMN_SPACING + PROC_GAP_X);

      // Process title box
      const procBoxId = `proc-box-${proc.id}`;
      nodes.push({
        id: procBoxId,
        data: { label: proc.title },
        position: { x: procX, y: gridRowY },
        parentId: `group-${UNIFIED_GROUP_ID}`,
        extent: 'parent' as const,
        draggable: false,
        selectable: false,
        style: {
          background: statusColors.bg,
          border: `2px solid ${statusColors.border}`,
          borderRadius: '12px',
          padding: '8px 14px',
          fontSize: '12px',
          fontWeight: '700',
          color: statusColors.titleColor,
          width: 280,
          textAlign: 'center' as const,
          boxShadow: 'none',
          letterSpacing: '0.03em',
        },
      });

      // Steps within this process
      proc.steps.forEach((step: string, stepIndex: number) => {
        const nodeId = `n-${proc.id}-${stepIndex}`;
        const isStart = stepIndex === 0;
        const isEnd = stepIndex === proc.steps.length - 1;
        const nodeBorderColor = isEnd
          ? t.endBorder
          : isStart
            ? t.primaryBorder
            : statusColors.border;

        nodes.push({
          id: nodeId,
          data: {
            label: step,
            description: proc.step_details?.[stepIndex]?.description
              || `Thao tác "${step}" thuộc quy trình ${proc.title}. Dữ liệu chi tiết đang chờ đồng bộ từ hệ thống.`,
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
          position: {
            x: procX + 10,
            y: gridRowY + PROC_TITLE_HEIGHT + stepIndex * ROW_SPACING,
          },
          parentId: `group-${UNIFIED_GROUP_ID}`,
          extent: 'parent' as const,
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

    gridRowY += row.maxHeight + PROC_GAP_Y;
  });

  return { initialNodes: nodes, initialEdges: edges };
}

