import ComingSoon from '@/components/ComingSoon';

export default function PersonnelPage() {
  return (
    <ComingSoon
      title="Personnel Management"
      description="Manage range staff, instructors, and member information with comprehensive user management tools."
      expectedDate="February 2025"
      priority="high"
      features={[
        "Staff scheduling and management",
        "Member database with search",
        "Role-based access control",
        "Training certification tracking",
        "Performance evaluations",
        "Communication tools"
      ]}
    />
  );
}