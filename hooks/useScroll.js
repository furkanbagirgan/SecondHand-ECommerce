//hook structure that allows products to be loaded with scrolling

import { useState, useEffect } from "react";

export function useScroll() {
  const [scrolling, setScrolling] = useState(true);

  const listener = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return {
    scrolling,
  };
}
