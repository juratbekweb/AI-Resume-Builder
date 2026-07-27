import { RegisterForm } from "@/components/auth/RegisterForm";
import { UserService } from "@/core/users/user-service";
import { PrismaUserRepository } from "@/core/users/prisma-user-repository";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  const userService = new UserService(new PrismaUserRepository());

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <RegisterForm
        onSubmit={async (data) => {
          await userService.createUser({
            email: data.email,
            name: `${data.firstName} ${data.lastName}`,
          });
        }}
      />
    </div>
  );
}
