"use client";

import { useRef, type HTMLAttributes, type MouseEvent, type PointerEvent } from "react";

type HorizontalSwipeRailProps = HTMLAttributes<HTMLDivElement>;

export function HorizontalSwipeRail({
  className,
  children,
  ...props
}: HorizontalSwipeRailProps) {
  const drag = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    moved: false,
    suppressClick: false,
  });

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      moved: false,
      suppressClick: false,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (state.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - state.lastX;
    const totalX = event.clientX - state.startX;
    const totalY = event.clientY - state.startY;
    if (!state.moved) {
      if (Math.abs(totalX) < 6 || Math.abs(totalX) <= Math.abs(totalY)) return;
      state.moved = true;
      state.suppressClick = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    // RTL scrollLeft moves below zero as the user reveals cards farther left.
    event.currentTarget.scrollLeft += deltaX;
    state.lastX = event.clientX;
    event.preventDefault();
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (state.pointerId !== event.pointerId) return;
    state.pointerId = -1;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!drag.current.suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.suppressClick = false;
  }

  return (
    <div
      {...props}
      className={className}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClickCapture}
    >
      {children}
    </div>
  );
}
