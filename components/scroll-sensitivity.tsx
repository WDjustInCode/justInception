"use client";

import { useEffect } from "react";

export default function ScrollSensitivity() {
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      // Reduce scroll sensitivity by 50% (adjust this value to change sensitivity)
      const scrollFactor = 0.5;
      const delta = e.deltaY * scrollFactor;

      // Prevent default scroll
      e.preventDefault();

      // Apply reduced scroll
      isScrolling = true;
      window.scrollBy({
        top: delta,
        behavior: "auto",
      });

      // Reset flag after a short delay
      setTimeout(() => {
        isScrolling = false;
      }, 10);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return null;
}

