interface StatCardProps {
  title: string;
  value: string | number;
  className?: string;
}

export function StatCard({ title, value, className = "" }: StatCardProps) {
  return (
    <div className={`p-4 rounded-lg ${className}`}>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
