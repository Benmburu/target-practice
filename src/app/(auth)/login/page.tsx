import ComingSoon from '@/components/ComingSoon';

export default function LoginPage() {
  return (
    <ComingSoon
      title="Authentication System"
      description="Secure login and registration system with role-based access control and session management."
      expectedDate="January 2025"
      priority="high"
      backUrl="/"
      showNotifyButton={false}
      features={[
        "Secure user authentication",
        "Role-based access control",
        "Password reset functionality",
        "Two-factor authentication",
        "Session management",
        "Social login integration"
      ]}
    />
  );
}