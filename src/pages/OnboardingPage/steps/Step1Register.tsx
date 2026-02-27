import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextInput from "@/components/ui/TextInput";
import { routes } from "@/routes/paths";
import { useRegister } from "@/hooks/useAuth";

// ─── Validation Schema ────────────────────────────────────────────────────────

const registerSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface Step1RegisterProps {
  onNext: () => void;
}

export default function Step1Register({ onNext }: Step1RegisterProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutate: register,
    isPending,
    isError,
    error,
  } = useRegister({
    onSuccess: onNext, // advance to Step 2 on success
  });

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", username: "", password: "" },
  });

  const onSubmit = (values: RegisterFormValues) => register(values);

  const serverError =
    isError && error
      ? ((error as { response?: { data?: { message?: string } } }).response
          ?.data?.message ?? "Something went wrong. Please try again.")
      : null;

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="px-8 py-10 sm:px-10">
        <div className="text-center mb-8">
          <h1 className="text-slate-900 text-3xl font-bold tracking-tight mb-2">
            Create your account
          </h1>
          <p className="text-slate-500 text-sm">
            Start your journey to acing technical interviews.
          </p>
        </div>

        {serverError && (
          <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span className="material-symbols-outlined text-[18px] shrink-0">
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
            label="Full Name"
            id="reg-fullName"
            type="text"
            placeholder="Jane Doe"
            inputClassName="bg-slate-50 focus:ring-indigo-600/30 focus:border-indigo-600"
            leftIcon={
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>
            }
            error={errors.fullName?.message}
            {...field("fullName")}
          />
          <TextInput
            label="Email Address"
            id="reg-email"
            type="email"
            placeholder="you@example.com"
            inputClassName="bg-slate-50 focus:ring-indigo-600/30 focus:border-indigo-600"
            leftIcon={
              <span className="material-symbols-outlined text-[20px]">
                mail
              </span>
            }
            error={errors.email?.message}
            {...field("email")}
          />
          <TextInput
            label="Username"
            id="reg-username"
            type="text"
            placeholder="jane_doe"
            inputClassName="bg-slate-50 focus:ring-indigo-600/30 focus:border-indigo-600"
            leftIcon={
              <span className="material-symbols-outlined text-[20px]">
                alternate_email
              </span>
            }
            error={errors.username?.message}
            {...field("username")}
          />
          <TextInput
            label="Password"
            id="reg-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            hint="Minimum 6 characters."
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
            {...field("password")}
          />

          <div className="pt-6">
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
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to={routes.login}
            className="font-bold text-indigo-600 hover:underline transition-all"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
