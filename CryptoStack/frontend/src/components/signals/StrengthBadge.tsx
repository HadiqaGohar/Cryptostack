interface StrengthBadgeProps {
  strength: "Strong" | "Medium" | "Weak";
}

export default function StrengthBadge({ strength }: StrengthBadgeProps) {
  const styles = {
    Strong: "text-emerald-600 dark:text-emerald-400",
    Medium: "text-amber-600 dark:text-amber-400",
    Weak: "text-red-600 dark:text-red-400",
  };

  const icons = {
    Strong: "🔥",
    Medium: "⚡",
    Weak: "💤",
  };

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${styles[strength]}`}>
      <span>{icons[strength]}</span>
      <span>{strength}</span>
    </span>
  );
}
