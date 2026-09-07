export interface SignalBadgeProps {
  decision: "LONG" | "SHORT" | "WAIT";
}

const styles: Record<string, string> = {
  LONG: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  SHORT: "bg-red-500/20 text-red-400 border border-red-500/30",
  WAIT: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
};

export default function SignalBadge({ decision }: SignalBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${styles[decision]}`}
    >
      {decision}
    </span>
  );
}
