"use client";

import React, { useState } from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  symbolOnly?: boolean;
  clickable?: boolean;
  inverted?: boolean;
}

export default function BrandLogo({
  className = "",
  size = "md",
  symbolOnly = false,
  clickable = true,
  inverted = false,
}: BrandLogoProps) {
  const [imageError, setImageError] = useState(false);

  // Responsive dimensions for official logo
  const sizeStyles = {
    sm: symbolOnly ? "h-8 w-8" : "h-9 w-auto",
    md: symbolOnly ? "h-11 w-11" : "h-12 w-auto",
    lg: symbolOnly ? "h-16 w-16" : "h-16 w-auto",
    xl: symbolOnly ? "h-24 w-24" : "h-24 w-auto",
  };

  const imageSrc = symbolOnly ? "/icon-64.png" : "/logo.jpg";

  const content = (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {!imageError ? (
        <img
          src={imageSrc}
          alt={symbolOnly ? "GraminCare AI Symbol" : "GraminCare AI Official Logo"}
          className={`${sizeStyles[size]} object-contain rounded-xl shadow-2xs transition-transform hover:opacity-95`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-black text-xl tracking-tight ${inverted ? "text-brand-cream" : "text-brand-forest"}`}>
              GraminCare
            </span>
            <span className="px-1.5 py-0.5 rounded text-[11px] font-extrabold bg-brand-gold text-brand-forest tracking-wider uppercase">
              AI
            </span>
          </div>
          <span className={`text-[9px] font-bold tracking-widest uppercase ${inverted ? "text-brand-gold" : "text-brand-teal"}`}>
            BRIDGING CARE. EMPOWERING RURAL LIVES.
          </span>
        </div>
      )}
    </div>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link href="/" className="focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-teal rounded-xl">
      {content}
    </Link>
  );
}
