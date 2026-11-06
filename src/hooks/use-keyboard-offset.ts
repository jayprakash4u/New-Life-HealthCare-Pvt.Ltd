import { useEffect, useRef, useState } from 'react';

/**
 * Tracks the on-screen keyboard height on mobile browsers by observing the
 * VisualViewport API. The returned value is the number of pixels the visible
 * viewport is being pushed upward by the keyboard (0 when no keyboard is open).
 *
 * The hook is a no-op when `window.visualViewport` is unavailable (e.g. in
 * non-browser environments or some test runners), so it always returns a
 * stable number rather than throwing.
 */
export function useKeyboardOffset(): number {
  const [offset, setOffset] = useState(0);
  const viewportRef = useRef<VisualViewport | null>(null);
  const handlersRef = useRef<{
    onResize: () => void;
    onScroll: () => void;
  } | null>(null);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    viewportRef.current = viewport;

    function computeInset(): number {
      const vp = viewportRef.current;
      if (!vp) return 0;
      // When the viewport is not at the natural scale/position (e.g. pinch
      // zoom), the offset is unreliable — fall back to 0.
      if (vp.scale !== 1) return 0;
      // The visual viewport bottom is where the visible content ends. Anything
      // below that is hidden behind the keyboard.
      const visibleBottom = vp.offsetTop + vp.height;
      const layoutBottom = window.innerHeight;
      return Math.max(0, Math.round(layoutBottom - visibleBottom));
    }

    const onResize = () => setOffset(computeInset());
    const onScroll = () => setOffset(computeInset());

    handlersRef.current = { onResize, onScroll };
    viewport.addEventListener('resize', onResize);
    viewport.addEventListener('scroll', onScroll);
    onResize();

    return () => {
      viewport.removeEventListener('resize', onResize);
      viewport.removeEventListener('scroll', onScroll);
      handlersRef.current = null;
    };
  }, []);

  return offset;
}