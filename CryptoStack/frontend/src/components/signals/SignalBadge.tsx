interface SignalBadgeProps {
  decision: "LONG" | "SHORT" | "WAIT";
}

export default function SignalBadge({ decision }: SignalBadgeProps) {
  const styles = {
    LONG: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30",
    SHORT: "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30",
    WAIT: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${styles[decision]}`}>
      {decision}
    </span>
  );
}
