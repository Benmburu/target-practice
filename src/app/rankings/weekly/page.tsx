import ComingSoon from '@/components/ComingSoon';

export default function WeeklyRankingsPage() {
  return (
    <ComingSoon
      title="Weekly Rankings"
      description="Stay competitive with dynamic weekly leaderboards that reset every week, showcasing the most active and skilled shooters."
      expectedDate="June 2025"
      priority="high"
      backUrl="/rankings"
      features={[
        "Weekly leaderboard resets",
        "Current week performance tracking",
        "Weekly challenge competitions",
        "Streak and consistency bonuses",
        "Weekly achievement badges",
        "Progress comparison tools",
        "Social sharing features",
        "Weekly winner announcements"
      ]}
    />
  );
}
