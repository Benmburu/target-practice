import ComingSoon from '@/components/ComingSoon';

export default function OverallRankingsPage() {
  return (
    <ComingSoon
      title="Overall Rankings"
      description="View comprehensive all-time rankings across all shooting disciplines and categories with detailed performance metrics."
      expectedDate="May 2025"
      priority="medium"
      backUrl="/rankings"
      features={[
        "All-time performance leaderboards",
        "Multi-discipline ranking system",
        "Skill level categorization",
        "Historical achievement tracking",
        "Performance trend analysis",
        "Customizable ranking criteria",
        "Export ranking data",
        "Achievement milestone tracking"
      ]}
    />
  );
}
