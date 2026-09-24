import { Star } from "lucide-react";

interface RatingBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

const RatingBar = ({ label, value, maxValue = 5 }: RatingBarProps) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 font-body text-sm text-muted-foreground">{label}</span>
      <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-primary transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex w-12 items-center justify-end gap-0.5">
        <Star className="h-3 w-3 fill-warm text-warm" />
        <span className="font-heading text-sm font-bold text-foreground">{value.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default RatingBar;
