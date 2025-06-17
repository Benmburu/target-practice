import ComingSoon from '@/components/ComingSoon';

export default function ProfilePage() {
  return (
    <ComingSoon
      title="User Profile"
      description="Manage your personal information, preferences, and shooting statistics in one centralized location."
      expectedDate="June 2025"
      priority="medium"
      features={[
        "Personal information management",
        "Shooting preferences and settings",
        "Achievement and badge display",
        "Statistical summaries",
        "Privacy and security settings",
        "Profile customization options"
      ]}
    />
  );
}