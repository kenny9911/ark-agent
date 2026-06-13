"use client";

/**
 * Hover-aware primitives. The design prototype expressed hover via a custom
 * `style-hover` attribute; in React we merge `hoverStyle` over `style` while the
 * pointer is inside. A light transition is baked in for a crafted feel and can
 * be overridden via `style`.
 */
import { useState } from "react";

const TRANSITION =
  "background .15s ease, border-color .15s ease, color .15s ease, box-shadow .15s ease, opacity .15s ease";

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  hoverStyle?: React.CSSProperties;
};

export function Btn({
  hoverStyle,
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: BtnProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      {...rest}
      onMouseEnter={(e) => {
        setHover(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHover(false);
        onMouseLeave?.(e);
      }}
      style={{ transition: TRANSITION, ...style, ...(hover && hoverStyle ? hoverStyle : null) }}
    />
  );
}

type HoverDivProps = React.HTMLAttributes<HTMLDivElement> & {
  hoverStyle?: React.CSSProperties;
};

export function HoverDiv({
  hoverStyle,
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: HoverDivProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      {...rest}
      onMouseEnter={(e) => {
        setHover(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHover(false);
        onMouseLeave?.(e);
      }}
      style={{ transition: TRANSITION, ...style, ...(hover && hoverStyle ? hoverStyle : null) }}
    />
  );
}
