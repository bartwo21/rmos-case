import { LoginErrorBoundary } from "@/components/error-boundaries/LoginErrorBoundary";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-[calc(100vh-129px)] w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-300">
      <LoginErrorBoundary>
        <LoginForm />
      </LoginErrorBoundary>
    </div>
  );
}
