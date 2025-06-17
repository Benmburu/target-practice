import ComingSoon from '@/components/ComingSoon';

export default function AnalyticsPage() {
  return (
    <ComingSoon
      title="Analytics Dashboard"
      description="Get comprehensive insights into shooting performance, trends, and statistics with our advanced analytics platform."
      expectedDate="March 2025"
      priority="high"
      features={[
        "Performance trend analysis",
        "Comparative scoring charts",
        "Session history tracking",
        "Export reports to PDF/Excel",
        "Real-time performance metrics",
        "Custom date range filtering"
      ]}
    />
  );
}