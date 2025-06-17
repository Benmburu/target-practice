import ComingSoon from '@/components/ComingSoon';

export default function AdminPage() {
  return (
    <ComingSoon
      title="System Administration"
      description="Advanced system configuration, user management, and range operations control for administrators."
      expectedDate="June 2025"
      priority="low"
      features={[
        "System configuration management",
        "User role and permission control",
        "Range equipment monitoring",
        "Backup and data management",
        "Security audit logs",
        "System performance metrics"
      ]}
    />
  );
}