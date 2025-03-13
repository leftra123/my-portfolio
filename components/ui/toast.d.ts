import React from 'react';

export interface ToastProps {
  variant?: 'default' | 'destructive';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  [key: string]: unknown;
}

export type ToastActionElement = React.ReactElement;