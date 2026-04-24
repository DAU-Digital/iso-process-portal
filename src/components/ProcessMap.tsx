"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  Node,
  Edge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from "next-themes";

// --- Extracted Modules ---
import { GroupStatus, themes, ProcessNode, ProcessEdge, ProcessSchemaMapItem, ProcessSchemaProcess } from './process-map/types';
import { generateNetwork, getProcessStatus } from './process-map/helpers';
import { InfoPanel } from './process-map/InfoPanel';
import { EditToolbar } from './process-map/EditToolbar';
import { EmptyModuleState } from './process-map/EmptyModuleState';
import { NodeDetailSheet } from './process-map/NodeDetailSheet';
import {
  EditNodeDialog,
  AddNodeDialog,
  DeleteNodeDialog,
  DeleteEdgeDialog,
  LogoutDialog,
} from './process-map/MapDialogs';

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ProcessMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState<ProcessNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<ProcessEdge>([]);
  const [selectedNode, setSelectedNode] = useState<ProcessNode | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState('finance');

  // --- Theme (with mounted guard to prevent hydration mismatch) ---
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme !== 'light' : true;
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
  const [nodeToDelete, setNodeToDelete] = useState<ProcessNode | null>(null);

  // --- Edge Delete Dialog ---
  const [deleteEdgeDialogOpen, setDeleteEdgeDialogOpen] = useState(false);
  const [edgeToDelete, setEdgeToDelete] = useState<ProcessEdge | null>(null);

  // --- Connect Edge Mode ---
  const [connectMode, setConnectMode] = useState(false);

  // --- Logout State ---
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // --- Status filter (checkboxes in legend) ---
  const [statusFilter, setStatusFilter] = useState<Record<GroupStatus, boolean>>({
    completed: true,
    in_progress: true,
    not_started: true,
  });
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Track raw schema for reference
  const schemaRef = useRef<ProcessSchemaMapItem[]>([]);
  const edgesInitializedRef = useRef(false);

  // ---- LOAD DATA ----
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const { data: groups, error } = await supabase
          .from('process_groups')
          .select('*, processes(*)')
          .eq('department', selectedModule);
          
        if (error) throw error;
        
        if (groups && groups.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formattedSchema: ProcessSchemaMapItem[] = groups.map((g: any) => ({
             group: { id: g.id, label: g.label, x: g.x, y: g.y, width: g.width, height: g.height },
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             processes: g.processes.map((p: any) => ({
                 id: p.id,
                 title: p.title,
                 steps: p.steps,
                 step_details: p.step_details,
                 reference: p.reference,
                 forms: p.forms,
                 documents: p.documents,
                 status: (p.status || 'not_started') as GroupStatus,
             })).sort((a: ProcessSchemaProcess, b: ProcessSchemaProcess) => {
                 return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' })
             })
          })).sort((a: ProcessSchemaMapItem, b: ProcessSchemaMapItem) => a.group.x - b.group.x || a.group.y - b.group.y);
          
          schemaRef.current = formattedSchema;
          const { initialNodes, initialEdges } = generateNetwork(formattedSchema, isDark);

          // ---- Load saved node positions from Supabase ----
          const { data: savedPositions } = await supabase
            .from('node_positions')
            .select('*');

          if (savedPositions && savedPositions.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const restoredEdges: ProcessEdge[] = savedEdges.map((e: any) => ({
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
            setEdges(initialEdges);
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
        } else {
          schemaRef.current = [];
          setNodes([]);
          setEdges([]);
        }
      } catch (err) {
        console.error('Failed to load process map schema from Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [setNodes, setEdges, isDark, selectedModule]);

  // ---- UPDATE PROCESS STATUS ----
  const handleUpdateProcessStatus = useCallback(async (processId: string, newStatus: GroupStatus) => {
    setIsUpdatingStatus(true);
    try {
      const { error } = await supabase
        .from('processes')
        .update({ status: newStatus })
        .eq('id', processId);
      
      if (error) throw error;

      schemaRef.current = schemaRef.current.map((group: ProcessSchemaMapItem) => ({
        ...group,
        processes: group.processes.map((p: ProcessSchemaProcess) =>
          p.id === processId ? { ...p, status: newStatus } : p
        ),
      }));

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
        const nodeId = node.id;
        if (nodeId.startsWith('proc-box-')) {
          const procId = nodeId.replace('proc-box-', '');
          const procStatus = getProcessStatus(schemaRef.current, procId);
          if (procStatus) {
            return { ...node, hidden: !statusFilter[procStatus] };
          }
        }
        if (nodeId.startsWith('n-')) {
          const parts = nodeId.split('-');
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
  const onConnect = useCallback(async (params: Connection) => {
    const edgeColor = isDark ? themes.dark.edgeColor : themes.light.edgeColor;
    const newEdge: ProcessEdge = {
      ...params,
      id: `e-${params.source}-${params.target}`,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor },
      style: { stroke: edgeColor, strokeWidth: 2 }
    } as ProcessEdge;
    setEdges((eds) => addEdge(newEdge, eds) as ProcessEdge[]);
    await supabase.from('map_edges').upsert({
      id: newEdge.id,
      source: params.source,
      target: params.target,
      animated: true,
    }, { onConflict: 'id' });
  }, [setEdges, isDark]);

  // ---- SAVE NODE POSITION on drag end ----
  const onNodeDragStop = useCallback(async (_event: React.MouseEvent, node: ProcessNode) => {
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

  // Show a loading screen until mounted to avoid hydration mismatch
  if (!mounted || isLoading) {
    return (
      <div className="w-full h-full overflow-hidden relative bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Đang tải bản đồ quy trình...</div>
      </div>
    );
  }

  // ---- NODE CLICK ----
  const onNodeClick = (_event: React.MouseEvent, node: ProcessNode) => {
    if (node.type === 'group') return;
    setSelectedNode(node);
    setSheetOpen(true);
  };

  // ---- EDGE CLICK (for delete in edit mode) ----
  const onEdgeClick = (_event: React.MouseEvent, edge: ProcessEdge) => {
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
    const newNode: ProcessNode = {
      id: newId,
      type: 'default',
      position: { x: Math.random() * 800 + 100, y: Math.random() * 400 + 100 },
      data: {
        label: addForm.label || 'Node Mới',
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
    setNodes((nds) => [...nds, newNode] as ProcessNode[]);
    setAddDialogOpen(false);
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
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setDeleteDialogOpen(false);
    setNodeToDelete(null);
    setSelectedNode(null);
    await supabase.from('node_positions').delete().eq('node_id', nodeId);
    await supabase.from('map_edges').delete().or(`source.eq.${nodeId},target.eq.${nodeId}`);
  };

  const handleConfirmDeleteEdge = async () => {
    if (!edgeToDelete) return;
    const edgeId = edgeToDelete.id;
    setEdges((eds) => eds.filter((e) => e.id !== edgeId));
    setDeleteEdgeDialogOpen(false);
    setEdgeToDelete(null);
    await supabase.from('map_edges').delete().eq('id', edgeId);
  };

  const handleConfirmLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
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
        <InfoPanel
          isPanelExpanded={isPanelExpanded}
          setIsPanelExpanded={setIsPanelExpanded}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          isDark={isDark}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* ===== TOP-RIGHT EDIT TOOLBAR ===== */}
        <EditToolbar
          editMode={editMode}
          setEditMode={setEditMode}
          connectMode={connectMode}
          setConnectMode={setConnectMode}
          isSaving={isSaving}
          onAddNode={handleOpenAddDialog}
          onLogout={() => setLogoutDialogOpen(true)}
        />

      </ReactFlow>

      {/* ===== EMPTY STATE FOR NON-FINANCE MODULES ===== */}
      <EmptyModuleState selectedModule={selectedModule} hasData={schemaRef.current.length > 0} />

      {/* ===== SIDE SHEET — Node Details ===== */}
      <NodeDetailSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        selectedNode={selectedNode}
        isDark={isDark}
        editMode={editMode}
        isUpdatingStatus={isUpdatingStatus}
        schemaRef={schemaRef}
        onEditNode={handleOpenEditDialog}
        onDeleteNode={handleOpenDeleteDialog}
        onUpdateProcessStatus={handleUpdateProcessStatus}
      />

      {/* ===== DIALOGS ===== */}
      <EditNodeDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        editForm={editForm}
        setEditForm={setEditForm}
        onSave={handleSaveEdit}
      />

      <AddNodeDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        addForm={addForm}
        setAddForm={setAddForm}
        onAdd={handleAddNode}
      />

      <DeleteNodeDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        nodeToDelete={nodeToDelete}
        onConfirm={handleConfirmDelete}
      />

      <DeleteEdgeDialog
        open={deleteEdgeDialogOpen}
        onOpenChange={setDeleteEdgeDialogOpen}
        edgeToDelete={edgeToDelete}
        onConfirm={handleConfirmDeleteEdge}
      />

      <LogoutDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
