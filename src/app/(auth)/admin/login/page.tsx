import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Admin sign in",
  description: "Staff access to the Soul's Glory Cloth console.",
};

export default function AdminLoginPage() {
  return <LoginForm variant="admin" />;
}
