"use client";

import { useEffect } from "react";

export default function CursorTracker() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    let raf: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onMouseEnterLink = () => {
      cursor.style.width = "52px";
      cursor.style.height = "52px";
      cursor.style.borderColor = "var(--color-brand-purple)";
      cursor.style.boxShadow = "0 0 20px var(--color-brand-purple)";
    };

    const onMouseLeaveLink = () => {
      cursor.style.width = "32px";
      cursor.style.height = "32px";
      cursor.style.borderColor = "var(--color-brand-blue)";
      cursor.style.boxShadow = "0 0 12px var(--color-brand-blue)";
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);

    // Make cursor expand on interactive elements
    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach(el => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
