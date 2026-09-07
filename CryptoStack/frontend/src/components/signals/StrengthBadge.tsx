export interface StrengthBadgeProps {
  strength: "Strong" | "Medium" | "Weak";
}

const config: Record<string, { icon: string; color: string }> = {
  Strong: { icon: "🔥", color: "text-emerald-400" },
  Medium: { icon: "⚡", color: "text-amber-400" },
  Weak: { icon: "💤", color: "text-red-400" },
};

export default function StrengthBadge({ strength }: StrengthBadgeProps) {
  const { icon, color } = config[strength] ?? config.Weak;

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${color}`}>
      <span>{icon}</span>
      <span>{strength}</span>
    </span>
  );
}
