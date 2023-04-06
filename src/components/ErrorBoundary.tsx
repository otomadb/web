"use client";

import type { ComponentType, ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

export const ErrorBoundaryTemplate = ({
  children,
  Fallback,
}: {
  children: ReactNode;
  Fallback: ComponentType<{
    error: Error;
    reset: () => void;
  }>;
}) => {
  return (
    <ReactErrorBoundary
      fallbackRender={(e) => (
        <Fallback error={e.error} reset={e.resetErrorBoundary} />
      )}
      onError={(e) => {
        console.error(e);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};
