import ComingSoon from '@/components/ComingSoon';

export default function ReportsPage() {
  return (
    <ComingSoon
      title="Custom Reports"
      description="Generate detailed reports tailored to your specific needs with advanced filtering and customization options."
      expectedDate="April 2025"
      priority="medium"
      backUrl="/analytics"
      features={[
        "Custom report builder",
        "Automated report scheduling",
        "Multiple export formats",
        "Advanced filtering options",
        "Template management",
        "Shareable report links"
      ]}
    />
  );
}
