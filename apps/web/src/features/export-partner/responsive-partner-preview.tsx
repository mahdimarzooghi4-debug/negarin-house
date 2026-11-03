"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

const DESIGN_WIDTH = 1440;

export function ResponsivePartnerPreview(props: HTMLAttributes<HTMLDivElement>) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setScale(Math.min(1, document.documentElement.clientWidth / DESIGN_WIDTH));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return <div {...props} style={{ ...props.style, zoom: scale }}>{props.children}</div>;
}
