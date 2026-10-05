"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  moduleName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class GraminCareErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("GraminCare Module Caught Error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-white border border-brand-charcoalBorder shadow-card text-center my-4">
          <div className="relative mb-4 inline-block">
            <img
              src="/icon-64.png"
              alt="GraminCare AI Symbol"
              className="w-12 h-12 object-contain rounded-2xl shadow-soft border border-brand-charcoalBorder mx-auto"
            />
            <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-brand-gold text-brand-forest">
              <AlertTriangle className="w-3 h-3" />
            </span>
          </div>

          <h3 className="text-sm font-bold text-brand-forest mb-1">
            {this.props.fallbackTitle || `Notice in ${this.props.moduleName || "Module"}`}
          </h3>
          <p className="text-xs text-brand-charcoalMuted mb-5 leading-relaxed max-w-sm mx-auto">
            This module encountered an unexpected condition. The rest of GraminCare AI remains fully functional.
          </p>

          <button
            onClick={this.handleReset}
            className="px-4 py-2 rounded-xl bg-brand-forest hover:bg-brand-forestLight text-brand-cream text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
            <span>Reset Module</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
