import { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "@/components/ui/TextInput";
import { routes } from "@/routes/paths";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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

              <form className="space-y-5" noValidate>
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
                    type="button"
                    className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all shadow-lg shadow-indigo-200"
                  >
                    Log In
                    <span className="material-symbols-outlined text-lg">
                      arrow_forward
                    </span>
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
