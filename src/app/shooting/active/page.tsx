import ComingSoon from '@/components/ComingSoon';

export default function ActiveSessionsPage() {
  return (
    <ComingSoon
      title="Active Sessions"
      description="Monitor and manage all currently active shooting sessions across all range lanes in real-time."
      expectedDate="February 2025"
      priority="high"
      backUrl="/shooting/new"
      features={[
        "Real-time session monitoring",
        "Lane status overview",
        "Session timer management",
        "Emergency stop controls",
        "Performance tracking",
        "Session notes and comments"
      ]}
    />
  );
}