import { LoginForm } from "@/components/auth/LoginForm";
import { authService } from "@/auth";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <LoginForm
        onLogin={async (data) => {
          const result = await authService.signIn({
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
          });

          if (!result) {
            return { error: "Invalid email or password" };
          }

          return {};
        }}
        onForgotPassword={() => {
          // TODO: implement forgot password flow
        }}
        onOAuthProviderClick={() => {
          // TODO: implement OAuth flow
        }}
      />
    </div>
  );
}
