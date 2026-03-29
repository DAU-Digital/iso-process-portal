"use client";

import React, { useState, useMemo } from 'react';
import Lightbox, { Slide } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import {
  CheckCircle2, User, Pencil, Trash2,
  X, FileText, ExternalLink,
  RefreshCw, Maximize2, Image as ImageIcon,
  FolderOpen,
} from "lucide-react";

import { GroupStatus, ResolvedDoc, groupStatusConfig, groupStatusColors } from './types';
import { getNodeDocuments, getProcessStatus } from './helpers';

// --- Custom slide type for PDF ---
interface PdfSlide extends Slide {
  type: "pdf";
  src: string;
  title?: string;
  description?: string;
}

function isPdfSlide(slide: Slide): slide is PdfSlide {
  return (slide as any).type === "pdf";
}

interface NodeDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedNode: any;
  isDark: boolean;
  editMode: boolean;
  isUpdatingStatus: boolean;
  schemaRef: React.MutableRefObject<any[]>;
  onEditNode: () => void;
  onDeleteNode: () => void;
  onUpdateProcessStatus: (processId: string, newStatus: GroupStatus) => void;
}

// --- Unified Document Card ---
function DocCard({ doc, onClick }: { doc: ResolvedDoc; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const isPdf = doc.type === 'pdf';

  const categoryLabel = doc.category === 'form' ? 'Biểu mẫu' : doc.category === 'reference' ? 'Quy trình' : 'Tài liệu';
  const categoryColor = doc.category === 'form'
    ? 'bg-emerald-500/80'
    : doc.category === 'reference'
      ? 'bg-blue-500/80'
      : 'bg-amber-500/80';

  return (
    <div
      className="group relative cursor-pointer rounded-xl overflow-hidden border border-border bg-muted/30 hover:border-primary/40 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 aspect-[4/3]"
      onClick={onClick}
    >
      {isPdf ? (
        /* PDF Thumbnail — styled icon card */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-500/5 via-background to-red-600/5 group-hover:from-red-500/10 group-hover:to-red-600/10 transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <FileText className="w-7 h-7 text-red-500" />
          </div>
          <p className="text-xs font-medium text-foreground/80 text-center px-3 leading-tight truncate max-w-full">{doc.name}</p>
          <p className="text-[10px] text-muted-foreground mt-1">PDF Document</p>
        </div>
      ) : (
        /* Image Thumbnail */
        <>
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-muted/50 flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-muted-foreground/30" />
            </div>
          )}
          <img
            src={doc.url}
            alt={doc.name}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
          />
        </>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
        <div className="flex items-center justify-between">
          <p className="text-white text-xs font-medium truncate flex-1 mr-2">{doc.name}</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      {/* Category + Type badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm text-white ${categoryColor}`}>
          {categoryLabel}
        </span>
        {isPdf && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm bg-red-500/80 text-white">
            PDF
          </span>
        )}
      </div>
    </div>
  );
}

export function NodeDetailSheet({
  open,
  onOpenChange,
  selectedNode,
  isDark,
  editMode,
  isUpdatingStatus,
  schemaRef,
  onEditNode,
  onDeleteNode,
  onUpdateProcessStatus,
}: NodeDetailSheetProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Compute all documents
  const allDocs = useMemo(() => {
    if (!selectedNode) return [];
    return getNodeDocuments(selectedNode);
  }, [selectedNode]);

  // Build unified lightbox slides (images + PDFs)
  const lightboxSlides = useMemo(() =>
    allDocs.map(doc => {
      const categoryLabel = doc.category === 'form' ? 'Biểu mẫu (Form)' : doc.category === 'reference' ? 'Quy trình gốc' : 'Văn bản liên quan';

      if (doc.type === 'pdf') {
        return {
          type: "pdf" as const,
          src: doc.url,
          title: doc.name,
          description: `📄 ${categoryLabel}`,
        };
      }
      return {
        src: doc.url,
        alt: doc.name,
        title: doc.name,
        description: `🖼️ ${categoryLabel}`,
      };
    }),
    [allDocs]
  );

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setLightboxOpen(false);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Custom render for PDF slides inside lightbox
  const renderSlide = ({ slide }: { slide: Slide }) => {
    if (isPdfSlide(slide)) {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1000px',
            height: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* PDF Header bar inside lightbox */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              backgroundColor: 'rgba(30, 30, 30, 0.95)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} color="#ef4444" />
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>
                  {slide.title || 'PDF Document'}
                </span>
              </div>
              <a
                href={slide.src}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '12px',
                  textDecoration: 'none',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
              >
                <ExternalLink size={12} />
                Mở tab mới
              </a>
            </div>
            {/* PDF iframe */}
            <iframe
              src={slide.src}
              title={slide.title || 'PDF Document'}
              style={{
                flex: 1,
                width: '100%',
                border: 'none',
                backgroundColor: '#fff',
              }}
            />
          </div>
        </div>
      );
    }
    // Return undefined for image slides → default rendering
    return undefined;
  };

  // Custom thumbnail render for PDFs
  const renderThumbnail = ({ slide }: { slide: Slide }) => {
    if (isPdfSlide(slide)) {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(30, 30, 30, 0.9)',
          borderRadius: '6px',
          gap: '2px',
        }}>
          <FileText size={18} color="#ef4444" />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '8px', fontWeight: 600 }}>PDF</span>
        </div>
      );
    }
    return undefined;
  };

  return (
    <>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent className="!bg-popover/95 backdrop-blur-3xl border-l border-border text-popover-foreground shadow-2xl p-0 flex flex-col h-full" style={{ maxWidth: '64rem' }} showCloseButton={false}>
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
              <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0 text-muted-foreground hover:text-foreground" onClick={() => handleOpenChange(false)}>
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
                  {allDocs.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5 text-xs rounded-full">{allDocs.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* === TAB: Details === */}
              <TabsContent value="details" className="flex-1 min-h-0 pt-4">
                <ScrollArea className="h-full">
                  <div className="space-y-5 pb-6 pr-3">
                    {/* Action buttons in edit mode */}
                    {editMode && selectedNode.data._isTaskNode && (
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs" onClick={onEditNode}>
                          <Pencil className="w-3 h-3" /> Sửa nội dung
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-2 rounded-xl text-xs" onClick={onDeleteNode}>
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
                              onValueChange={(val) => onUpdateProcessStatus(selectedNode.data._processId, val as GroupStatus)}
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
                              <SelectContent alignItemWithTrigger={false} sideOffset={4}>
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
                  <div className="space-y-6 pb-6 pr-3">
                    {allDocs.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-5">
                          <FolderOpen className="w-10 h-10 text-muted-foreground/30" />
                        </div>
                        <p className="text-muted-foreground text-sm font-medium">Chưa có tài liệu nào được liên kết</p>
                        <p className="text-muted-foreground/60 text-xs mt-1.5 max-w-[240px]">
                          Tài liệu ISO sẽ được hiển thị tại đây khi có dữ liệu liên kết với bước này.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FolderOpen className="w-4 h-4 text-primary" />
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Tất cả tài liệu
                          </h4>
                          <Badge variant="secondary" className="h-5 min-w-5 px-1.5 text-[10px] rounded-full">
                            {allDocs.length}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground/60 ml-auto">Nhấp để xem lightbox</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {allDocs.map((doc, idx) => (
                            <DocCard
                              key={`doc-${idx}`}
                              doc={doc}
                              onClick={() => openLightbox(idx)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </SheetContent>
      </Sheet>

      {/* === UNIFIED LIGHTBOX for all documents (Images + PDFs) === */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Zoom, Fullscreen, Thumbnails, Counter, Captions]}
        render={{
          slide: renderSlide,
          thumbnail: renderThumbnail,
        }}
        zoom={{
          maxZoomPixelRatio: 5,
          scrollToZoom: true,
        }}
        thumbnails={{
          position: "bottom",
          width: 100,
          height: 70,
          gap: 8,
          borderRadius: 8,
        }}
        counter={{ container: { style: { top: "unset", bottom: 0, left: 0 } } }}
        captions={{ showToggle: true, descriptionTextAlign: "center" }}
        carousel={{ preload: 2 }}
        animation={{ fade: 250 }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .92)" },
        }}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </>
  );
}
