import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextInput from "@/components/ui/TextInput";
import { routes } from "@/routes/paths";
import { useLogin } from "@/hooks/useAuth";

// ─── Validation Schema ────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginFormValues) => {
    login({ email: values.email, password: values.password });
  };

  // Extract server error message (axios wraps it in error.response.data)
  const serverError =
    isError && error
      ? ((error as { response?: { data?: { message?: string } } }).response
          ?.data?.message ?? "Something went wrong. Please try again.")
      : null;

  return (
    <div className="bg-slate-50 font-display antialiased min-h-screen flex flex-col">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-indigo-50/60 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[35%] h-[35%] bg-indigo-50/60 rounded-full blur-[120px]" />
      </div>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="size-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[22px]">
                psychology
              </span>
            </div>
            <span className="text-slate-900 text-xl font-bold tracking-tight">
              SmartPrep AI
            </span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="px-8 py-10 sm:px-10">
              <div className="text-center mb-8">
                <h1 className="text-slate-900 text-3xl font-bold tracking-tight mb-2">
                  Welcome back
                </h1>
                <p className="text-slate-500 text-sm">
                  Log in to continue your interview preparation.
                </p>
              </div>

              {/* Server-level error banner */}
              {serverError && (
                <div className="mb-5 flex items-center justify-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">
                    error
                  </span>
                  <span>{serverError}</span>
                </div>
              )}

              <form
                className="space-y-5"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextInput
                  label="Email Address"
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  inputClassName="bg-slate-50 focus:ring-indigo-600/30 focus:border-indigo-600"
                  leftIcon={
                    <span className="material-symbols-outlined text-[20px]">
                      mail
                    </span>
                  }
                  error={errors.email?.message}
                  {...register("email")}
                />

                <TextInput
                  label="Password"
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  inputClassName="bg-slate-50 focus:ring-indigo-600/30 focus:border-indigo-600"
                  leftIcon={
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                  }
                  rightIcon={
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  }
                  onRightIconClick={() => setShowPassword((v) => !v)}
                  error={errors.password?.message}
                  {...register("password")}
                />

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span className="text-sm font-medium text-slate-600">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm font-semibold text-indigo-600 hover:underline transition-all"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <span className="material-symbols-outlined text-lg animate-spin">
                          progress_activity
                        </span>
                        Logging in…
                      </>
                    ) : (
                      <>
                        Log In
                        <span className="material-symbols-outlined text-lg">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to={routes.onboarding}
                  className="font-bold text-indigo-600 hover:underline transition-all"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
          © 2024 SmartPrep AI • Trusted by 10k+ Engineers
        </p>
      </footer>
    </div>
  );
}
