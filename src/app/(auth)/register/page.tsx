import ComingSoon from '@/components/ComingSoon';

export default function RegisterPage() {
  return (
    <ComingSoon
      title="User Registration"
      description="Create new user accounts with comprehensive onboarding and verification processes."
      expectedDate="January 2025"
      priority="high"
      backUrl="/"
      showNotifyButton={false}
      features={[
        "Account creation wizard",
        "Email verification system",
        "Profile setup guidance",
        "Terms and conditions acceptance",
        "Welcome email sequences",
        "Initial preferences configuration"
      ]}
    />
  );
}