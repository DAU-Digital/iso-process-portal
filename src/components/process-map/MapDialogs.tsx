"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Plus, Pencil, Trash2,
  Save, X, Unlink, LogOut,
} from "lucide-react";

// ===== Edit Node Dialog =====
interface EditNodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editForm: { label: string; description: string; actor: string };
  setEditForm: (form: { label: string; description: string; actor: string }) => void;
  onSave: () => void;
}

export function EditNodeDialog({ open, onOpenChange, editForm, setEditForm, onSave }: EditNodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground rounded-xl" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 mr-2" /> Hủy
          </Button>
          <Button className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl gap-2" onClick={onSave}>
            <Save className="w-4 h-4" /> Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ===== Add Node Dialog =====
interface AddNodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addForm: { label: string; description: string; actor: string };
  setAddForm: (form: { label: string; description: string; actor: string }) => void;
  onAdd: () => void;
}

export function AddNodeDialog({ open, onOpenChange, addForm, setAddForm, onAdd }: AddNodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground rounded-xl" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 mr-2" /> Hủy
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2" onClick={onAdd}>
            <Plus className="w-4 h-4" /> Thêm node
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ===== Delete Node Dialog =====
interface DeleteNodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodeToDelete: any;
  onConfirm: () => void;
}

export function DeleteNodeDialog({ open, onOpenChange, nodeToDelete, onConfirm }: DeleteNodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground rounded-xl" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button variant="destructive" className="rounded-xl gap-2" onClick={onConfirm}>
            <Trash2 className="w-4 h-4" /> Xác nhận xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ===== Delete Edge Dialog =====
interface DeleteEdgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  edgeToDelete: any;
  onConfirm: () => void;
}

export function DeleteEdgeDialog({ open, onOpenChange, edgeToDelete, onConfirm }: DeleteEdgeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground rounded-xl" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button variant="destructive" className="rounded-xl gap-2" onClick={onConfirm}>
            <Unlink className="w-4 h-4" /> Xác nhận xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ===== Logout Dialog =====
interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function LogoutDialog({ open, onOpenChange, onConfirm }: LogoutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!bg-popover border-border text-popover-foreground rounded-2xl shadow-2xl sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <LogOut className="w-5 h-5 text-red-400" />
            Đăng xuất
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Bạn có chắc chắn muốn đăng xuất khỏi hệ thống? 
            Mọi thay đổi chưa được chỉnh sửa có thể sẽ không được lưu.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 mt-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground rounded-xl" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button variant="destructive" className="rounded-xl gap-2 hover:bg-red-600 bg-red-500 text-white" onClick={onConfirm}>
            <LogOut className="w-4 h-4 ml-[-4px]" /> Đăng xuất
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
