"use client";

import React from 'react';
import ProcessMap from '@/components/ProcessMap';

export default function ProcessPortal() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background font-sans text-foreground">
      <ProcessMap />
    </div>
  );
}
