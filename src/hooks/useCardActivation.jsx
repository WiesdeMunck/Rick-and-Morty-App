import { useEffect, useRef, useCallback } from "react";

export function useCardActivation({ selector = ".main-link" } = {}) {
  const cardRef = useRef(null);

  const handleCardClick = useCallback(
    (e) => {
      const noTextSelected = !window.getSelection().toString();

      if (noTextSelected) {
        const mainLink = cardRef.current?.querySelector(selector);
        mainLink?.click();
      }
    },
    [selector]
  );

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    // Prevent clicks inside buttons/links from bubbling up to card
    const clickableEls = cardEl.querySelectorAll("a, button");

    const stopClick = (e) => e.stopPropagation();

    clickableEls.forEach((el) => {
      el.addEventListener("click", stopClick);
    });

    return () => {
      clickableEls.forEach((el) => {
        el.removeEventListener("click", stopClick);
      });
    };
  }, []);

  return { cardRef, handleCardClick };
}
