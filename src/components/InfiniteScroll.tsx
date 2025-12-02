import { useEffect } from "react";
interface Props {
  onNearBottom: () => void;
  enabled: boolean;
}
export default function InfiniteScroll({ onNearBottom, enabled }: Props) {
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 600
      ) {
        onNearBottom();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, onNearBottom]);

  return null;
}
