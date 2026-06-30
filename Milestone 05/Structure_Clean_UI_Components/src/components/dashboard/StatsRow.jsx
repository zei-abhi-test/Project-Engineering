import StatCard from "../shared/StatCard";

export default function StatsRow({
  totalCount,
  completedCount,
  progressPercent,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 16,
        marginBottom: 32,
      }}
    >
      <StatCard
        title="Total Tasks"
        value={totalCount}
        subtitle="All time"
        color="#e2e8f0"
      />

      <StatCard
        title="Completed"
        value={completedCount}
        subtitle="Done ✓"
        color="#22c55e"
      />

      <StatCard
        title="Remaining"
        value={totalCount - completedCount}
        subtitle="To do"
        color="#f59e0b"
      />

      <StatCard
        title="Progress"
        value={`${progressPercent}%`}
        progress={progressPercent}
        color="#6366f1"
      />
    </div>
  );
}